package com.example.backend.repository;

import com.example.backend.models.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Integer> {

    //this is to get all the filters. Will use later in the 3rd phase
    @Query(value = "SELECT DISTINCT char_personality FROM characters", nativeQuery = true)
    List<String> findDistinctPersonalities();

    List<Character> findByCharPersonality(String personality);

    List<Character> findByCharNameContainingIgnoreCase(String name);
}