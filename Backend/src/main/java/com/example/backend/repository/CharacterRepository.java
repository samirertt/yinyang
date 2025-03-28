package com.example.backend.UserLogic.repository;

import com.example.backend.Models.CharacterModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterRepository extends JpaRepository<CharacterModel,Integer> {
    CharacterModel findByCharName(String charName);
}
