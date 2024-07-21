package com.pz.designmatch.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import lombok.Getter;

@Getter
public class ExperienceDto {

  @JsonProperty("company")
  @Schema(description = "Nazwa firmy", example = "Google", implementation = String.class)
  private final String company;

  @JsonProperty("city")
  @Schema(description = "Miasto", example = "Warszawa", implementation = String.class)
  private final String city;

  @JsonProperty("position")
  @Schema(description = "Stanowisko", example = "Backend developer", implementation = String.class)
  private final String position;

  @JsonProperty("description")
  @Schema(description = "Opis", example = "Praca nad backendem aplikacji", implementation = String.class)
  private final String description;

  @JsonProperty("start_date")
  @JsonFormat(pattern = "dd/MM/yyyy")
  @Schema(description = "Data rozpoczęcia", example = "01/10/2021", implementation = String.class)
  private LocalDate startDate;

  @JsonProperty("end_date")
  @JsonFormat(pattern = "dd/MM/yyyy")
  @Schema(description = "Data zakończenia", example = "01/10/2021", implementation = String.class)
  private LocalDate endDate;

  @JsonCreator
  public ExperienceDto(String company, String city, String position, LocalDate startDate, LocalDate endDate,
      String description) {
    this.company = company;
    this.city = city;
    this.position = position;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }
}
