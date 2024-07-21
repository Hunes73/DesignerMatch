package com.pz.designmatch.repository;

import com.pz.designmatch.model.chat.ChatRoom;
import com.pz.designmatch.model.user.UserEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

  Optional<ChatRoom> findByChatId(String id);

  Optional<ChatRoom> findBySenderAndRecipient(UserEntity sender, UserEntity recipient);

  Optional<List<ChatRoom>> findChatBySender(UserEntity existingUser);
}