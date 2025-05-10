package com.example.backend.controller;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/crypt")
@CrossOrigin(origins = "http://localhost:5173") // allow CORS for Vite
public class ShareLink {

    private final String SECRET_KEY = "YinYang"; // Ideally use an env variable

    @GetMapping("/encrypt/{id}")
    public ResponseEntity<Object> encrypt(@PathVariable String id) {
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setPassword(SECRET_KEY);
        encryptor.setAlgorithm("PBEWithMD5AndDES");

        String encrypted = encryptor.encrypt(id);
        String urlSafeEncrypted = Base64.getUrlEncoder().encodeToString(encrypted.getBytes());

        Map<String, String> response = new HashMap<>();
        response.put("encrypted", urlSafeEncrypted);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/decrypt/{encrypted_id}")
    public ResponseEntity<Object> decrypt(@PathVariable String encrypted_id) {
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setPassword(SECRET_KEY);
        encryptor.setAlgorithm("PBEWithMD5AndDES");

        byte[] decodedBytes = Base64.getUrlDecoder().decode(encrypted_id);
        String originalEncrypted = new String(decodedBytes);
        String decrypted = encryptor.decrypt(originalEncrypted);

        Map<String, String> response = new HashMap<>();
        response.put("decrypted", decrypted);

        return ResponseEntity.ok(response);

    }
}
