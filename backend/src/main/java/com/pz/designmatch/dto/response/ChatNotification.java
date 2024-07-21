package com.pz.designmatch.dto.response;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

public class ChatNotification {

  @JsonProperty("id")
  @Schema(example = "1")
  private Long id;

  @JsonProperty("senderId")
  @Schema(example = "1")
  private String senderId;

  @JsonProperty("senderName")
  @Schema(example = "jkasinski1")
  private String senderName;


  @JsonCreator
  public ChatNotification(Long id, String senderId, String senderName) {
    this.id = id;
    this.senderId = senderId;
    this.senderName = senderName;
  }
}