package org.example.infocenterai.constructors;

import org.example.infocenterai.auth.AuthenticationRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AuthenticationRequestTest {

    @Test
    void testNoArgsConstructor() {
        AuthenticationRequest request = new AuthenticationRequest();
        assertNotNull(request);
    }

    @Test
    void testAllArgsConstructor() {
        String email = "test@example.com";
        String password = "password";
        AuthenticationRequest request = new AuthenticationRequest(email, password);
        assertNotNull(request);
        assertEquals(email, request.getEmail());
        assertEquals(password, request.getPassword());
    }
}

