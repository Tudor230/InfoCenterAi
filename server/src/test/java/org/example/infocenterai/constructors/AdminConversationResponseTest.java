package org.example.infocenterai.constructors;

import org.example.infocenterai.admin.dto.AdminConversationResponse;
import org.example.infocenterai.admin.dto.AdminConversationResponse.AdminUserResponse;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

class AdminConversationResponseTest {

    @Test
    void testConstructor() {
        Long id = 1L;
        String title = "Title";
        LocalDateTime now = LocalDateTime.now();
        int messageCount = 5;
        AdminUserResponse user = new AdminUserResponse("First", "Last", "email@test.com");

        AdminConversationResponse response = new AdminConversationResponse(id, title, now, now, messageCount, user);

        assertNotNull(response);
        assertEquals(id, response.getId());
        assertEquals(title, response.getTitle());
        assertEquals(now, response.getCreatedAt());
        assertEquals(now, response.getUpdatedAt());
    }

    @Test
    void testAdminUserResponseConstructor() {
        String firstName = "First";
        String lastName = "Last";
        String email = "email@test.com";

        AdminUserResponse user = new AdminUserResponse(firstName, lastName, email);

        assertNotNull(user);
        assertEquals(firstName, user.getFirstName());
        assertEquals(lastName, user.getLastName());
        assertEquals(email, user.getEmail());
    }
}
