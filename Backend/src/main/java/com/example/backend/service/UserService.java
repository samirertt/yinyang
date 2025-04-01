package com.example.backend.service;


import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.models.User;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);

    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean userExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public User validateUser(String username, String password) {
        Optional<User> userModel = userRepository.findByUsername(username);
        if(userModel.isPresent())
        {
            if(userModel.get().getPassword().equals(password))
            {
                return userModel.get();
            }
            else
            {
                return null;
            }
        }
        return null;
    }

    public User toggleUserRole(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<String> roles = user.getRoles();
        if (roles.contains("user")) {
            roles.remove("user");
            roles.add("moderator");
        } else if (roles.contains("moderator")) {
            roles.remove("moderator");
            roles.add("user");
        }

        return userRepository.save(user);
    }
}
