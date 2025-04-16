package com.example.backend.repository;

import com.example.backend.dto.CharacterFilter;
import com.example.backend.models.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Integer> {

    //this is to get all the filters. Will use later in the 3rd phase
    @Query(value = """
    SELECT c.char_personality AS charPersonality, c.char_img AS charImage
    FROM characters c
    INNER JOIN (
        SELECT char_personality, MIN(char_id) AS min_id
        FROM characters
        GROUP BY char_personality
    ) sub ON c.char_personality = sub.char_personality AND c.char_id = sub.min_id
    """, nativeQuery = true)
    List<CharacterFilter> findDistinctPersonalities();

    List<Character> findByCharPersonality(String personality);

    List<Character> findByCharNameContainingIgnoreCase(String name);

    Optional<Character> findByCharName(String charName);
}