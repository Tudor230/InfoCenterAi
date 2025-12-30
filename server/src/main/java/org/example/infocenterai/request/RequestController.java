package org.example.infocenterai.request;

import org.example.infocenterai.request.dto.CreateRequestRequest;
import org.example.infocenterai.request.dto.RequestResponse;
import org.example.infocenterai.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @PostMapping
    public ResponseEntity<RequestResponse> createRequest(
            @RequestBody CreateRequestRequest request,
            @AuthenticationPrincipal User user
    ) {
        return new ResponseEntity<>(requestService.createRequest(request, user), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<RequestResponse>> getUserRequests(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(requestService.getUserRequests(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestResponse> getRequestById(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(requestService.getRequestById(id, user));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<RequestResponse> cancelRequest(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(requestService.cancelRequest(id, user));
    }
}
