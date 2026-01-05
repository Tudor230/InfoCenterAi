package org.example.infocenterai.constructors;

import org.example.infocenterai.user.Role;
import org.example.infocenterai.user.User;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void testNoArgsConstructor() {
        User user = new User();
        assertNotNull(user);
    }

    @Test
    void testAllArgsConstructor() {
        Integer id = 1;
        String firstName = "First";
        String lastName = "Last";
        String email = "test@example.com";
        String password = "password";
        Role role = Role.USER;
        User user = new User(id, firstName, lastName, email, password, role);
        assertNotNull(user);
        assertEquals(id, user.getId());
        assertEquals(firstName, user.getFirstName());
        assertEquals(lastName, user.getLastName());
        assertEquals(email, user.getEmail());
        assertEquals(password, user.getPassword());
        assertEquals(role, user.getRole());
    }
}

