package com.example.backend.controller;

import com.example.backend.models.Character;
import com.example.backend.models.User;
import com.example.backend.security.JwtUtil; // Import your JwtUtil class
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        User user = userService.validateUser(username, password);

        if (user != null) {
            String token = jwtUtil.generateToken(user);
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(401).body("Invalid Credentials");

        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user, BindingResult result)
    {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        try{

            if (user.getJoinDate() == null) {
                user.setJoinDate(LocalDate.now());
            }
            if (user.getRoles() == null || user.getRoles().isEmpty()) {
                user.setRoles(Collections.singletonList("user"));
            }

            User newUser = userService.registerUser(user);
            return ResponseEntity.ok(newUser);
        }catch (Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/characters/all")
    public List<Character> getAllCharacters()
    { return userService.getAllCharacters();}

    // You can add other endpoints like getting recent chats, etc.
}