package org.example.infocenterai.constructors;

import org.example.infocenterai.auth.AuthenticationResponse;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AuthenticationResponseTest {

    @Test
    void testNoArgsConstructor() {
        AuthenticationResponse response = new AuthenticationResponse();
        assertNotNull(response);
    }

    @Test
    void testAllArgsConstructor() {
        String token = "token";
        String firstName = "First";
        String lastName = "Last";
        String role = "USER";
        AuthenticationResponse response = new AuthenticationResponse(token, firstName, lastName, role);
        assertNotNull(response);
        assertEquals(token, response.getToken());
        assertEquals(firstName, response.getFirstName());
        assertEquals(lastName, response.getLastName());
        assertEquals(role, response.getRole());
    }
}

