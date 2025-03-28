package com.example.backend.service;

import com.example.backend.models.User;
import com.example.backend.models.Character;
import com.example.backend.repository.CharacterRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CharacterRepository characterRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User toggleUserRole(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Toggle between 'user' and 'moderator' roles
        if ("user".equals(user.getRole())) {
            user.setRole("moderator");
        } else if ("moderator".equals(user.getRole())) {
            user.setRole("user");
        }

        return userRepository.save(user);
    }

    public List<Character> getAllCharacters() {
        return characterRepository.findAll();
    }
}
