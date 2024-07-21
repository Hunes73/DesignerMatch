package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode(callSuper = true)
public class ArtistRegisterRequest extends RegisterRequest {

  @NotEmpty
  @JsonProperty("firstname")
  @Schema(description = "Imię", example = "Jakub", implementation = String.class)
  private String firstname;

  @NotEmpty
  @JsonProperty("lastname")
  @Schema(description = "Nazwisko", example = "Kasinski", implementation = String.class)
  private String lastname;
}
