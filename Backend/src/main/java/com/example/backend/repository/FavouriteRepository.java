package com.example.backend.repository;


import com.example.backend.models.Favourite;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.Character;

import java.util.List;

public interface FavouriteRepository extends JpaRepository<Favourite, Long> {
    boolean existsByUserAndCharacter(User user, Character character);

    List<Favourite> findByUser(User user);

    void deleteByUserAndCharacter(User user, Character character);
}
