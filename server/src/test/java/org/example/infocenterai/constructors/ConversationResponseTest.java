package org.example.infocenterai.constructors;

import org.example.infocenterai.chat.dto.ConversationResponse;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

class ConversationResponseTest {

    @Test
    void testConstructor() {
        Long id = 1L;
        String title = "Title";
        LocalDateTime now = LocalDateTime.now();

        ConversationResponse response = new ConversationResponse(id, title, now);

        assertNotNull(response);
        assertEquals(id, response.getId());
        assertEquals(title, response.getTitle());
        assertEquals(now, response.getCreatedAt());
    }
}

