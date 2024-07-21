package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

@Getter
@SuppressWarnings("SpellCheckingInspection")
public class RegisterRequest {

  @NotEmpty
  @JsonProperty("email")
  @Schema(description = "Adres email", example = "jkasinski1@Gmail.com", implementation = String.class,
      required = true)
  private String email;

  @NotEmpty
  @JsonProperty("username")
  @Schema(description = "Nazwa użytkownika", example = "jkasinski1", implementation = String.class,
      required = true)
  private String username;


  @NotEmpty
  @JsonProperty("password")
  @Schema(description = "Hasło", example = "password", implementation = String.class, required = true,
      minLength = 6)
  private String password;
}

