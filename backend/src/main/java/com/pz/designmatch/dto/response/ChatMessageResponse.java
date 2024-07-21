package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.pz.designmatch.util.DefaultLocalDateTimeDeserializer;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ChatMessageResponse {

  @JsonProperty("id")
  @Schema(example = "1")
  private Long id;

  @JsonProperty("chat_id")
  @Schema(example = "1_1")
  private Long chatId;

  @JsonProperty("sender_id")
  @Schema(example = "1")
  private String senderId;

  @JsonProperty("sender_username")
  @Schema(example = "jkasinski1")
  private String senderUsername;

  @JsonProperty("recipient_id")
  @Schema(example = "2")
  private String recipientId;

  @JsonProperty("recipient_username")
  @Schema(example = "jkowalski2")
  private String recipientUsername;

  @JsonProperty("content")
  @Schema(example = "Hello!")
  private String content;

  @JsonProperty("timestamp")
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Zagreb")
  @JsonDeserialize(using = DefaultLocalDateTimeDeserializer.class)
  @Schema(example = "2021-06-01 12:00:00")
  private LocalDateTime timestamp;

  @JsonCreator
  public ChatMessageResponse(Long id, Long chatId, String senderId, String senderUsername, String recipientId,
      String recipientUsername, String content, LocalDateTime timestamp) {
    this.id = id;
    this.chatId = chatId;
    this.senderId = senderId;
    this.senderUsername = senderUsername;
    this.recipientId = recipientId;
    this.recipientUsername = recipientUsername;
    this.content = content;
    this.timestamp = timestamp;
  }
}
