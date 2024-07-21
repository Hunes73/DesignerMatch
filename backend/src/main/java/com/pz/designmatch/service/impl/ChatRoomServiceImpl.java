package com.pz.designmatch.service.impl;

import com.pz.designmatch.model.chat.ChatRoom;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.ChatRoomRepository;
import com.pz.designmatch.repository.UserRepository;
import com.pz.designmatch.service.ChatRoomService;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {

  private final ChatRoomRepository chatRoomRepository;
  private final UserRepository userRepository;

  @Autowired
  public ChatRoomServiceImpl(ChatRoomRepository chatRoomRepository, UserRepository userRepository) {
    this.chatRoomRepository = chatRoomRepository;
    this.userRepository = userRepository;
  }

  @Override
  public Optional<String> getChatId(String senderUsername, String recipientUsername,
      boolean createIfNotExist) {
    UserEntity existingSender = userRepository.findByUsername(senderUsername)
        .orElseThrow(
            () -> new EntityNotFoundException("Nie znaleziono użytkownika o nazwie: " + senderUsername));

    UserEntity existingRecipient = userRepository.findByUsername(recipientUsername)
        .orElseThrow(
            () -> new EntityNotFoundException("Nie znaleziono użytkownika o nazwie: " + recipientUsername));

    var chatId = String.format("%d_%d", existingSender.getId(), existingRecipient.getId());
    Optional<ChatRoom> existingChatRoom = chatRoomRepository.findBySenderAndRecipient(existingSender,
        existingRecipient);
    if (existingChatRoom.isEmpty()) {
      if (!createIfNotExist) {
        return Optional.empty();
      }
      ChatRoom senderRecipient = new ChatRoom(chatId, existingSender, existingRecipient);
      ChatRoom recipientSender = new ChatRoom(chatId, existingRecipient, existingSender);
      chatRoomRepository.save(senderRecipient);
      chatRoomRepository.save(recipientSender);
      return Optional.of(chatId);
    }
    return existingChatRoom.map(ChatRoom::getChatId);
  }

  @Override
  public Optional<List<ChatRoom>> findChatBySender(String username) {
    UserEntity existingUser = userRepository.findByUsername(username)
        .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono użytkownika o nazwie: " + username));
    return chatRoomRepository.findChatBySender(existingUser);
  }
}
