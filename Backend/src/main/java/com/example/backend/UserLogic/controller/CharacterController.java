package com.example.backend.UserLogic.controller;

import com.example.backend.Models.CharacterModel;
import com.example.backend.UserLogic.service.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/characters")
@CrossOrigin(origins = "http://localhost:5173")
public class CharacterController {

    @Autowired
    private CharacterService characterService;

    @GetMapping("/all")
    public List<CharacterModel> getAllCharacters(){
        return characterService.getAllCharacters();
    }

}
