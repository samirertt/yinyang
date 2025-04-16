package com.example.backend.dto;


public class CharacterFilter {
    public CharacterFilter(String charPersonality, String charImage){
        this.charPersonality = charPersonality;
        this.charImage = charImage;
    }
    private String charPersonality;

    public String getCharImage() {
        return charImage;
    }

    public void setCharImage(String charImage) {
        this.charImage = charImage;
    }

    public String getCharPersonality() {
        return charPersonality;
    }

    public void setCharPersonality(String charPersonality) {
        this.charPersonality = charPersonality;
    }

    private String charImage;
}
