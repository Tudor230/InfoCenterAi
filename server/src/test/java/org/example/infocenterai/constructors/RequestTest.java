package org.example.infocenterai.constructors;

import org.example.infocenterai.request.DeliveryMethod;
import org.example.infocenterai.request.Request;
import org.example.infocenterai.user.User;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RequestTest {

    @Test
    void testNoArgsConstructor() {
        Request request = new Request();
        assertNotNull(request);
    }

    @Test
    void testConstructor() {
        User user = new User();
        String docType = "Type";
        String purpose = "Purpose";
        DeliveryMethod method = DeliveryMethod.DIGITAL_DOWNLOAD;
        String notes = "Notes";

        Request request = new Request(user, docType, purpose, method, notes);
        assertNotNull(request);
        assertEquals(user, request.getUser());
        assertEquals(docType, request.getDocumentType());
        assertEquals(purpose, request.getPurpose());
        assertEquals(method, request.getDeliveryMethod());
        assertEquals(notes, request.getAdditionalNotes());
    }
}

