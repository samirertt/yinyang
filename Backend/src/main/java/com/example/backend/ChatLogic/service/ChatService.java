package com.example.backend.ChatLogic.service;

import com.example.backend.models.ChatModel;
import com.example.backend.ChatLogic.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {
    @Autowired
    private ChatRepository chatRepository;

    public Optional<ChatModel> getChatById(int Id) {
        return chatRepository.findById(Id);
    }

    public ChatModel createChat(ChatModel chat)
    {
        return chatRepository.save(chat);
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


        if(allChats.isPresent())
        {
            List<ChatModel> presentChats = allChats.get();
            System.out.println(presentChats.getFirst());

            List<ChatModel> userChats = new ArrayList<ChatModel>();

            for(int i = 0;i<presentChats.size();i++)
            {
                if(presentChats.get(i).getUserId()==id)
                {
                    userChats.add(presentChats.get(i));
                }
            }
            if(userChats!=null)
                return  Optional.of(userChats);
            else
            {

                throw new RuntimeException("\nUser with id: " + id + " doesn't have chats!");
            }
        }
        else
        {
            throw new RuntimeException("\nCouldn't get Chats!\n");
        }




    }

    public boolean chatExists(int Id) {
        return chatRepository.existsById(Id);
    }



}
