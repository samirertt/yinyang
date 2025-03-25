package com.example.backend.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "characters")
public class Character {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "charId")
    private int charId;


    @Column(name = "charName")
    private String charName;

    @Column(name = "charPersonality")
    private String charPersonality;

    @Column(name = "charImg")
    private String charImg;

    @Column(name = "charDescription")
    private String charDescription;

    @Column(name = "charUsage")
    private double charUsage;

    @Column(name = "charPrompt")
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
