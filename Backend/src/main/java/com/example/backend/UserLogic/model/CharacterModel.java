package com.example.backend.UserLogic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity

@Table(name = "characters")
public class CharacterModel {

    @Id
    @Column(name = "charId")
    private int charId;

    @Column(name = "charName")
    private String charName;

    @Column(name = "charPersonality")
    private Personality charPersonality;

    @Column(name = "charDescription")
    private String charDescription;

    @Column(name = "charUsage")
    private float charUsage;

    @Column(name = "charPrompt")
    private String charPrompt;



}
