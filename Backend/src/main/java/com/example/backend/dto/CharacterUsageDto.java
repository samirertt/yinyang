package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CharacterUsageDto {
    @JsonProperty("charName")
    private String characterName;

    // getters and setters
    public String getCharacterName() {
        return characterName;
    }
    public void setCharacterName(String characterName) {
        this.characterName = characterName;
    }
}
