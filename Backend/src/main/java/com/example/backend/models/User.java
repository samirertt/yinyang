package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "userId", nullable = false, unique = true)
    private int userId;


    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @NotBlank(message = "Email is Mandatory")
    @Email(message = "Invalid email format")
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "role", nullable = false)
    private String rolesString; // Store roles as a comma-separated string

    @Column(name = "joinDate")
    private LocalDate joinDate;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @PrePersist
    protected void onCreate() {
        this.joinDate = LocalDate.now();
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    @JsonProperty("roles")
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