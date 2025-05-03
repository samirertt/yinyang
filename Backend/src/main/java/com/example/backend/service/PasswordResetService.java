package com.example.backend.service;

import com.example.backend.models.PasswordResetToken;
import com.example.backend.models.User;
import com.example.backend.repository.PasswordResetTokenRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.SecureRandom;
import java.util.Optional;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final int TOKEN_LENGTH = 6;

    // Generate a 6-digit numeric token
    public String generateToken() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(TOKEN_LENGTH);
        for (int i = 0; i < TOKEN_LENGTH; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }

    public boolean createPasswordResetTokenForEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            // Don't reveal if email exists for security
            return false;
        }

        // If a token already exists for this email, delete it
        tokenRepository.findByEmail(email)
                .ifPresent(token -> tokenRepository.delete(token));

        // Create new token
        String token = generateToken();
        PasswordResetToken resetToken = new PasswordResetToken(token, email);
        tokenRepository.save(resetToken);

        // Send email with token
        String subject = "Password Reset Request";
        String message = "Your password reset code is: " + token +
                "\n\nThis code will expire in 15 minutes.";

        emailService.sendEmail(email, subject, message);

        return true;
    }

    public String validatePasswordResetToken(String token) {
        Optional<PasswordResetToken> tokenOptional = tokenRepository.findByToken(token);

        if (tokenOptional.isEmpty()) {
            return "invalidToken";
        }

        PasswordResetToken resetToken = tokenOptional.get();

        if (resetToken.isExpired()) {
            return "expired";
        }

        if (resetToken.isUsed()) {
            return "used";
        }

        return "valid";
    }
    @Transactional
    public boolean resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOptional = tokenRepository.findByToken(token);

        if (tokenOptional.isEmpty()) {
            return false;
        }

        PasswordResetToken resetToken = tokenOptional.get();

        if (resetToken.isExpired() || resetToken.isUsed()) {
            return false;
        }

        Optional<User> userOptional = userRepository.findByEmail(resetToken.getEmail());

        if (userOptional.isEmpty()) {
            return false;
        }

        User user = userOptional.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        String encoded = passwordEncoder.encode(newPassword);
        String encodedPassword = passwordEncoder.encode(newPassword);
        userRepository.updatePasswordByEmail(resetToken.getEmail(), encodedPassword);
        System.out.println("Encoded Password: " + encoded);
        userRepository.save(user);

        // Mark token as used
        resetToken.setUsed(true);
        tokenRepository.save(resetToken);

        return true;
    }
}
