package org.example.infocenterai.chat;

import org.example.infocenterai.chat.dto.ConversationResponse;
import org.example.infocenterai.chat.dto.RenameConversationRequest;
import org.example.infocenterai.user.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ConversationRepository conversationRepository;

    public ChatService(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    public List<ConversationResponse> getAllConversations(User user) {
        return conversationRepository.findAllByUserId(user.getId())
                .stream()
                .map(c -> new ConversationResponse(c.getId(), c.getTitle(), c.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public ConversationResponse createConversation(User user) {
        Conversation conversation = new Conversation("New Chat", user);
        Conversation saved = conversationRepository.save(conversation);
        return new ConversationResponse(saved.getId(), saved.getTitle(), saved.getCreatedAt());
    }

    public void deleteConversation(Long conversationId, User user) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        if (!conversation.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        conversationRepository.delete(conversation);
    }

    public ConversationResponse renameConversation(Long conversationId, RenameConversationRequest request, User user) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        if (!conversation.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        conversation.setTitle(request.getTitle());
        Conversation saved = conversationRepository.save(conversation);
        return new ConversationResponse(saved.getId(), saved.getTitle(), saved.getCreatedAt());
    }
}

