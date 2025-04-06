package com.example.backend.controller;

import com.example.backend.service.ImageUploadService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ImageUploadController {

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private UserService userService;

    @PostMapping("/character")
    public ResponseEntity<?> uploadCharacterImage(@RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = imageUploadService.uploadImage(file, "characters");
            Map<String, String> response = new HashMap<>();
            response.put("url", imageUrl);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to upload image");
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @PostMapping("/profile")
    public ResponseEntity<?> uploadProfileImage(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {
        try {
            // Get the username from the authentication object
            String username = authentication.getName();
            
            // Upload the image to Cloudinary
            String imageUrl = imageUploadService.uploadImage(file, "profiles");
            
            // Update the user's profile image in the database
            boolean updated = userService.updateProfileImage(imageUrl, username);
            
            if (!updated) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Failed to update user profile");
                return ResponseEntity.badRequest().body(error);
            }
            
            Map<String, String> response = new HashMap<>();
            response.put("url", imageUrl);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to upload image");
            return ResponseEntity.internalServerError().body(error);
        }
    }
} 