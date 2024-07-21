package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pz.designmatch.dto.EducationDto;
import com.pz.designmatch.dto.ExperienceDto;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.Set;

@SuppressWarnings({"unused"})
public class ArtistProfileResponse {

  @JsonProperty("id")
  @Schema(description = "Identyfikator", example = "1", implementation = Long.class)
  private final Long id;

  @NotEmpty
  @JsonProperty("username")
  @Schema(description = "Nazwa użytkownika", example = "jkasinski1", implementation = String.class)
  private final String username;

  @NotEmpty
  @JsonProperty("firstname")
  @Schema(description = "Imię", example = "Jakub", implementation = String.class)
  private final String firstname;

  @NotEmpty
  @JsonProperty("lastname")
  @Schema(description = "Nazwisko", example = "Kasinski", implementation = String.class)
  private final String lastname;

  @JsonProperty("bio")
  @Schema(description = "Opis", example = "Jestem grafikiem z 5-letnim doświadczeniem.",
      implementation = String.class)
  private final String bio;

  @JsonProperty("level")
  @Schema(description = "Poziomy doświadczenia", example = "Mid", enumAsRef = true,
      implementation = String.class, allowableValues = {"Junior", "Mid", "Senior"})
  private final String level;

  @JsonProperty("location")
  @Schema(description = "Lokalizacje", example = "Warszawa", enumAsRef = true, allowableValues = {"Zdalnie",
      "Warszawa",
      "Kraków",
      "Wrocław",
      "Łódź",
      "Poznań",
      "Gdańsk",
      "Szczecin",
      "Bydgoszcz",
      "Lublin"})
  private final String location;

  @JsonProperty("skills")
  @ArraySchema(
      arraySchema = @Schema(description = "Umiejętności", example = "[\"Kubek\", \"Logo\"]", enumAsRef = true,
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
  private final Set<String> languages;

  @JsonProperty("education")
  @ArraySchema(arraySchema = @Schema(description = "Edukacja", implementation = EducationDto.class))
  private final Set<EducationDto> education;

  @JsonProperty("experience")
  @ArraySchema(arraySchema = @Schema(description = "Doświadczenie", implementation = ExperienceDto.class))
  private final Set<ExperienceDto> experience;

  @JsonProperty("website")
  @Schema(description = "Strona artysty", example = "https://www.jkasinski.com",
      implementation = String.class)
  private final String website;

  @JsonProperty("facebook")
  @Schema(description = "Facebook", example = "https://www.facebook.com/jkasinski",
      implementation = String.class)
  private final String facebook;

  @JsonProperty("linkedin")
  @Schema(description = "Linkedin", example = "https://www.linkedin.com/jkasinski",
      implementation = String.class)
  private final String linkedin;

  @JsonProperty("instagram")
  @Schema(description = "Instagram", example = "https://www.instagram.com/jkasinski",
      implementation = String.class)
  private final String instagram;

  @JsonProperty("dribble")
  @Schema(description = "Dribble", example = "https://www.dribble.com/jkasinski",
      implementation = String.class)
  private final String dribble;

  @JsonProperty("pinterest")
  @Schema(description = "Pinterest", example = "https://www.pinterest.com/jkasinski",
      implementation = String.class)
  private final String pinterest;

  @JsonProperty("twitter")
  @Schema(description = "Twitter", example = "https://www.twitter.com/jkasinski",
      implementation = String.class)
  private final String twitter;

  @JsonCreator
  public ArtistProfileResponse(
      @NotNull
      Long id, String username, String firstname, String lastname, String bio, String level,
      String location, Set<String> skills, Set<String> tags, Set<String> languages,
      Set<EducationDto> education, Set<ExperienceDto> experience, String website, String facebook,
      String linkedin, String instagram, String dribble, String pinterest, String twitter) {
    this.id = id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.bio = bio;
    this.level = level;
    this.location = location;
    this.skills = skills;
    this.tags = tags;
    this.languages = languages;
    this.education = education;
    this.experience = experience;
    this.website = website;
    this.facebook = facebook;
    this.linkedin = linkedin;
    this.instagram = instagram;
    this.dribble = dribble;
    this.pinterest = pinterest;
    this.twitter = twitter;
  }
}
