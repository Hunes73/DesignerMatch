package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

public class MyApiResponse {

  @JsonProperty("success")
  @Schema(description = "Czy status to sukces", example = "true", implementation = Boolean.class)
  private final Boolean success;

  @JsonProperty("message")
  @Schema(description = "Wiadomość", example = "Pomyślnie przetworzono zapytanie",
      implementation = String.class)
  private final String message;

  public MyApiResponse(Boolean success, String message) {
    this.success = success;
    this.message = message;
  }
}
