package org.example.infocenterai.constructors;

import org.example.infocenterai.request.dto.CreateRequestRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CreateRequestRequestTest {

    @Test
    void testConstructor() {
        CreateRequestRequest request = new CreateRequestRequest();
        assertNotNull(request);
    }
}

