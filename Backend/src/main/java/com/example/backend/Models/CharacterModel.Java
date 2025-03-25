package com.example.backend.Models;

public class CharacterModel 
{
    private int charId;
    private String charName;
    private String charPersonality;
    private String charImg;
    private String charDescription;
    private Double charUsage;
    private String charPrompt;

    // Getters and Setters
    public int getCharId() {
        return charId;
    }

    public void setCharId(int charId) {
        this.charId = charId;
    }

    public String getCharName() {
        return charName;
    }

    public void setCharName(String charName) {
        this.charName = charName;
    }

    public String getCharPersonality() {
        return charPersonality;
    }

    public void setCharPersonality(String charPersonality) {
        this.charPersonality = charPersonality;
    }

    public String getCharImg() {
        return charImg;
    }

    public void setCharImg(String charImg) {
        this.charImg = charImg;
    }

    public String getCharDescription() {
        return charDescription;
    }

    public void setCharDescription(String charDescription) {
        this.charDescription = charDescription;
    }

    public Double getCharUsage() {
        return charUsage;
    }

    public void setCharUsage(Double charUsage) {
        this.charUsage = charUsage;
    }

    public String getCharPrompt() {
        return charPrompt;
    }

    public void setCharPrompt(String charPrompt) {
        this.charPrompt = charPrompt;
    }
}