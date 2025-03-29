package com.example.backend.controller;

import com.example.backend.models.Character;
import com.example.backend.service.ModeratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/moderator")
@CrossOrigin(origins = "http://localhost:5173")
public class ModeratorController {

    @Autowired
    private ModeratorService moderatorService;

    @PostMapping("/characters")
    public ResponseEntity<Character> createCharacter(@RequestBody Character character) {
        return ResponseEntity.ok(moderatorService.createCharacter(character));
    }

    @PutMapping("/characters/{charId}")
    public ResponseEntity<Character> updateCharacter(@PathVariable int charId, @RequestBody Character character) {
        return ResponseEntity.ok(moderatorService.updateCharacter(charId, character));
    }

    @DeleteMapping("/characters/{charId}")
    public ResponseEntity<Void> deleteCharacter(@PathVariable int charId) {
        moderatorService.deleteCharacter(charId);
        return ResponseEntity.ok().build();
    }
} 