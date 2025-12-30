package org.example.infocenterai.request;

import org.example.infocenterai.request.dto.CreateRequestRequest;
import org.example.infocenterai.request.dto.RequestResponse;
import org.example.infocenterai.user.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestService {

    private final RequestRepository requestRepository;

    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    public RequestResponse createRequest(CreateRequestRequest requestDto, User user) {
        Request request = new Request(
                user,
                requestDto.getDocumentType(),
                requestDto.getPurpose(),
                requestDto.getDeliveryMethod(),
                requestDto.getAdditionalNotes()
        );
        Request saved = requestRepository.save(request);
        return mapToResponse(saved);
    }

    public List<RequestResponse> getUserRequests(User user) {
        return requestRepository.findByUserId(user.getId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public RequestResponse getRequestById(Long id, User user) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (!request.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return mapToResponse(request);
    }

    public RequestResponse cancelRequest(Long id, User user) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (!request.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new RuntimeException("Only pending requests can be cancelled");
        }

        request.setStatus(RequestStatus.CANCELLED);
        Request saved = requestRepository.save(request);
        return mapToResponse(saved);
    }

    private RequestResponse mapToResponse(Request request) {
        return new RequestResponse(
                request.getId(),
                request.getDocumentType(),
                request.getPurpose(),
                request.getDeliveryMethod(),
                request.getAdditionalNotes(),
                request.getStatus(),
                request.getCreatedAt(),
                request.getUpdatedAt()
        );
    }
}
