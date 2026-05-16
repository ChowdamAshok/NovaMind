package com.AI_Chatbot.AI_Chatbot_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageRequest {
    private List<String> base64Images;
    private List<String> imageTypes;
    private String question;
}