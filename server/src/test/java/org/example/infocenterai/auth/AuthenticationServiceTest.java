package org.example.infocenterai.auth;

import org.example.infocenterai.security.JwtService;
import org.example.infocenterai.user.Role;
import org.example.infocenterai.user.User;
import org.example.infocenterai.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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

    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        authenticationService = new AuthenticationService(repository, passwordEncoder, jwtService, authenticationManager);
    }

    @Test
    void testRegister_Success() {
        RegisterRequest request = new RegisterRequest("First", "Last", "test@example.com", "password");
        when(repository.findByEmail(request.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");
        when(jwtService.generateToken(any(), any(User.class))).thenReturn("jwtToken");

        AuthenticationResponse response = authenticationService.register(request);

        assertNotNull(response);
        assertEquals("jwtToken", response.getToken());
        assertEquals("First", response.getFirstName());
        assertEquals("Last", response.getLastName());
        assertEquals("USER", response.getRole());

        verify(repository).save(any(User.class));
    }

    @Test
    void testRegister_EmailAlreadyExists() {
        RegisterRequest request = new RegisterRequest("First", "Last", "test@example.com", "password");
        when(repository.findByEmail(request.getEmail())).thenReturn(Optional.of(new User()));

        assertThrows(RuntimeException.class, () -> authenticationService.register(request));
        verify(repository, never()).save(any(User.class));
    }

    @Test
    void testAuthenticate_Success() {
        AuthenticationRequest request = new AuthenticationRequest("test@example.com", "password");
        User user = new User();
        user.setFirstName("First");
        user.setLastName("Last");
        user.setEmail("test@example.com");
        user.setRole(Role.USER);

        when(repository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(any(), any(User.class))).thenReturn("jwtToken");

        AuthenticationResponse response = authenticationService.authenticate(request);

        assertNotNull(response);
        assertEquals("jwtToken", response.getToken());

        verify(authenticationManager).authenticate(any());
    }
}

