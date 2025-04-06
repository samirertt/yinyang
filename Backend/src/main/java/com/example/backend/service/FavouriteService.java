package com.example.backend.service;

import com.example.backend.models.Favourite;
import com.example.backend.models.User;
import com.example.backend.repository.CharacterRepository;
import com.example.backend.repository.FavouriteRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.models.Character;

import java.util.List;

@Service
public class FavouriteService {

    @Autowired
    private FavouriteRepository favouriteRepository;
    private UserRepository userRepository;
    private CharacterRepository characterRepository;

    public void likeCharacter(Long userId, Long characterId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Character character = characterRepository.findById(Math.toIntExact(characterId))
                .orElseThrow(() -> new RuntimeException("Character not found"));

        if (!favouriteRepository.existsByUserAndCharacter(user, character)) {
            favouriteRepository.save(new Favourite(user, character));
        }
    }

    public void unlikeCharacter(Long userId, Long characterId) {
        User user = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"));
        Character character = characterRepository.findById(Math.toIntExact(characterId))
                        .orElseThrow(() -> new RuntimeException("Character not found"));

        favouriteRepository.deleteByUserAndCharacter(user, character);
    }

    public List<com.example.backend.models.Character> getFavouritesByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Favourite> favourites = favouriteRepository.findByUser(user);
        return favourites.stream()
                .map(Favourite::getCharacter)
                .toList();
    }
}
