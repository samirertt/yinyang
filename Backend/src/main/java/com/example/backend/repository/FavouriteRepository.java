package com.example.backend.repository;


import com.example.backend.models.Favourite;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.Character;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavouriteRepository extends JpaRepository<Favourite, Long> {
    boolean existsByUserAndCharacter(User user, Character character);

    @Query(value = "SELECT * FROM favourites WHERE user_id = :userId", nativeQuery = true)
    List<Favourite> findByUserId(@Param("userId") int userId);

    void deleteByUserAndCharacter(User user, Character character);
}
