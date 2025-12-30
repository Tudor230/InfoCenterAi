package org.example.infocenterai.chat;

import org.springframework.stereotype.Service;

public class MockAiService implements AiService {
    @Override
    public String generateResponse(String userMessage) {
        return "This is a mocked AI response to: " + userMessage;
    }
}

