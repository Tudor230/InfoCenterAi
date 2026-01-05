package org.example.infocenterai.constructors;

import org.example.infocenterai.user.Role;
import org.example.infocenterai.user.dto.UserResponse;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserResponseTest {

    @Test
    void testConstructor() {
        Integer id = 1;
        String first = "First";
        String last = "Last";
        String email = "email";
        Role role = Role.USER;

        UserResponse response = new UserResponse(id, first, last, email, role);

        assertNotNull(response);
        assertEquals(id, response.getId());
        assertEquals(first, response.getFirstName());
        assertEquals(last, response.getLastName());
        assertEquals(email, response.getEmail());
    }
}

