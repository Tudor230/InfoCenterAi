package org.example.infocenterai.constructors;

import org.example.infocenterai.request.DeliveryMethod;
import org.example.infocenterai.request.RequestStatus;
import org.example.infocenterai.request.dto.RequestResponse;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

class RequestResponseTest {

    @Test
    void testConstructor() {
        Long id = 1L;
        String docType = "Type";
        String purpose = "Purpose";
        DeliveryMethod method = DeliveryMethod.DIGITAL_DOWNLOAD;
        String notes = "Notes";
        RequestStatus status = RequestStatus.PENDING;
        LocalDateTime now = LocalDateTime.now();
        Integer userId = 1;
        String fileId = "fileId";

        RequestResponse response = new RequestResponse(id, docType, purpose, method, notes, status, now, now, userId, fileId);

        assertNotNull(response);
        assertEquals(id, response.getId());
        assertEquals(docType, response.getDocumentType());
        assertEquals(purpose, response.getPurpose());
        assertEquals(method, response.getDeliveryMethod());
        assertEquals(notes, response.getAdditionalNotes());
        assertEquals(status, response.getStatus());
        assertEquals(now, response.getCreatedAt());
        assertEquals(now, response.getUpdatedAt());
        assertEquals(userId, response.getUserId());
        assertEquals(fileId, response.getDriveFileId());
    }
}

