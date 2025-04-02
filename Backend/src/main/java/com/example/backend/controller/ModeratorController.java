package com.example.backend.controller;

import com.example.backend.models.Character;
import com.example.backend.service.ModeratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/moderator")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasAuthority('moderator')")
public class ModeratorController {

    @Autowired
    private ModeratorService moderatorService;

    @GetMapping("/characters")
    public ResponseEntity<List<Character>> getAllCharacters() {
        return ResponseEntity.ok(moderatorService.getAllCharacters());
    }

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