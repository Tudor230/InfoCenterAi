package org.example.infocenterai.constructors;

import org.example.infocenterai.drive.dto.DriveFileResponse;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

class DriveFileResponseTest {

    @Test
    void testConstructor() {
        String id = "fileId";
        String name = "fileName";
        Long size = 1024L;
        LocalDateTime now = LocalDateTime.now();
        String link = "http://link";

        DriveFileResponse response = new DriveFileResponse(id, name, size, now, link);

        assertNotNull(response);
        assertEquals(id, response.getId());
        assertEquals(name, response.getName());
        assertEquals(size, response.getSize());
        assertEquals(now, response.getCreatedTime());
    }
}

