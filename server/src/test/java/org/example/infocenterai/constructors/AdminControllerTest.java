package org.example.infocenterai.constructors;

import org.example.infocenterai.admin.AdminController;
import org.example.infocenterai.chat.ChatService;
import org.example.infocenterai.request.RequestService;
import org.example.infocenterai.user.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class AdminControllerTest {

    @Mock
    private RequestService requestService;
    @Mock
    private UserService userService;
    @Mock
    private ChatService chatService;

    @Test
    void testConstructor() {
        AdminController controller = new AdminController(requestService, userService, chatService);
        assertNotNull(controller);
    }
}

