package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FavouriteRequest {

    @JsonProperty("userName")
    private String userName;

    @JsonProperty("charName")
    private String charName;

    // Getters and setters
    public String getUserName() {
        return userName;
    }

    public void setUserName(String username) {
        this.userName = username;
    }

    public String getCharacterName() {
        return charName;
    }

    public void setCharacterName(String charName) {
        this.charName = charName;
    }

}
