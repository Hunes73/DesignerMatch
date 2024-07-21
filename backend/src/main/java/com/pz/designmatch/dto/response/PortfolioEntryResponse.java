package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

public class PortfolioEntryResponse {

  @JsonProperty("id")
  @Schema(description = "Identyfikator", example = "1", implementation = Long.class)
  private Long id;

  @JsonProperty("name")
  @Schema(description = "Nazwa", example = "Kubek", implementation = String.class)
  private String name;

  @JsonProperty("description")
  @Schema(description = "Opis", example = "Kubek z logo", implementation = String.class)
  private String description;

  public PortfolioEntryResponse(Long id, String name, String description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
