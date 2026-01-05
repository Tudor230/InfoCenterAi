package org.example.infocenterai.constructors;

import org.example.infocenterai.chat.Conversation;
import org.example.infocenterai.chat.Message;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class MessageTest {

    @Test
    void testNoArgsConstructor() {
        Message message = new Message();
        assertNotNull(message);
    }

    @Test
    void testConstructor() {
        String content = "Content";
        String role = "user";
        Conversation conversation = new Conversation();
        Message message = new Message(content, role, conversation);
        assertNotNull(message);
        assertEquals(content, message.getContent());
    }
}

