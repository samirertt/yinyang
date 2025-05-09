package com.example.backend.controller;

import com.example.backend.dto.CharacterFilter;
import com.example.backend.dto.CharacterUsageDto;
import com.example.backend.dto.FavouriteRequest;
import com.example.backend.models.Character;
import com.example.backend.models.ChatModel;
import com.example.backend.models.User;
import com.example.backend.repository.CharacterRepository;
import com.example.backend.security.JwtUtil; // Import your JwtUtil class
import com.example.backend.service.FavouriteService;
import com.example.backend.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;


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
    private FavouriteService favouriteService;


    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @GetMapping("/{userId}/all")
    public User getUserInfo(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);

        if (user.isPresent()) {
            return user.get();
        } else {
            throw new NullPointerException("Cannot find user in database");
        }
    }

    @GetMapping("/{username}/profile-image")
    public String getProfileImage(@PathVariable String username) {
        return userService.getProfileImage(username);
    }

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
    public ResponseEntity<?> registerUser(@RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        try {
            if (user.getJoinDate() == null) {
                user.setJoinDate(LocalDate.now());
            }
            if (user.getRoles() == null || user.getRoles().isEmpty()) {
                user.setRoles(Collections.singletonList("user"));
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User newUser = userService.registerUser(user);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/characters/all")
    public List<Character> getAllCharacters() {
        return userService.getAllCharacters();
    }


    @GetMapping("/characters/personalities")
    public List<CharacterFilter> getAllCharacterPersonalities() {
        return userService.getCharacterPersonalities();
    }

    @GetMapping("/{personality}")
    public List<Character> getByCharacterByPersonality(@PathVariable String personality) {
        return userService.getCharacterByPersonality(personality);
    }

    @GetMapping("/characters/search")
    public List<Character> searchCharacters(@RequestParam String name) {
        return userService.searchCharactersByName(name);
    }

    @PostMapping("/characters")
    public ResponseEntity<Object> getCharacter(@RequestBody Map<String, Integer> credentials) {
        Integer charId = credentials.get("charId");

        Optional<Character> character = userService.searchCharactersById(charId);

        if (character.isPresent()) {
            return ResponseEntity.ok(character.get());
        } else {
            return ResponseEntity.status(404).body("Character not found");
        }

    }


    @PostMapping("/favourites/like")
    public ResponseEntity<String> likeCharacter(@RequestBody FavouriteRequest request) {
        favouriteService.likeCharacter(request.getUserName(), request.getCharacterName());
        return ResponseEntity.ok("Character added to favourites.");
    }

    @Transactional
    @DeleteMapping("/favourites/unlike")
    public ResponseEntity<String> unlikeCharacter(@RequestBody FavouriteRequest request) {
        favouriteService.unlikeCharacter(request.getUserName(), request.getCharacterName());
        return ResponseEntity.ok("Character removed from favourites.");
    }

    @GetMapping("/favourites/user/{username}")
    public ResponseEntity<List<Character>> getUserFavourites(@PathVariable String username) {
        List<com.example.backend.models.Character> favourites = favouriteService.getFavouritesByUser(username);
        return ResponseEntity.ok(favourites);
    }

    @PutMapping("/characters/update-usage")
    public ResponseEntity<String> updateCharacterUsage(@RequestBody CharacterUsageDto characterUsageDto) {
        userService.incrementCharacterUsage(characterUsageDto.getCharacterName());
//
//            String error = "Error updating character usage";
//            return ResponseEntity.internalServerError().body(error);
//

        return ResponseEntity.ok("Character usage updated successfully!");
    }

    @PutMapping("/{username}/update-firstName")
    public ResponseEntity<?> updateFirstName(@PathVariable String username, @RequestBody Map<String, String> body) {
        String newFirstName = body.get("firstName");
        return userService.updateUserField(username, newFirstName, "firstName");
    }

    // Update Surname
    @PutMapping("/{username}/update-surname")
    public ResponseEntity<?> updateSurname(@PathVariable String username, @RequestBody Map<String, String> body) {
        String newSurname = body.get("surname");
        return userService.updateUserField(username, newSurname, "surname");
    }

    // Update Username
    @PutMapping("/{username}/update-username")
    public ResponseEntity<?> updateUsername(@PathVariable String username, @RequestBody Map<String, String> body) {
        Optional<User> user = userService.getUserByUsername(body.get("username"));
        if (user.isPresent())
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }else {
            return userService.updateUserField(username, body.get("username"), "username");
        }
    }

    // Update Email
    @PutMapping("/{username}/update-email")
    public ResponseEntity<?> updateEmail(@PathVariable String username, @RequestBody Map<String, String> body) {
        String newEmail = body.get("email");
        return userService.updateUserField(username, newEmail, "email");
    }

    // Update Password
    @PutMapping("/{username}/update-password")
    public ResponseEntity<?> updatePassword(@PathVariable String username, @RequestBody Map<String, String> body) {
        String oldPassword = body.get("oldPassword");
        String newPassword = body.get("newPassword");

        Optional<User> optionalUser = userService.getUserByUsername(username);
        if (optionalUser.isEmpty()) return ResponseEntity.notFound().build();

        User user = optionalUser.get();
        if (user.getPassword().equals(oldPassword)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect old password");
        }

        userService.updateUserField(username,newPassword,"password");
        return ResponseEntity.ok().body("Password updated successfully");
    }
}
