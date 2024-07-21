package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pz.designmatch.model.enums.City;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Set;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArtistFilterRequest {

  @JsonProperty("levels")
  @ArraySchema(
      arraySchema = @Schema(description = "Poziomy", example = "[\"Junior\", \"Mid\"]", enumAsRef = true,
          implementation = String.class, allowableValues = {"Junior",
          "Mid",
          "Senior"}))
  private final Set<String> levels;

  @JsonProperty("locations")
  @ArraySchema(arraySchema = @Schema(description = "Lokalizacje", example = "[\"Warszawa\", \"Kraków\"]",
      enumAsRef = true, implementation = City.class, allowableValues = {"Zdalnie",
      "Warszawa",
      "Kraków",
      "Wrocław",
      "Łódź",
      "Poznań",
      "Gdańsk",
      "Szczecin",
      "Bydgoszcz",
      "Lublin"}))
  private final Set<String> locations;

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
  private final Set<String> skills;

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
  private final Set<String> languages;

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
  private final Set<String> tags;

  @JsonCreator
  public ArtistFilterRequest(Set<String> levels, Set<String> locations, Set<String> skills,
      Set<String> languages, Set<String> tags) {
    this.levels = levels;
    this.locations = locations;
    this.skills = skills;
    this.languages = languages;
    this.tags = tags;
  }
}
