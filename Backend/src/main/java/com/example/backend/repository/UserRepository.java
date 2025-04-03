package com.example.backend.repository;

import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);


    @Query("SELECT YEAR(u.joinDate) as year, COUNT(u) as count " +
            "FROM User u " +
            "WHERE u.joinDate IS NOT NULL " +
            "GROUP BY YEAR(u.joinDate)")
    List<Object[]> getUserCountsByYear();
}
