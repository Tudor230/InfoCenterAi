package org.example.infocenterai.admin;

import org.example.infocenterai.request.RequestService;
import org.example.infocenterai.request.RequestStatus;
import org.example.infocenterai.request.dto.RequestResponse;
import org.example.infocenterai.user.UserService;
import org.example.infocenterai.user.dto.UserResponse;
import org.example.infocenterai.admin.dto.AdminConversationResponse;
import org.example.infocenterai.chat.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final RequestService requestService;
    private final UserService userService;
    private final ChatService chatService;

    public AdminController(RequestService requestService, UserService userService, ChatService chatService) {
        this.requestService = requestService;
        this.userService = userService;
        this.chatService = chatService;
    }

    @GetMapping("/requests")
    public ResponseEntity<List<RequestResponse>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    @GetMapping("/requests/{id}")
    public ResponseEntity<RequestResponse> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.getRequestByIdAdmin(id));
    }

    @PatchMapping("/requests/{id}/status")
    public ResponseEntity<RequestResponse> updateRequestStatus(
            @PathVariable Long id,
            @RequestParam RequestStatus status
    ) {
        return ResponseEntity.ok(requestService.updateRequestStatus(id, status));
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Integer userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<AdminConversationResponse>> getAllConversations() {
        return ResponseEntity.ok(chatService.getAllConversationsForAdmin());
    }
}
