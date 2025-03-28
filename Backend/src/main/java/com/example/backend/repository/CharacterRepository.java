package com.example.backend.repository;

import com.example.backend.models.User;
import com.example.backend.models.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Integer>{
    
}

