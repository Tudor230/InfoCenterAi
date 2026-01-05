package org.example.infocenterai.constructors;

import org.example.infocenterai.chat.AiService;
import org.example.infocenterai.chat.ChatService;
import org.example.infocenterai.chat.ConversationRepository;
import org.example.infocenterai.chat.MessageRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class ChatServiceTest {

    @Mock
    private ConversationRepository conversationRepository;
    @Mock
    private MessageRepository messageRepository;
    @Mock
    private AiService aiService;

    @Test
    void testConstructor() {
        ChatService service = new ChatService(conversationRepository, messageRepository, aiService);
        assertNotNull(service);
    }
}

