package org.example.infocenterai.constructors;

import org.example.infocenterai.chat.ChatController;
import org.example.infocenterai.chat.ChatService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class ChatControllerTest {

    @Mock
    private ChatService chatService;

    @Test
    void testConstructor() {
        ChatController controller = new ChatController(chatService);
        assertNotNull(controller);
    }
}

