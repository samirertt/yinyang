package com.example.backend.controller;

import com.example.backend.dto.FavouriteRequest;
import com.example.backend.models.Character;
import com.example.backend.service.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favourites")
public class FavouriteController {

    @Autowired
    private FavouriteService favouriteService;

    @PostMapping("/like")
    public ResponseEntity<String> likeCharacter(@RequestBody FavouriteRequest request) {
        favouriteService.likeCharacter( request.getUserId() , request.getCharacterId());
        return ResponseEntity.ok("Character added to favourites.");
    }

    @DeleteMapping("/unlike")
    public ResponseEntity<String> unlikeCharacter(@RequestBody FavouriteRequest request) {
        favouriteService.unlikeCharacter(request.getUserId() , request.getCharacterId());
        return ResponseEntity.ok("Character removed from favourites.");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Character>> getUserFavourites(@PathVariable Long userId) {
        List<com.example.backend.models.Character> favourites = favouriteService.getFavouritesByUser(userId);
        return ResponseEntity.ok(favourites);
    }
}
