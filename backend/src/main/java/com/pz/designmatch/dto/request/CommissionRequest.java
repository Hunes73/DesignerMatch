package com.pz.designmatch.dto.request;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pz.designmatch.model.enums.City;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.Set;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommissionRequest {

  @NotEmpty
  @JsonProperty("client_username")
  @Schema(description = "Nazwa użytkownika klienta", example = "jkasinski1", implementation = String.class)
  private String clientUsername;

  @JsonProperty("contractor_username")
  @Schema(description = "Nazwa użytkownika wykonawcy", example = "jkasinski2", implementation = String.class)
  private String contractorUsername;

  @NotEmpty
  @JsonProperty("title")
  @Schema(description = "Tytuł", example = "Wykonanie strony internetowej", implementation = String.class)
  private String title;

  @NotEmpty
  @JsonProperty("description")
  @Schema(description = "Opis", example = "Wykonanie strony internetowej dla firmy PZ",
      implementation = String.class)
  private String description;

  @JsonProperty("deadline")
  @JsonFormat(pattern = "dd/MM/yyyy")
  @Schema(description = "Data zakończenia", example = "01/10/2022", implementation = String.class)
  private LocalDate deadline;

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
      arraySchema = @Schema(description = "Języki", example = "[\"Polski\", \"Angielski\"]", enumAsRef = true,
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
}


