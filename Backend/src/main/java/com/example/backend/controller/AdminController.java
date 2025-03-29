package com.example.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.Character;
import com.example.backend.models.User;
import com.example.backend.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/users/{userId}/toggle-role")
    public ResponseEntity<User> toggleUserRole(@PathVariable int userId) {
        User updatedUser = adminService.toggleUserRole(userId);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/characters")
    public ResponseEntity<List<Character>> getAllCharacters() {
        return ResponseEntity.ok(adminService.getAllCharacters());
    }

    @GetMapping("/characters/{charId}")
    public ResponseEntity<Character> getCharacterById(@PathVariable int charId) {
        return ResponseEntity.ok(adminService.getCharacterById(charId));
    }

    @GetMapping("/characters/personality")
    public ResponseEntity<Map<String, Long>> getCharacterCountByPersonality() {
        return ResponseEntity.ok(adminService.getCharacterCountByPersonality());
    }

    @GetMapping("/characters/usage")
    public ResponseEntity<Map<String, Double>> getSimpleCharacterUsage() {
        return ResponseEntity.ok(adminService.getSimpleCharacterUsage());
    }

    @GetMapping("/users/yearly")
    public ResponseEntity<List<Map<String, Object>>> getUsersByYear() {
        return ResponseEntity.ok(adminService.getUsersByYear());
    }
}