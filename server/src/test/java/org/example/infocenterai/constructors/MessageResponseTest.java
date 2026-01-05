package org.example.infocenterai.constructors;

import org.example.infocenterai.chat.dto.MessageResponse;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

class MessageResponseTest {

    @Test
    void testConstructor() {
        Long id = 1L;
        String role = "user";
        String content = "Hello";
        LocalDateTime now = LocalDateTime.now();

        MessageResponse response = new MessageResponse(id, role, content, now);

        assertNotNull(response);
        assertEquals(id, response.getId());
        assertEquals(role, response.getRole());
        assertEquals(content, response.getContent());
        assertEquals(now, response.getCreatedAt());
    }
}

