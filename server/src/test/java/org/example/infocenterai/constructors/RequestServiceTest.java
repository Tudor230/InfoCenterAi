package org.example.infocenterai.constructors;

import org.example.infocenterai.request.RequestRepository;
import org.example.infocenterai.request.RequestService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class RequestServiceTest {

    @Mock
    private RequestRepository requestRepository;

    @Test
    void testConstructor() {
        RequestService service = new RequestService(requestRepository);
        assertNotNull(service);
    }
}

