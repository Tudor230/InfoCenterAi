package org.example.infocenterai.constructors;

import org.example.infocenterai.chat.dto.MessageRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class MessageRequestTest {

    @Test
    void testConstructor() {
        MessageRequest request = new MessageRequest();
        assertNotNull(request);
    }
}

