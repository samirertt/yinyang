package com.example.backend.UserLogic.service;

import com.example.backend.Models.CharacterModel;
import com.example.backend.UserLogic.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharacterService {

    @Autowired
    private CharacterRepository characterRepository;

    public List<CharacterModel> getAllCharacters()
    {
        return  characterRepository.findAll();
    }

}
