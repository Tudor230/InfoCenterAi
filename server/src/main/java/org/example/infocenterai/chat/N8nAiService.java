package org.example.infocenterai.chat;

import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@Primary
public class N8nAiService implements AiService {

    private final RestTemplate restTemplate;

    public N8nAiService() {
        this.restTemplate = new RestTemplate();
    }

    @Override
    public String generateResponse(String userMessage) {
        String url = "https://n8n-service-scmr.onrender.com/webhook-test/message";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = new HashMap<>();
        body.put("message", userMessage);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        try {
            Map response = restTemplate.postForObject(url, request, Map.class);

            if (response != null && response.containsKey("output")) {
                return response.get("output").toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error communicating with AI service: " + e.getMessage();
        }

        return "Sorry, I couldn't get a valid response from the AI.";
    }
}

