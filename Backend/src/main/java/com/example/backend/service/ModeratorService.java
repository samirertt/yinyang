package com.example.backend.service;

import com.example.backend.models.Character;
import com.example.backend.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ModeratorService {

    @Autowired
    private CharacterRepository characterRepository;

    public Character createCharacter(Character character) {
        // Validate required fields
        if (character.getCharName() == null || character.getCharName().trim().isEmpty()) {
            throw new RuntimeException("Character name is required");
        }
        if (character.getCharPersonality() == null || character.getCharPersonality().trim().isEmpty()) {
            throw new RuntimeException("Character personality is required");
        }
        if (character.getCharDescription() == null || character.getCharDescription().trim().isEmpty()) {
            throw new RuntimeException("Character description is required");
        }
        if (character.getCharPrompt() == null || character.getCharPrompt().trim().isEmpty()) {
            throw new RuntimeException("Character prompt is required");
        }

        // Set default usage if not provided
        if (character.getCharUsage() == 0) {
            character.setCharUsage(0.0);
        }

        return characterRepository.save(character);
    }

    public Character updateCharacter(int charId, Character characterDetails) {
        Character character = characterRepository.findById(charId)
                .orElseThrow(() -> new RuntimeException("Character not found with ID: " + charId));

        // Update fields if provided
        if (characterDetails.getCharName() != null) {
            character.setCharName(characterDetails.getCharName());
        }
        if (characterDetails.getCharPersonality() != null) {
            character.setCharPersonality(characterDetails.getCharPersonality());
        }
        if (characterDetails.getCharImg() != null) {
            character.setCharImg(characterDetails.getCharImg());
        }
        if (characterDetails.getCharDescription() != null) {
            character.setCharDescription(characterDetails.getCharDescription());
        }
        if (characterDetails.getCharUsage() != 0) {
            character.setCharUsage(characterDetails.getCharUsage());
        }
        if (characterDetails.getCharPrompt() != null) {
            character.setCharPrompt(characterDetails.getCharPrompt());
        }

        return characterRepository.save(character);
    }

    public void deleteCharacter(int charId) {
        Character character = characterRepository.findById(charId)
                .orElseThrow(() -> new RuntimeException("Character not found with ID: " + charId));
        characterRepository.delete(character);
    }
} 