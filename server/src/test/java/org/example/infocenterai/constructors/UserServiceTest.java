package org.example.infocenterai.constructors;

import org.example.infocenterai.user.UserRepository;
import org.example.infocenterai.user.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Test
    void testConstructor() {
        UserService service = new UserService(userRepository);
        assertNotNull(service);
    }
}

