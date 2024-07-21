package com.pz.designmatch.service;

import com.pz.designmatch.dto.request.ChatMessageRequest;
import com.pz.designmatch.dto.response.ChatMessageResponse;
import com.pz.designmatch.dto.response.InterlocutorResponse;
import java.util.List;

public interface ChatMessageService {

  ChatMessageResponse saveChatMessage(ChatMessageRequest chatMessageRequest);

  long countNewMessages(String senderUsername, String recipientUsername);

  List<ChatMessageResponse> findChatMessages(String senderUsername, String recipientUsername);

  ChatMessageResponse findById(Long id);

  List<InterlocutorResponse> findConversations(String username);
}
