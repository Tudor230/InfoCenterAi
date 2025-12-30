package org.example.infocenterai.chat;

import org.example.infocenterai.chat.dto.ConversationResponse;
import org.example.infocenterai.chat.dto.RenameConversationRequest;
import org.example.infocenterai.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat/conversations")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping
    public ResponseEntity<List<ConversationResponse>> getAllConversations(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(chatService.getAllConversations(user));
    }

    @PostMapping
    public ResponseEntity<ConversationResponse> createConversation(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(chatService.createConversation(user));
    }

    @DeleteMapping("/{conversationId}")
    public ResponseEntity<Void> deleteConversation(
            @PathVariable Long conversationId,
            @AuthenticationPrincipal User user
    ) {
        chatService.deleteConversation(conversationId, user);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{conversationId}")
    public ResponseEntity<ConversationResponse> renameConversation(
            @PathVariable Long conversationId,
            @RequestBody RenameConversationRequest request,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(chatService.renameConversation(conversationId, request, user));
    }
}

