package org.example.infocenterai.constructors;

import org.example.infocenterai.auth.AuthenticationService;
import org.example.infocenterai.security.JwtService;
import org.example.infocenterai.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private UserRepository repository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @Mock
    private AuthenticationManager authenticationManager;

    @Test
    void testConstructor() {
        AuthenticationService service = new AuthenticationService(repository, passwordEncoder, jwtService, authenticationManager);
        assertNotNull(service);
    }
}


