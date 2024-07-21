package com.pz.designmatch.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import lombok.Getter;

@Getter
public class EducationDto {

  @JsonProperty("school_name")
  @Schema(description = "Nazwa szkoły", example = "Politechnika Warszawska", implementation = String.class)
  private String schoolName;

  @JsonProperty("faculty")
  @Schema(description = "Wydział", example = "Wydział Informatyki, Elektroniki i Telekomunikacji",
      implementation = String.class)
  private String faculty;

  @JsonProperty("field_of_study")
  @Schema(description = "Kierunek", example = "Informatyka", implementation = String.class)
  private String fieldOfStudy;

  @JsonProperty("degree")
  @Schema(description = "Stopień", example = "Inżynier", implementation = String.class)
  private String degree;

  @JsonProperty("start_date")
  @JsonFormat(pattern = "dd/MM/yyyy")
  @Schema(description = "Data rozpoczęcia", example = "01/10/2017", implementation = String.class)
  private LocalDate startDate;

  @JsonProperty("end_date")
  @JsonFormat(pattern = "dd/MM/yyyy")
  @Schema(description = "Data zakończenia", example = "01/10/2021", implementation = String.class)
  private LocalDate endDate;

  @JsonProperty("description")
  @Schema(description = "Opis", example = "Studia inżynierskie na kierunku Informatyka",
      implementation = String.class)
  private String description;

  @JsonCreator
  public EducationDto(String schoolName, String faculty, String fieldOfStudy, String degree,
      LocalDate startDate,
      LocalDate endDate, String description) {
    this.schoolName = schoolName;
    this.faculty = faculty;
    this.fieldOfStudy = fieldOfStudy;
    this.degree = degree;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }
}
