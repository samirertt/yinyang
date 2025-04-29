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
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CharacterRepository characterRepository;

    public void likeCharacter(String userName, String characterName) {
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Character character = characterRepository.findByCharName(characterName)
                .orElseThrow(() -> new RuntimeException("Character not found"));

        if (!favouriteRepository.existsByUserAndCharacter(user, character)) {
            Favourite favourite = new Favourite();
            favourite.setCharacter(character);
            favourite.setUser(user);

            favouriteRepository.save(favourite);
        }
    }

    public void unlikeCharacter(String userName, String characterName) {
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Character character = characterRepository.findByCharName(characterName)
                .orElseThrow(() -> new RuntimeException("Character not found"));

        favouriteRepository.deleteByUserAndCharacter(user, character);
    }

    public List<Character> getFavouritesByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Favourite> favourites = favouriteRepository.findByUserId(user.getUserId());
        return favourites.stream()
                .map(Favourite::getCharacter)
                .toList();
    }
}
