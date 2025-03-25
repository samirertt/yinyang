package com.example.backend.UserLogic.controller;


import com.example.backend.UserLogic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> credentials){
        String username = credentials.get("username");
        String password = credentials.get("password");

        boolean isValid = userService.validateUser(username, password);

        if (isValid) {
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(401).body("Invalid Crendentials");
        }
    }
}
