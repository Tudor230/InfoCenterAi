package org.example.infocenterai.constructors;

import org.example.infocenterai.drive.DriveController;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class DriveControllerTest {

    @Test
    void testConstructor() {
        // DriveController uses field injection (@Autowired), so we just test the default constructor
        DriveController controller = new DriveController();
        assertNotNull(controller);
    }
}

