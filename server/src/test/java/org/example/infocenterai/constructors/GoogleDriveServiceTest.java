package org.example.infocenterai.constructors;

import org.example.infocenterai.drive.GoogleDriveService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class GoogleDriveServiceTest {

    @Test
    void testConstructor() {
        GoogleDriveService service = new GoogleDriveService();
        assertNotNull(service);
    }
}

