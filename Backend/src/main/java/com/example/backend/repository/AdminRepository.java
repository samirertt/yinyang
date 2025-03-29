package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.models.User;

@Repository
public interface AdminRepository extends JpaRepository<User, Integer> {
    // findAll() is already provided by JpaRepository
    // findById() is already provided by JpaRepository
    // save() is already provided by JpaRepository
}

