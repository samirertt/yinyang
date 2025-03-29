package com.example.backend.repository;

import com.example.backend.models.Character;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CharacterRepository extends JpaRepository<Character, Integer> {
}