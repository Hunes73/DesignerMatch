package com.pz.designmatch.util.mapper;

import com.pz.designmatch.dto.request.ChatMessageRequest;
import com.pz.designmatch.dto.response.ChatMessageResponse;
import com.pz.designmatch.model.chat.ChatMessage;
import com.pz.designmatch.model.chat.ChatRoom;
import com.pz.designmatch.model.enums.MessageStatus;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.UserRepository;
import com.pz.designmatch.service.impl.ChatRoomServiceImpl;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.TypedQuery;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageMapper {

  private final UserRepository userRepository;
  private final ChatRoomServiceImpl chatRoomServiceImpl;
  private final EntityManager entityManager;

  @Autowired
  public ChatMessageMapper(ChatRoomServiceImpl chatRoomServiceImpl, UserRepository userRepository,
      EntityManager entityManager) {
    this.chatRoomServiceImpl = chatRoomServiceImpl;
    this.userRepository = userRepository;
    this.entityManager = entityManager;
  }


  public ChatMessageResponse mapToDto(ChatMessage chatMessage) {
    return new ChatMessageResponse(chatMessage.getId(), chatMessage.getChat().getId(),
        chatMessage.getSender().getId().toString(), chatMessage.getSender().getUsername(),
        chatMessage.getRecipient().getId().toString(), chatMessage.getRecipient().getUsername(),
        chatMessage.getContent(), chatMessage.getTimestamp());
  }

  public ChatMessage mapToEntity(ChatMessageRequest chatMessageRequest, Boolean createIfNotExist) {
    UserEntity sender = userRepository.findByUsername(chatMessageRequest.getSenderUsername()).orElseThrow(
        () -> new EntityNotFoundException(
            "Nie znaleziono użytkownika o nazwie: " + chatMessageRequest.getSenderUsername()));
    UserEntity recipient = userRepository.findByUsername(chatMessageRequest.getRecipientUsername())
        .orElseThrow(() -> new EntityNotFoundException(
            "Nie znaleziono użytkownika o nazwie: " + chatMessageRequest.getRecipientUsername()));

    String chatId = chatRoomServiceImpl.getChatId(chatMessageRequest.getSenderUsername(),
        chatMessageRequest.getRecipientUsername(), createIfNotExist).orElseThrow(
        () -> new EntityNotFoundException(
            "Nie znaleziono czatu o nazwie: " + chatMessageRequest.getSenderUsername() + "_"
                + chatMessageRequest.getRecipientUsername()));

    TypedQuery<ChatRoom> query = entityManager.createQuery(
        "SELECT cr FROM ChatRoom cr WHERE cr.chatId = :chatId", ChatRoom.class);
    query.setParameter("chatId", chatId);
    query.setMaxResults(1);

    List<ChatRoom> resultList = query.getResultList();

    if (!resultList.isEmpty()) {
      ChatRoom chatRoom = resultList.get(0);
      return new ChatMessage(chatRoom, sender, recipient, chatMessageRequest.getContent(),
          LocalDateTime.now(), MessageStatus.RECEIVED);
    } else {
      throw new EntityNotFoundException(
          "Nie znaleziono czatu o nazwie: " + chatMessageRequest.getSenderUsername() + "_"
              + chatMessageRequest.getRecipientUsername());
    }
  }

}
