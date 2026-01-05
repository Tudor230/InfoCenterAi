package org.example.infocenterai.constructors;

import org.example.infocenterai.ServerApplication;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ServerApplicationTest {

    @Test
    void testConstructor() {
        ServerApplication app = new ServerApplication();
        assertNotNull(app);
    }
}

