package org.example.infocenterai.constructors;

import org.example.infocenterai.chat.Conversation;
import org.example.infocenterai.user.User;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ConversationTest {

    @Test
    void testNoArgsConstructor() {
        Conversation conversation = new Conversation();
        assertNotNull(conversation);
    }

    @Test
    void testConstructor() {
        User user = new User();
        String title = "Title";
        Conversation conversation = new Conversation(title, user);
        assertNotNull(conversation);
        assertEquals(title, conversation.getTitle());
        assertEquals(user, conversation.getUser());
    }
}

