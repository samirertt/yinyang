package com.example.backend.service;


import com.example.backend.models.Character;
import com.example.backend.repository.CharacterRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.models.User;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CharacterRepository characterRepository;

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);

    }

    public List<Character> getAllCharacters() {
        return characterRepository.findAll();
    }

    public List<String> getCharacterPersonalities() {
        return characterRepository.findDistinctPersonalities();
    }

    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public User validateUser(String username, String password) {
        Optional<User> userModel = userRepository.findByUsername(username);
        if (userModel.isPresent()) {
            if (userModel.get().getPassword().equals(password)) {
                return userModel.get();
            } else {
                return null;
            }
        }
        return null;
    }

    public User toggleUserRole(int userId) {
        User user = userRepository.findById((long) userId)
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

    public List<Character> getCharacterByPersonality(String personality) {
        return characterRepository.findByCharPersonality(personality);
    }

    public List<Character> searchCharactersByName(String name) {
        return characterRepository.findByCharNameContainingIgnoreCase(name);
    }

    public String getProfileImage(String username) {
        // Fetch the user from the database using the username
        Optional<User> userOptional = userRepository.findByUsername(username);

        return userOptional
                .filter(user -> user.getUserImg() != null)
                .map(User::getUserImg)
                .orElse(null);
    }

    public boolean updateProfileImage(String imageUrl, String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();  // Get the User object

            user.setUserImg(imageUrl);  // Set the profile image URL
            userRepository.save(user);  // Save the updated user to the database

            return true;
        }

        // If no user is found with the given username, return false
        return false;
    }
}



