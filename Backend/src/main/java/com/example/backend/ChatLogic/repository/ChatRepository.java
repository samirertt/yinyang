package com.example.backend.ChatLogic.repository;

import com.example.backend.models.ChatModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<ChatModel, Integer> {
    Optional<ChatModel> findById(int Id);

    boolean existsById(int Id);

    @Query("SELECT c.charId, COUNT(c) as usageCount FROM ChatModel c GROUP BY c.charId")
    List<Object[]> countChatsPerCharacter();
}

