package com.example.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Chats")
public class ChatModel {

    @Column(name = "userId", nullable = false, unique = true)
    private int userId;

    @Column(name = "charId", nullable = false, unique = true)
    private int charId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatId", nullable = false)
    private int chatId;

    @Column(name = "chatText", nullable = false)
    private String chatText;

//Constructors, Getters, and Setters

    public ChatModel() {}

    public ChatModel(int userId, int charId, String chatText) {
        this.userId = userId;
        this.charId = charId;
        this.chatText = chatText;
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCharId() {
        return charId;
    }

    public void setCharId(int charId) {
        this.charId = charId;
    }

    public String getChatText() {
        return chatText;
    }

    public void setChatText(String chatText) {
        this.chatText = chatText;
    }


}


