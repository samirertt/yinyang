package com.example.backend.service;

import com.example.backend.models.Character;
import com.example.backend.models.User;
import com.example.backend.repository.CharacterRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

        List<String> roles = new ArrayList<>(user.getRoles());

        if (roles.contains("moderator")) {
            // If currently moderator, remove moderator and ensure user role is set exclusively.
            roles.remove("moderator");
            if (!roles.contains("user")) {
                roles.add("user");
            }
        } else if (roles.contains("user")) {
            // If currently user, remove user and switch to moderator exclusively.
            roles.remove("user");
            roles.add("moderator");
        } else {
            // In case neither role is set, you could define a default behavior.
            roles.add("user");  // or roles.add("moderator");
        }

        user.setRoles(roles);
        return userRepository.save(user);
    }



    // Character Viewing Methods
    public List<Character> getAllCharacters() {
        return characterRepository.findAll();
    }

    public Character getCharacterById(int charId) {
        return characterRepository.findById(charId)
                .orElseThrow(() -> new RuntimeException("Character not found with ID: " + charId));
    }

    public Map<String, Long> getCharacterCountByPersonality() {
        return characterRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        Character::getCharPersonality,
                        Collectors.counting()
                ));
    }

    public Map<String, Double> getSimpleCharacterUsage() {
        return characterRepository.findAll().stream()
                .collect(Collectors.toMap(
                        Character::getCharName,
                        Character::getCharUsage
                ));
    }

    public List<Map<String, Object>> getUsersByYear() {
        // Get counts from database
        List<Object[]> rawResults = userRepository.getUserCountsByYear();

        // Convert raw results to map
        Map<Integer, Long> yearCounts = rawResults.stream()
                .collect(Collectors.toMap(
                        result -> (Integer) result[0],  // year
                        result -> (Long) result[1]     // count
                ));

        // Get current year
        int currentYear = Year.now().getValue();

        // Build result list with all years
        List<Map<String, Object>> result = new ArrayList<>();
        for (int year = 2022; year <= currentYear; year++) {
            Map<String, Object> yearData = new HashMap<>();
            yearData.put("year", year);
            yearData.put("count", yearCounts.getOrDefault(year, 0L));
            result.add(yearData);
        }

        return result;
    }
}