package com.example.backend.UserLogic.repository;

import com.example.backend.Models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel, Integer> {
    Optional<UserModel> findByUsername(String username);

    boolean existsByUsername(String username);
}
