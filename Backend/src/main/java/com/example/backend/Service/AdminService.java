package com.example.backend.Service;

import com.example.backend.Models.UserModel;
import com.example.backend.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<UserModel> getAllUsers() {
        return adminRepository.findAll();
    }

    public UserModel getUserById(int id) {
        return adminRepository.findById(id);
    }

    public UserModel toggleUserRole(int id) {
        UserModel user = adminRepository.findById(id);
        if (user != null) {
            String newRole = "USER".equals(user.getRole()) ? "MODERATOR" : "USER";
            if (adminRepository.updateRole(id, newRole)) {
                user.setRole(newRole);
                return user;
            }
        }
        return null;
    }

    public byte[] getUserImage(int id) {
        return adminRepository.findImageById(id);
    }

    public boolean updateUserImage(int id, byte[] imageData) {
        return adminRepository.updateUserImage(id, imageData);
    }
}