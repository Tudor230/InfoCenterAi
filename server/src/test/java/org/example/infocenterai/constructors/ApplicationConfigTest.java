package org.example.infocenterai.constructors;

import org.example.infocenterai.config.ApplicationConfig;
import org.example.infocenterai.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class ApplicationConfigTest {

    @Mock
    private UserRepository repository;

    @Test
    void testConstructor() {
        ApplicationConfig config = new ApplicationConfig(repository);
        assertNotNull(config);
    }
}

