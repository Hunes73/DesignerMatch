package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.pz.designmatch.model.enums.City;
import com.pz.designmatch.util.DefaultLocalDateTimeDeserializer;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;


@SuppressWarnings("unused")
public class CommissionResponse {

  @JsonProperty("id")
  @Schema(example = "1", description = "Identyfikator zlecenia", implementation = Long.class)
  private Long id;

  @JsonProperty("client_username")
  @Schema(example = "jkasinski1", description = "Nazwa użytkownika klienta", implementation = String.class)
  private String clientUsername;

  @NotEmpty
  @JsonProperty("contractor_username")
  @Schema(example = "jkasinski2", description = "Nazwa użytkownika wykonawcy", implementation = String.class)
  private String contractorUsername;

  @NotEmpty
  @JsonProperty("title")
  @Schema(example = "Wykonanie strony internetowej", implementation = String.class, description = "Tytuł")
  private String title;

  @NotEmpty
  @JsonProperty("company_name")
  @Schema(example = "PZ")
  private String companyName;

  @NotEmpty
  @JsonProperty("description")
  @Schema(example = "Wykonanie strony internetowej dla firmy PZ")
  private String description;

  @NotEmpty
  @JsonProperty("commissioned_at")
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Zagreb")
  @JsonDeserialize(using = DefaultLocalDateTimeDeserializer.class)
  @Schema(example = "2021-06-01 12:00:00", implementation = String.class)
  private LocalDateTime commissionedAt;

  @JsonProperty("deadline")
  @JsonFormat(pattern = "dd/MM/yyyy")
  @Schema(example = "01/10/2022", implementation = String.class)
  private LocalDate deadline;

  @JsonProperty("completed_at")
  @JsonFormat(pattern = "dd/MM/yyyy")
  @Schema(example = "01/06/2021", implementation = String.class)
  private LocalDate completedAt;

  @JsonProperty("level")
  @ArraySchema(
      arraySchema = @Schema(description = "Poziomy", example = "[\"Junior\", \"Mid\"]", enumAsRef = true,
          implementation = String.class, allowableValues = {"Junior", "Mid", "Senior"}))
  private Set<String> level;

  @JsonProperty("location")
  @ArraySchema(arraySchema = @Schema(description = "Lokalizacje", example = "[\"Warszawa\", \"Kraków\"]",
      enumAsRef = true,
      implementation = City.class, allowableValues = {"Zdalnie",
      "Warszawa",
      "Kraków",
      "Wrocław",
      "Łódź",
      "Poznań",
      "Gdańsk",
      "Szczecin",
      "Bydgoszcz",
      "Lublin"}))
  private Set<String> location;

  @JsonProperty("skills")
  @ArraySchema(
      arraySchema = @Schema(description = "Umiejętności", example = "[\"Logo\", \"Identyfikacja wizualna\"]",
          enumAsRef = true, implementation = String.class, allowableValues = {"Logo",
          "Identyfikacja wizualna",
          "Wizytówka",
          "Strona internetowa",
          "Motyw WordPress",
          "Ikona lub przycisk",
          "Aplikacja mobilna",
          "Baner",
          "Broszura",
          "Plakat",
          "Infografika",
          "Okleina samochodowa",
          "Menu",
          "T-shirt",
          "Inne ubrania",
          "Akcesorium",
          "Kubek",
          "Naklejka, magnes lub przypinka",
          "Ilustracja lub grafika",
          "Okładka albumu",
          "Maskotka",
          "Tatuaż",
          "Model 3D",
          "Opakowanie",
          "Etykieta"}))
  private Set<String> skills;

  @JsonProperty("tags")
  @ArraySchema(
      arraySchema = @Schema(description = "Tagi", example = "[\"Bankowość\", \"Biznes\"]", enumAsRef = true,
          allowableValues = {"Agrokultura",
              "Architektura",
              "Bankowość",
              "Bezpieczeństwo",
              "Biznes",
              "Budownictwo",
              "Edukacja",
              "Fitness",
              "Florystyka",
              "Fotografia",
              "Gastronomia",
              "Gry",
              "IT",
              "Internet",
              "Kosmetyki i uroda",
              "Kosmos",
              "Meble",
              "Moda",
              "Motoryzacja",
              "Nieruchomości",
              "Nonprofit",
              "Ochrona zdrowia",
              "Ogród i krajobraz",
              "Opieka nad dziećmi",
              "Polityka",
              "Prawo",
              "Programowanie",
              "Przemysł",
              "Rachunkowość i finanse",
              "Rozrywka",
              "Sport",
              "Sprzedaż detaliczna",
              "Sprzątanie i konserwacja",
              "Ślub",
              "Środowisko",
              "Sztuka i design",
              "Technologia",
              "Zwierzęta"}))
  private Set<String> tags;

  @JsonProperty("languages")
  @ArraySchema(
      arraySchema = @Schema(description = "Języki", example = "[\"Polski\", \"Angileski\"]", enumAsRef = true,
          implementation = String.class, allowableValues = {"Polski",
          "Angielski",
          "Niemiecki",
          "Francuski",
          "Hiszpański",
          "Włoski",
          "Rosyjski",
          "Chiński"}))
  private Set<String> languages;

  @JsonProperty("rate")
  @Schema(description = "Stawka", example = "10000", implementation = Integer.class)
  private Integer rate;

  @JsonProperty("is_completed")
  @Schema(description = "Czy zlecenie zostało zakończone", example = "true", implementation = Boolean.class)
  private Boolean isCompleted;

  @JsonCreator
  public CommissionResponse(
      @NotNull
      Long id, String clientUsername, String contractorUsername, String title, String companyName,
      String description,
      LocalDateTime commissionedAt, LocalDate deadline, LocalDate completedAt, Set<String> level,
      Set<String> location, Set<String> skills, Set<String> tags, Set<String> languages, Integer rate,
      Boolean isCompleted) {
    this.id = id;
    this.clientUsername = clientUsername;
    this.contractorUsername = contractorUsername;
    this.title = title;
    this.companyName = companyName;
    this.description = description;
    this.commissionedAt = commissionedAt;
    this.deadline = deadline;
    this.completedAt = completedAt;
    this.level = level;
    this.location = location;
    this.skills = skills;
    this.tags = tags;
    this.languages = languages;
    this.rate = rate;
    this.isCompleted = isCompleted;
  }
}
