package com.pz.designmatch.service.impl;

import com.pz.designmatch.dto.request.ChatMessageRequest;
import com.pz.designmatch.dto.response.ChatMessageResponse;
import com.pz.designmatch.dto.response.InterlocutorResponse;
import com.pz.designmatch.model.chat.ChatMessage;
import com.pz.designmatch.model.chat.ChatRoom;
import com.pz.designmatch.model.enums.MessageStatus;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.ChatMessageRepository;
import com.pz.designmatch.service.ChatMessageService;
import com.pz.designmatch.util.mapper.ChatMessageMapper;
import jakarta.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {

  private final ChatMessageRepository chatMessageRepository;
  private final ChatMessageMapper chatMessageMapper;
  private final ChatRoomServiceImpl chatRoomServiceImpl;

  @Autowired
  public ChatMessageServiceImpl(ChatMessageRepository chatMessageRepository,
      ChatMessageMapper chatMessageMapper, ChatRoomServiceImpl chatRoomServiceImpl) {
    this.chatMessageRepository = chatMessageRepository;
    this.chatMessageMapper = chatMessageMapper;
    this.chatRoomServiceImpl = chatRoomServiceImpl;
  }

  @Override
  public ChatMessageResponse saveChatMessage(ChatMessageRequest chatMessageRequest) {
    ChatMessage chatMessage = chatMessageMapper.mapToEntity(chatMessageRequest, true);
    return chatMessageMapper.mapToDto(chatMessageRepository.save(chatMessage));
  }

  @Override
  public long countNewMessages(String senderUsername, String recipientUsername) {
    return chatMessageRepository.countBySender_UsernameAndRecipient_UsernameAndStatus(
        senderUsername, recipientUsername, MessageStatus.RECEIVED);
  }

  @Override
  public List<ChatMessageResponse> findChatMessages(String senderUsername, String recipientUsername) {
    String chatId = chatRoomServiceImpl.getChatId(senderUsername, recipientUsername, false)
        .orElseThrow(() -> new EntityNotFoundException(
            "Nie znaleziono czatu o nazwie: " + senderUsername + "_" + recipientUsername));
    List<ChatMessage> messages =
        chatId.isEmpty() ? new ArrayList<>() : chatMessageRepository.findByChatId(chatId);

    if (!messages.isEmpty()) {
      updateStatuses(messages, senderUsername);
    }

    List<ChatMessageResponse> result = new ArrayList<>();
    for (ChatMessage message : messages) {
      result.add(chatMessageMapper.mapToDto(message));
    }
    return result;
  }

  @Override
  public ChatMessageResponse findById(Long id) {
    return chatMessageRepository.findById(id)
        .map(chatMessage -> {
          chatMessage.setStatus(MessageStatus.DELIVERED);
          return chatMessageMapper.mapToDto(chatMessageRepository.save(chatMessage));
        })
        .orElseThrow(() ->
            new EntityNotFoundException("Nie znaleziono wiadomości o id: " + id));
  }

  @Override
  public List<InterlocutorResponse> findConversations(String username) {
    List<InterlocutorResponse> result = new ArrayList<>();
    List<ChatRoom> chatRooms = chatRoomServiceImpl.findChatBySender(username)
        .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono czatu dla użytkownika: " + username));
    for (ChatRoom chatRoom : chatRooms) {
      UserEntity interlocutor = chatRoom.getRecipient();
      if (!interlocutor.getUsername().equals(username)) { // Dodatkowa warunek sprawdzający username
        ChatMessage lastMessage = chatMessageRepository.findFirstByIdOrderByTimestampDesc(
                chatRoom.getChatId())
            .orElseThrow(() -> new EntityNotFoundException(
                "Nie znaleziono wiadomości dla czatu: " + chatRoom.getChatId()));
        if (interlocutor.getArtistProfile() != null) {
          result.add(new InterlocutorResponse(interlocutor.getUsername(),
              interlocutor.getArtistProfile().getFirstname(),
              interlocutor.getArtistProfile().getLastname(), lastMessage.getContent()));
        } else {
          result.add(
              new InterlocutorResponse(interlocutor.getUsername(), interlocutor.getCompanyProfile().getName(),
                  lastMessage.getContent()));
        }
      }
    }
    return result;
  }

  public void updateStatuses(List<ChatMessage> messages, String senderUsername) {
    for (ChatMessage message : messages) {
      if (message.getStatus().equals(MessageStatus.RECEIVED) && message.getRecipient().getUsername()
          .equals(senderUsername)) {
        message.setStatus(MessageStatus.DELIVERED);
        chatMessageRepository.save(message);
      }
    }
  }

}
