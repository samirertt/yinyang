package com.example.backend.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "users")
public class UserModel {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "userId", nullable = false, unique = true)
    private int userId;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    private String rolesString; // Store roles as a comma-separated string

    @Column(name = "joinDate")
    private LocalDate joinDate;

    @PrePersist
    protected void onCreate() {
        this.joinDate = LocalDate.now();
    }

    // Transient method to get roles as a List<String>
    @Transient
    public List<String> getRoles() {
        return rolesString != null ? Arrays.asList(rolesString.split(",")) : List.of();
    }

    // Transient method to set roles from a List<String>
    public void setRoles(List<String> roles) {
        this.rolesString = roles != null ? String.join(",", roles) : null;
    }

    // Other getters and setters
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

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }
}