package com.pz.designmatch.controller;

import com.pz.designmatch.dto.request.ChatMessageRequest;
import com.pz.designmatch.dto.response.ChatMessageResponse;
import com.pz.designmatch.dto.response.ChatNotification;
import com.pz.designmatch.dto.response.InterlocutorResponse;
import com.pz.designmatch.service.impl.ChatMessageServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

  private final SimpMessagingTemplate messagingTemplate;
  private final ChatMessageServiceImpl chatMessageServiceImpl;

  @Autowired
  public ChatController(SimpMessagingTemplate messagingTemplate,
      ChatMessageServiceImpl chatMessageServiceImpl) {
    this.messagingTemplate = messagingTemplate;
    this.chatMessageServiceImpl = chatMessageServiceImpl;
  }

  @MessageMapping("/chat")
  public void processMessage(
      @Payload
      ChatMessageRequest chatMessageRequest) {
    ChatMessageResponse saved = chatMessageServiceImpl.saveChatMessage(chatMessageRequest);
    messagingTemplate.convertAndSendToUser(
        saved.getRecipientUsername(), "/queue/messages",
        new ChatNotification(
            saved.getId(),
            saved.getSenderUsername(),
            saved.getRecipientUsername()));
  }


  @Operation(summary = "Zwraca liczbę nowych wiadomości w konwersacji",
      responses = {
          @ApiResponse(responseCode = "200", description = "Liczba nowych wiadomości w konwersacji",
              content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Nie znaleziono konwersacji",
              content = @Content(mediaType = "application/json")),},
      parameters = {
          @Parameter(name = "senderUsername", description = "Nazwa użytkownika nadawcy", required = true,
              example = "user1"),
          @Parameter(name = "recipientUsername", description = "Nazwa użytkownika odbiorcy", required = true,
              example = "user2"),},
      tags = {"Chat"})
  @GetMapping("/messages/{senderUsername}/{recipientUsername}/count")
  public ResponseEntity<Long> countNewMessages(
      @PathVariable("senderUsername")
      String senderId,
      @PathVariable("recipientUsername")
      String recipientId) {
    return ResponseEntity.ok(chatMessageServiceImpl.countNewMessages(senderId, recipientId));
  }


  @Operation(summary = "Zwraca wszystkie wiadomości w konwersacji",
      responses = {
          @ApiResponse(responseCode = "200", description = "Lista wiadomości w konwersacji",
              content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Nie znaleziono konwersacji",
              content = @Content(mediaType = "application/json")),},
      parameters = {
          @Parameter(name = "senderUsername", description = "Nazwa użytkownika nadawcy", required = true,
              example = "user1"),
          @Parameter(name = "recipientUsername", description = "Nazwa użytkownika odbiorcy", required = true,
              example = "user2"),},
      tags = {"Chat"})
  @GetMapping("/messages/{senderUsername}/{recipientUsername}")
  public ResponseEntity<?> findChatMessages(
      @PathVariable("senderUsername")
      String senderUsername,
      @PathVariable("recipientUsername")
      String recipientUsername) {
    return ResponseEntity.ok(chatMessageServiceImpl.findChatMessages(senderUsername, recipientUsername));
  }


  @Operation(summary = "Zwraca wiadomość o podanym id",
      responses = {
          @ApiResponse(responseCode = "200", description = "Wiadomość o podanym id",
              content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Nie znaleziono wiadomości o podanym id",
              content = @Content(mediaType = "application/json")),},
      parameters = {
          @Parameter(name = "id", description = "Id wiadomości", required = true, example = "1"),},
      tags = {"Chat"})
  @GetMapping("/messages/{id}")
  public ResponseEntity<?> findMessage(
      @PathVariable
      Long id) {
    return ResponseEntity.ok(chatMessageServiceImpl.findById(id));
  }


  @Operation(summary = "Zwraca wszystkie konwersacje użytkownika",
      responses = {
          @ApiResponse(responseCode = "200", description = "Lista konwersacji użytkownika",
              content = @Content(mediaType = "application/json",
                  array = @ArraySchema(schema = @Schema(implementation = InterlocutorResponse.class)))),
          @ApiResponse(responseCode = "404", description = "Nie znaleziono użytkownika",
              content = @Content(mediaType = "application/json")),},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika", required = true,
              example = "user1"),},
      tags = {"Chat"})
  @GetMapping("/messages/conversations/{username}")
  public ResponseEntity<List<InterlocutorResponse>> findConversations(
      @PathVariable
      String username) {
    return ResponseEntity.ok(chatMessageServiceImpl.findConversations(username));
  }
}
