package com.example.backend.Controller;

import com.example.backend.Models.UserModel;
import com.example.backend.Service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(
    origins = "http://localhost:5173",
    allowedHeaders = {"Origin", "Content-Type", "Accept", "Authorization"},
    exposedHeaders = {"Access-Control-Allow-Origin"},
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
    allowCredentials = "true",
    maxAge = 3600
)
public class AdminController {
    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private AdminService adminService;

    @GetMapping
    public ResponseEntity<List<UserModel>> getAllUsers() {
        try {
            List<UserModel> users = adminService.getAllUsers();
            logger.info("Retrieved {} users", users.size());
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            logger.error("Error retrieving users: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserModel> getUserById(@PathVariable int id) {
        try {
            UserModel user = adminService.getUserById(id);
            if (user != null) {
                logger.info("Retrieved user with ID: {}", id);
                return ResponseEntity.ok(user);
            }
            logger.info("User not found with ID: {}", id);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error retrieving user {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<UserModel> toggleUserRole(@PathVariable int id) {
        try {
            UserModel updatedUser = adminService.toggleUserRole(id);
            if (updatedUser != null) {
                logger.info("Toggled role for user ID: {} to {}", id, updatedUser.getRole());
                return ResponseEntity.ok(updatedUser);
            }
            logger.info("User not found for role toggle with ID: {}", id);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error toggling role for user {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getUserImage(@PathVariable int id) {
        try {
            byte[] imageData = adminService.getUserImage(id);
            if (imageData != null) {
                logger.info("Retrieved image for user ID: {}, size: {} bytes", id, imageData.length);
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(imageData);
            }
            logger.info("No image found for user ID: {}", id);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error retrieving image for user {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}/image")
    public ResponseEntity<Void> updateUserImage(@PathVariable int id, @RequestParam("image") MultipartFile file) {
        try {
            byte[] imageData = file.getBytes();
            logger.info("Updating image for user ID: {}, received {} bytes", id, imageData.length);
            if (adminService.updateUserImage(id, imageData)) {
                logger.info("Successfully updated image for user ID: {}", id);
                return ResponseEntity.ok().build();
            }
            logger.info("User not found for image update with ID: {}", id);
            return ResponseEntity.notFound().build();
        } catch (IOException e) {
            logger.error("Error updating image for user {}: {}", id, e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }
}