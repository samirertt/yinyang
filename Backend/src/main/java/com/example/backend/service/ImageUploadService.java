package com.example.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageUploadService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(MultipartFile file, String folder) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // Validate file type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Invalid file type. Only images are allowed.");
        }

        // Validate file size (max 5MB)
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("File size exceeds 5MB limit");
        }

        Map uploadResult = cloudinary.uploader().upload(
            file.getBytes(),
            ObjectUtils.asMap(
                "folder", folder,
                "resource_type", "auto",
                "quality", "auto",
                "fetch_format", "auto",
                "width", 400,
                "height", 400,
                "crop", "fill",
                "gravity", "auto"
            )
        );
        return (String) uploadResult.get("url");
    }

    public void deleteImage(String publicId) throws IOException {
        if (publicId == null || publicId.trim().isEmpty()) {
            throw new IllegalArgumentException("Invalid public ID");
        }
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
} 