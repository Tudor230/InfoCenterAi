package org.example.infocenterai.constructors;

import org.example.infocenterai.auth.AuthenticationController;
import org.example.infocenterai.auth.AuthenticationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class AuthenticationControllerTest {

    @Mock
    private AuthenticationService service;

    @Test
    void testConstructor() {
        AuthenticationController controller = new AuthenticationController(service);
        assertNotNull(controller);
    }
}

