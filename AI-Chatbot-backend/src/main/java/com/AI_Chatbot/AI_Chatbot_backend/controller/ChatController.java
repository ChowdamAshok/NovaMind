package com.AI_Chatbot.AI_Chatbot_backend.controller;

import com.AI_Chatbot.AI_Chatbot_backend.model.ChatRequest;
import com.AI_Chatbot.AI_Chatbot_backend.model.ChatResponse;
import com.AI_Chatbot.AI_Chatbot_backend.model.ImageRequest;
import com.AI_Chatbot.AI_Chatbot_backend.model.PdfRequest;
import com.AI_Chatbot.AI_Chatbot_backend.model.VoiceRequest;
import com.AI_Chatbot.AI_Chatbot_backend.model.VoiceResponse;
import com.AI_Chatbot.AI_Chatbot_backend.service.GroqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private GroqService groqService;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        ChatResponse response = groqService.chat(request.getMessages());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("NovaMind backend is working!");
    }

    @PostMapping("/image")
    public ResponseEntity<ChatResponse> chatWithImage(@RequestBody ImageRequest request) {
        ChatResponse response = groqService.chatWithImage(
                request.getBase64Images(),
                request.getQuestion(),
                request.getImageTypes());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/pdf")
    public ResponseEntity<ChatResponse> chatWithPdf(@RequestBody PdfRequest request) {
        ChatResponse response = groqService.chatWithPdf(
                request.getBase64Pdf(),
                request.getQuestion());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/voice")
    public ResponseEntity<VoiceResponse> transcribeVoice(@RequestBody VoiceRequest request) {
        VoiceResponse response = groqService.transcribeAudio(
                request.getBase64Audio(),
                request.getMimeType());
        return ResponseEntity.ok(response);
    }

}