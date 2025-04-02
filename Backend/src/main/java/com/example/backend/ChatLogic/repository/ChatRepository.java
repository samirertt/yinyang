package com.example.backend.ChatLogic.repository;

import com.example.backend.models.ChatModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;



public interface ChatRepository extends JpaRepository<ChatModel, Integer> {
    Optional<ChatModel> findById(int Id);

    boolean existsById(int Id);

}

