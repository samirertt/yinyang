package com.example.backend.service;

import com.example.backend.models.User;
import com.example.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<User> getAllUsers() {
        return adminRepository.findAll();
    }

    public User toggleUserRole(int userId) {
        User user = adminRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Toggle between 'user' and 'moderator' roles
        if ("user".equals(user.getRole())) {
            user.setRole("moderator");
        } else if ("moderator".equals(user.getRole())) {
            user.setRole("user");
        }

        return adminRepository.save(user);
    }
}
