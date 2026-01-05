package org.example.infocenterai.constructors;

import org.example.infocenterai.security.JwtService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class JwtServiceTest {

    @Test
    void testConstructor() {
        JwtService service = new JwtService();
        assertNotNull(service);
    }
}

