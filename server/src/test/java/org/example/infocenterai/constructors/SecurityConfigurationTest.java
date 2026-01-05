package org.example.infocenterai.constructors;

import org.example.infocenterai.config.SecurityConfiguration;
import org.example.infocenterai.security.JwtAuthenticationFilter;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationProvider;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class SecurityConfigurationTest {

    @Mock
    private JwtAuthenticationFilter jwtAuthFilter;
    @Mock
    private AuthenticationProvider authenticationProvider;

    @Test
    void testConstructor() {
        SecurityConfiguration config = new SecurityConfiguration(jwtAuthFilter, authenticationProvider);
        assertNotNull(config);
    }
}

