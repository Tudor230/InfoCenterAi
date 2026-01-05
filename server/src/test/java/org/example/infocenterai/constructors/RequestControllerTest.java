package org.example.infocenterai.constructors;

import org.example.infocenterai.request.RequestController;
import org.example.infocenterai.request.RequestService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class RequestControllerTest {

    @Mock
    private RequestService requestService;

    @Test
    void testConstructor() {
        RequestController controller = new RequestController(requestService);
        assertNotNull(controller);
    }
}

