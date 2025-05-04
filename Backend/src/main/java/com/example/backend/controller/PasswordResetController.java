package com.example.backend.controller;

import com.example.backend.dto.PasswordResetRequestDto;
import com.example.backend.dto.PasswordResetDto;
import com.example.backend.dto.TokenValidationDto;
import com.example.backend.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
@RequestMapping("/api/password")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/reset-request")
    public ResponseEntity<?> requestPasswordReset(@RequestBody PasswordResetRequestDto resetRequest) {
        boolean result = passwordResetService.createPasswordResetTokenForEmail(resetRequest.getEmail());

        // Always return success even if email doesn't exist (for security)
        return ResponseEntity.ok().body(Map.of(
                "message", "If your email is registered, you will receive a reset code shortly."
        ));
    }

    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestBody TokenValidationDto validationRequest) {
        String result = passwordResetService.validatePasswordResetToken(validationRequest.getToken());

        if ("valid".equals(result)) {
            return ResponseEntity.ok().body(Map.of(
                    "valid", true
            ));
        } else {
            return ResponseEntity.ok().body(Map.of(
                    "valid", false,
                    "reason", result
            ));
        }
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetDto resetRequest) {
        boolean result = passwordResetService.resetPassword(
                resetRequest.getToken(), resetRequest.getNewPassword());

        if (result) {
            return ResponseEntity.ok().body(Map.of(
                    "message", "Password has been reset successfully."
            ));
        } else {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", "Failed to reset password. Invalid or expired token."
            ));
        }
    }
}

