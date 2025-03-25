package com.example.backend.Models;

import java.time.LocalDate;

public class UserModel {
    private int userId;
    private String username;
    private String password;
    private String role;
    private LocalDate joinDate;
    private byte[] image;

    // Constructors
    public UserModel() {}

    public UserModel(int userId, String username, String password, String role, LocalDate joinDate) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.role = role;
        this.joinDate = joinDate;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}