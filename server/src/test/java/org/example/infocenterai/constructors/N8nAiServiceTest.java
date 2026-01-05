package org.example.infocenterai.constructors;

import org.example.infocenterai.chat.N8nAiService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class N8nAiServiceTest {

    @Test
    void testConstructor() {
        N8nAiService service = new N8nAiService();
        assertNotNull(service);
    }
}

