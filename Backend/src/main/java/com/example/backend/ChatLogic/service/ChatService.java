package com.example.backend.ChatLogic.service;

import com.example.backend.models.Character;
import com.example.backend.models.ChatModel;
import com.example.backend.ChatLogic.repository.ChatRepository;
import com.example.backend.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ChatService {
    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private CharacterRepository characterRepository;

    public Optional<ChatModel> getChatById(int Id) {
        return chatRepository.findById(Id);
    }

    public ChatModel createChat(ChatModel chat)
    {
        return chatRepository.save(chat);
    }

    public List<Object> getUserChatMetadata(int userId) {
        List<ChatModel> userChats = getChatsByUserId(userId).orElse(new ArrayList<>());
        List<Object> chatMetadataList = new ArrayList<>();
        for (ChatModel chat : userChats) {
            Character character = characterRepository.findById(chat.getCharId()).orElse(null);
            if (character != null) {
                chatMetadataList.add(
                        Map.of(
                                "chatId", chat.getChatId(),
                                "charId", chat.getCharId(),
                                "name", character.getCharName(),
                                "image", character.getCharImg()
                        )
                );
            }
        }
        return chatMetadataList; // Always return a list, even if empty
    }

    public boolean updateChat(int Id, String message)
    {
        Optional<ChatModel> checkChat = getChatById(Id);

        if(checkChat.isPresent())
        {
            ChatModel currentChat = checkChat.get();
            currentChat.setChatText(currentChat.getChatText() + message + "$$");

            chatRepository.save(currentChat);
            return true;
        }
        else
        {
            throw new RuntimeException("Item with id: " + Id + " was not found.");
        }

    }

    public List<ChatModel> getAllChats() {
        return chatRepository.findAll();
    }

    public Optional<List<ChatModel>> getChatsByUserId(int id) {
        Optional<List<ChatModel>> allChats = Optional.of(chatRepository.findAll());
        if (allChats.isPresent()) {
            List<ChatModel> presentChats = allChats.get();
            System.out.println("All chats: " + presentChats); // Add this log

            List<ChatModel> userChats = new ArrayList<>();
            for (ChatModel chat : presentChats) {
                if (chat.getUserId() == id) {
                    userChats.add(chat);
                }
            }
            System.out.println("User chats for userId " + id + ": " + userChats); // Add this log
            return Optional.of(userChats); // Return empty list instead of throwing
        }
        return Optional.of(new ArrayList<>());
    }

    public boolean chatExists(int Id) {
        return chatRepository.existsById(Id);
    }

    public boolean deleteChat(int chatId) {
        if (chatRepository.existsById(chatId)) {
            chatRepository.deleteById(chatId);
            return true;
        }
        return false;
    }

    @Transactional
    public void updateCharacterUsageCounts() {
        List<Object[]> usageCounts = chatRepository.countChatsPerCharacter();
        
        for (Object[] result : usageCounts) {
            int charId = (int) result[0];
            long count = (long) result[1];
            
            Character character = characterRepository.findById(charId)
                .orElseThrow(() -> new RuntimeException("Character not found with id: " + charId));
            
            character.setCharUsage(count);
            characterRepository.save(character);
        }
    }

}
