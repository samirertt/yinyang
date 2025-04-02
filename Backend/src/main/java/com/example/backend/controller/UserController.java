package com.example.backend.controller;

import com.example.backend.models.User;
import com.example.backend.security.JwtUtil; // Import your JwtUtil class
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // You can add other endpoints like getting recent chats, etc.
}
