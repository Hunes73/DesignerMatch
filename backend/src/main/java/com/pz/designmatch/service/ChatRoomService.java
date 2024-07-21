package com.pz.designmatch.service;

import com.pz.designmatch.model.chat.ChatRoom;
import java.util.List;
import java.util.Optional;

public interface ChatRoomService {

  Optional<String> getChatId(String senderUsername, String recipientUsername, boolean createIfNotExist);

  Optional<List<ChatRoom>> findChatBySender(String username);
}
