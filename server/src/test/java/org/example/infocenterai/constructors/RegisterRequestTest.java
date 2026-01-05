package org.example.infocenterai.constructors;

import org.example.infocenterai.auth.RegisterRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RegisterRequestTest {

    @Test
    void testNoArgsConstructor() {
        RegisterRequest request = new RegisterRequest();
        assertNotNull(request);
    }

    @Test
    void testAllArgsConstructor() {
        String firstName = "First";
        String lastName = "Last";
        String email = "test@example.com";
        String password = "password";
        RegisterRequest request = new RegisterRequest(firstName, lastName, email, password);
        assertNotNull(request);
        assertEquals(firstName, request.getFirstName());
        assertEquals(lastName, request.getLastName());
        assertEquals(email, request.getEmail());
        assertEquals(password, request.getPassword());
    }
}

