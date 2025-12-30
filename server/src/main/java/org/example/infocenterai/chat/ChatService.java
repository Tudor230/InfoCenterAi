package org.example.infocenterai.chat;

import org.example.infocenterai.chat.dto.ConversationResponse;
import org.example.infocenterai.chat.dto.MessageRequest;
import org.example.infocenterai.chat.dto.MessageResponse;
import org.example.infocenterai.chat.dto.RenameConversationRequest;
import org.example.infocenterai.user.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final AiService aiService;

    public ChatService(ConversationRepository conversationRepository, MessageRepository messageRepository, AiService aiService) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.aiService = aiService;
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

    public List<MessageResponse> getMessages(Long conversationId, User user) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        if (!conversation.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId)
                .stream()
                .map(m -> new MessageResponse(m.getId(), m.getRole(), m.getContent(), m.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public MessageResponse sendMessage(Long conversationId, MessageRequest request, User user) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        if (!conversation.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        // Save user message
        Message userMessage = new Message(request.getContent(), "user", conversation);
        messageRepository.save(userMessage);

        // AI Logic
        String aiResponseContent = aiService.generateResponse(request.getContent());

        // Save AI message
        Message aiMessage = new Message(aiResponseContent, "assistant", conversation);
        Message savedAiMessage = messageRepository.save(aiMessage);

        return new MessageResponse(savedAiMessage.getId(), savedAiMessage.getRole(), savedAiMessage.getContent(), savedAiMessage.getCreatedAt());
    }
}
