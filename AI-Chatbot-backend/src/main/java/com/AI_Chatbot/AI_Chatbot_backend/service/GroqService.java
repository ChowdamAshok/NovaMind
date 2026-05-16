package com.AI_Chatbot.AI_Chatbot_backend.service;

import com.AI_Chatbot.AI_Chatbot_backend.model.ChatMessage;
import com.AI_Chatbot.AI_Chatbot_backend.model.ChatResponse;
import com.AI_Chatbot.AI_Chatbot_backend.model.VoiceResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.model}")
    private String model;

    private final WebClient webClient = WebClient.builder()
            .codecs(configurer -> configurer
                    .defaultCodecs()
                    .maxInMemorySize(10 * 1024 * 1024))
            .build();

    // ✅ Normal text chat
    public ChatResponse chat(List<ChatMessage> messages) {
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("model", model);
            body.put("messages", messages);
            body.put("max_tokens", 1024);

            Map response = webClient.post()
                    .uri(apiUrl)
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            List choices = (List) response.get("choices");
            Map first = (Map) choices.get(0);
            Map message = (Map) first.get("message");
            String reply = (String) message.get("content");
            return new ChatResponse(reply);

        } catch (Exception e) {
            System.err.println("Chat Error: " + e.getMessage());
            e.printStackTrace();
            return new ChatResponse("Sorry, something went wrong: " + e.getMessage());
        }
    }

    // ✅ Multiple image chat
    public ChatResponse chatWithImage(List<String> base64Images, String question, List<String> imageTypes) {
        try {
            List<Map<String, Object>> content = new ArrayList<>();

            // Text part first
            Map<String, Object> textPart = new HashMap<>();
            textPart.put("type", "text");
            textPart.put("text", question != null && !question.isEmpty()
                    ? question
                    : "What is in these images? Describe each in detail.");
            content.add(textPart);

            // Add each image
            for (int i = 0; i < base64Images.size(); i++) {
                String base64 = base64Images.get(i);
                String mimeType = (imageTypes != null && i < imageTypes.size())
                        ? imageTypes.get(i)
                        : "image/jpeg";

                Map<String, Object> imagePart = new HashMap<>();
                imagePart.put("type", "image_url");
                Map<String, String> imageUrl = new HashMap<>();
                imageUrl.put("url", "data:" + mimeType + ";base64," + base64);
                imagePart.put("image_url", imageUrl);
                content.add(imagePart);
            }

            Map<String, Object> userMessage = new HashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", content);

            Map<String, Object> body = new HashMap<>();
            body.put("model", "meta-llama/llama-4-scout-17b-16e-instruct");
            body.put("messages", List.of(userMessage));
            body.put("max_tokens", 1024);

            System.out.println("Sending " + base64Images.size() + " images to Groq...");

            Map response = webClient.post()
                    .uri(apiUrl)
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            System.out.println("Vision response received!");

            List choices = (List) response.get("choices");
            Map first = (Map) choices.get(0);
            Map message = (Map) first.get("message");
            String reply = (String) message.get("content");
            return new ChatResponse(reply);

        } catch (Exception e) {
            System.err.println("Vision Error: " + e.getMessage());
            e.printStackTrace();
            return new ChatResponse("Sorry, image processing failed: " + e.getMessage());
        }
    }

    // ✅ PDF chat
    public ChatResponse chatWithPdf(String base64Pdf, String question) {
        try {
            // Decode base64 PDF
            byte[] pdfBytes = java.util.Base64.getDecoder().decode(base64Pdf);
            org.apache.pdfbox.pdmodel.PDDocument document = org.apache.pdfbox.Loader.loadPDF(pdfBytes);
            org.apache.pdfbox.text.PDFTextStripper stripper = new org.apache.pdfbox.text.PDFTextStripper();
            String pdfText = stripper.getText(document);
            document.close();

            // Trim if too long
            if (pdfText.length() > 12000) {
                pdfText = pdfText.substring(0, 12000) + "\n...[truncated]";
            }

            System.out.println("PDF text extracted, length: " + pdfText.length());

            // Build prompt
            String prompt = "The following is the content of a PDF document:\n\n"
                    + pdfText
                    + "\n\nBased on the above PDF content, answer this question: "
                    + (question != null && !question.isEmpty()
                            ? question
                            : "Summarize this PDF document.");

            Map<String, Object> userMessage = new HashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", prompt);

            Map<String, Object> body = new HashMap<>();
            body.put("model", model);
            body.put("messages", List.of(userMessage));
            body.put("max_tokens", 1024);

            System.out.println("Sending PDF content to Groq...");

            Map response = webClient.post()
                    .uri(apiUrl)
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            List choices = (List) response.get("choices");
            Map first = (Map) choices.get(0);
            Map message = (Map) first.get("message");
            String reply = (String) message.get("content");
            return new ChatResponse(reply);

        } catch (Exception e) {
            System.err.println("PDF Error: " + e.getMessage());
            e.printStackTrace();
            return new ChatResponse("Sorry, PDF processing failed: " + e.getMessage());
        }
    }

    // Voice transcription using Groq Whisper
    public VoiceResponse transcribeAudio(String base64Audio, String mimeType) {
        try {
            // Decode base64 audio
            byte[] audioBytes = java.util.Base64.getDecoder().decode(base64Audio);

            // Determine file extension
            String extension = "webm";
            if (mimeType != null) {
                if (mimeType.contains("mp4"))
                    extension = "mp4";
                else if (mimeType.contains("wav"))
                    extension = "wav";
                else if (mimeType.contains("ogg"))
                    extension = "ogg";
                else if (mimeType.contains("webm"))
                    extension = "webm";
            }

            // Write to temp file
            java.io.File tempFile = java.io.File.createTempFile("audio", "." + extension);
            java.nio.file.Files.write(tempFile.toPath(), audioBytes);

            System.out.println("Audio file size: " + tempFile.length() + " bytes");

            // Build multipart request to Groq Whisper
            String boundary = "----Boundary" + System.currentTimeMillis();

            java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
            java.io.PrintWriter writer = new java.io.PrintWriter(
                    new java.io.OutputStreamWriter(baos, "UTF-8"), true);

            // Add model field
            writer.append("--" + boundary).append("\r\n");
            writer.append("Content-Disposition: form-data; name=\"model\"").append("\r\n");
            writer.append("\r\n");
            writer.append("whisper-large-v3").append("\r\n");
            writer.flush();

            // Add file field
            writer.append("--" + boundary).append("\r\n");
            writer.append("Content-Disposition: form-data; name=\"file\"; filename=\"audio." + extension + "\"")
                    .append("\r\n");
            writer.append("Content-Type: " + (mimeType != null ? mimeType : "audio/webm")).append("\r\n");
            writer.append("\r\n");
            writer.flush();
            baos.write(audioBytes);
            baos.flush();

            writer.append("\r\n");
            writer.append("--" + boundary + "--").append("\r\n");
            writer.flush();

            byte[] requestBody = baos.toByteArray();

            // Call Groq Whisper API
            Map response = webClient.post()
                    .uri("https://api.groq.com/openai/v1/audio/transcriptions")
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "multipart/form-data; boundary=" + boundary)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            tempFile.delete();

            String transcript = (String) response.get("text");
            System.out.println("Transcript: " + transcript);
            return new VoiceResponse(transcript);

        } catch (Exception e) {
            System.err.println("Voice Error: " + e.getMessage());
            e.printStackTrace();
            return new VoiceResponse("Sorry, voice transcription failed: " + e.getMessage());
        }
    }
}