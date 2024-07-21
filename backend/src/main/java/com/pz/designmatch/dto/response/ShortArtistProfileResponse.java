package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import java.util.Set;


public class ShortArtistProfileResponse {

  @JsonProperty("username")
  @NotEmpty
  @Schema(description = "Nazwa użytkownika", example = "jkasinski1", implementation = String.class,
      required = true)
  private final String username;

  @JsonProperty("firstname")
  @NotEmpty
  @Schema(description = "Imię", example = "Jakub", implementation = String.class, required = true)
  private final String firstname;

  @JsonProperty("lastname")
  @NotEmpty
  @Schema(description = "Nazwisko", implementation = String.class, required = true)
  private final String lastname;

  @JsonProperty("city")
  @Schema(description = "Lokalizacje", enumAsRef = true, implementation = String.class,
      allowableValues = {"Zdalnie",
          "Warszawa",
          "Kraków",
          "Wrocław",
          "Łódź",
          "Poznań",
          "Gdańsk",
          "Szczecin",
          "Bydgoszcz",
          "Lublin"})
  private final String city;

  @JsonProperty("level")
  @Schema(description = "Poziomy doświadczenia", example = "Mid", enumAsRef = true,
      implementation = String.class, allowableValues = {"Junior", "Mid", "Senior"})
  private final String level;

  @JsonProperty("skills")
  @ArraySchema(
      arraySchema = @Schema(description = "Umiejętności", example = "[\"Logo\",\"Identyfikacja wizualna\"]",
          implementation = String.class, enumAsRef = true,
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
              "Maskotka",
              "Tatuaż",
              "Model 3D",
              "Opakowanie",
              "Etykieta"}))
  private final Set<String> skills;

  public ShortArtistProfileResponse(String username, String firstname, String lastname, String level,
      String city, Set<String> skills) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.city = city;
    this.level = level;
    this.skills = skills;
  }
}