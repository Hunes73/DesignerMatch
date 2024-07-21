package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

@Getter
public class ChatMessageRequest {

  @NotEmpty
  @JsonProperty("sender_username")
  @Schema(description = "Nazwa użytkownika nadawcy", example = "jkasinski1", implementation = String.class)
  private String senderUsername;

  @NotEmpty
  @JsonProperty("recipient_username")
  @Schema(description = "Nazwa użytkownika odbiorcy", example = "jkasinski2", implementation = String.class)
  private String recipientUsername;

  @NotEmpty
  @JsonProperty("content")
  @Schema(description = "Treść wiadomości", example = "Cześć, chciałbym zlecić projekt logo.",
      implementation = String.class)
  private String content;
}
