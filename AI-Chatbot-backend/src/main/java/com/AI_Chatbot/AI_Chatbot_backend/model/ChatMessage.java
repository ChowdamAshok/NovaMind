package com.AI_Chatbot.AI_Chatbot_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {

    private String role;    // "user", "assistant", or "system"
    private String content; // the actual message text

}
