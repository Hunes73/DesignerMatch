package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

@Getter
public class LoginRequest {

  @NotEmpty
  @JsonProperty("email")
  @Schema(description = "Adres email", example = "jkasinski1@gmail.com", implementation = String.class,
      required = true)
  private String email;

  @NotEmpty
  @JsonProperty("password")
  @Schema(description = "Hasło", example = "password", implementation = String.class, required = true)
  private String password;
}
