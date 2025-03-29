package com.example.backend.ChatLogic.controller;

import com.example.backend.ChatLogic.service.ChatService;
import com.example.backend.models.ChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:5173")

public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/getUserChats")
    public ResponseEntity<Object> getUserChats(@RequestBody Map<String, Integer> credentials) {
        Integer userId = credentials.get("userId");

        Optional<List<ChatModel>> chat = chatService.getChatsByUserId(userId);

        if(chat.isPresent())
        {
            return ResponseEntity.ok(chat);
        }
        else
        {
            return ResponseEntity.status(404).body("\nUser with id: "+userId + " not found!\n");

        }

    }

    @PostMapping("/createChat")
    public ResponseEntity<Object> create(@RequestBody Map<String, Object> credentials) {
        Integer charId = (Integer) credentials.get("charId");
        Integer userId = (Integer) credentials.get("userId");
        String chatMessage = (String) credentials.get("message");

        ChatModel toAdd = new ChatModel();
        toAdd.setCharId(charId);
        toAdd.setUserId(userId);
        toAdd.setChatText(chatMessage + "$$");

        ChatModel chat =  chatService.createChat(toAdd);

        if(chat!=null)
        {
            return ResponseEntity.ok(chat);
        }
        else
        {
            return ResponseEntity.status(404).body("Couldn't Add Chat");
        }

    }


    @PostMapping("/sendMessage")
    public ResponseEntity<String> send(@RequestBody Map<String, Object> credentials) {
        Integer chatId = (Integer) credentials.get("chatId");
        String chatMessage = (String) credentials.get("message");

        boolean sent =  chatService.updateChat(chatId,chatMessage);

        if(sent)
        {
            return ResponseEntity.ok("Message Sent");
        }
        else
        {
           return ResponseEntity.status(404).body("Chat not found");
        }

    }

    @PostMapping("/getMessages")
    public ResponseEntity<Object> getMessages(@RequestBody Map<String, Integer> credentials) {
        Integer chatId = credentials.get("chatId");

        Optional<ChatModel> chat =  chatService.getChatById(chatId);

        if(chat.isPresent())
        {
            return ResponseEntity.ok(chat.get());
        }
        else
        {
            return ResponseEntity.status(404).body("Chat not found");
        }

    }

}
