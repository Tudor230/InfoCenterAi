package org.example.infocenterai.request.dto;

import org.example.infocenterai.request.DeliveryMethod;
import org.example.infocenterai.request.RequestStatus;

import java.time.LocalDateTime;

public class RequestResponse {
    private Long id;
    private String documentType;
    private String purpose;
    private DeliveryMethod deliveryMethod;
    private String additionalNotes;
    private RequestStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer userId;
    private String driveFileId;

    public RequestResponse(Long id, String documentType, String purpose, DeliveryMethod deliveryMethod, String additionalNotes, RequestStatus status, LocalDateTime createdAt, LocalDateTime updatedAt, Integer userId, String driveFileId) {
        this.id = id;
        this.documentType = documentType;
        this.purpose = purpose;
        this.deliveryMethod = deliveryMethod;
        this.additionalNotes = additionalNotes;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.driveFileId = driveFileId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public DeliveryMethod getDeliveryMethod() {
        return deliveryMethod;
    }

    public void setDeliveryMethod(DeliveryMethod deliveryMethod) {
        this.deliveryMethod = deliveryMethod;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getDriveFileId() {
        return driveFileId;
    }

    public void setDriveFileId(String driveFileId) {
        this.driveFileId = driveFileId;
    }
}
