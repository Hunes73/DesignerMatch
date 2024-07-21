package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;

public class InterlocutorResponse {

  @NotEmpty
  @JsonProperty("username")
  @Schema(example = "jkasinski1", description = "Nazwa użytkownika", implementation = String.class)
  private String username;

  @JsonProperty("first_name")
  @Schema(example = "Jakub", description = "Imię", implementation = String.class)
  private String firstName;

  @JsonProperty("last_name")
  @Schema(example = "Kasinski", description = "Nazwisko", implementation = String.class)
  private String lastName;

  @JsonProperty("company_name")
  @Schema(description = "Nazwa firmy", implementation = String.class)
  private String companyName;

  @NotEmpty
  @JsonProperty("last_message")
  @Schema(example = "Cześć, chciałbym zająć się stworzeniem strony internetowej",
      description = "Ostatnia wiadomość", implementation = String.class)
  private String lastMessage;

  public InterlocutorResponse(String username, String companyName, String lastMessage) {
    this.username = username;
    this.companyName = companyName;
    this.lastMessage = lastMessage;
  }

  public InterlocutorResponse(String username, String firstName, String lastName, String lastMessage) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.lastMessage = lastMessage;
  }
}
