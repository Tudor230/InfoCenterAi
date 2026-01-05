package org.example.infocenterai.constructors;

import org.example.infocenterai.chat.dto.RenameConversationRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RenameConversationRequestTest {

    @Test
    void testConstructor() {
        RenameConversationRequest request = new RenameConversationRequest();
        assertNotNull(request);
    }
}

