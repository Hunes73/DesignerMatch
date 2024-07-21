package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Set;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommissionFilterRequest {

  @JsonProperty("levels")
  @ArraySchema(arraySchema = @Schema(description = "Poziomy doświadczenia", example = "[\"Junior\", \"Mid\"]",
      enumAsRef = true,
      allowableValues = {"Junior", "Mid", "Senior"}))
  private Set<String> levels;

  @JsonProperty("locations")
  @ArraySchema(arraySchema = @Schema(description = "Lokalizacje", example = "[\"Warszawa\", \"Kraków\"]",
      enumAsRef = true,
      allowableValues = {"Zdalnie",
          "Warszawa",
          "Kraków",
          "Wrocław",
          "Łódż",
          "Poznań",
          "Gdańsk",
          "Szczecin",
          "Bydgoszcz",
          "Lublin"}))
  private Set<String> locations;

  @JsonProperty("skills")
  @ArraySchema(
      arraySchema = @Schema(description = "Umiejętności", example = "[\"Logo\", \"Identyfikacja wizualna\"]",
          enumAsRef = true,
          allowableValues = {"Logo",
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
              "Maskotka"}))
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
  @ArraySchema(arraySchema = @Schema(description = "Języki", example = "[\"Polski\", \"Angielski\"]",
      allowableValues = {"Polski",
          "Angielski",
          "Niemiecki",
          "Francuski",
          "Hiszpański",
          "Włoski",
          "Rosyjski",
          "Chiński"}))
  private Set<String> languages;
}
