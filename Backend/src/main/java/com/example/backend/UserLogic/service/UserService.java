package com.example.backend.UserLogic.service;

import com.example.backend.Models.User;
import com.example.backend.UserLogic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public boolean validateUser(String username, String password) {
        Optional<User> userModel = userRepository.findByUsername(username);
        return userModel.map(value -> value.getPassword().equals(password)).orElse(false);
    }
}
