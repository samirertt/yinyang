package com.example.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "characters")
public class Character {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "char_Id")
    private int charId;


    @Column(name = "char_Name")
    private String charName;

    @Column(name = "char_Personality")
    private String charPersonality;

    @Column(name = "char_Img")
    private String charImg;

    @Column(name = "char_Description")
    private String charDescription;

    @Column(name = "char_Usage")
    private double charUsage;

    @Column(name = "char_Prompt")
    private String charPrompt;

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

    public double getCharUsage() {
        return charUsage;
    }

    public void setCharUsage(double charUsage) {
        this.charUsage = charUsage;
    }

    public String getCharPrompt() {
        return charPrompt;
    }

    public void setCharPrompt(String charPrompt) {
        this.charPrompt = charPrompt;
    }
}
