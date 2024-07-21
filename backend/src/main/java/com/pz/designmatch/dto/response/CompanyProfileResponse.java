package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@SuppressWarnings({"unused", "SpellCheckingInspection"})
public class CompanyProfileResponse {

  @JsonProperty("id")
  @Schema(example = "1", description = "Identyfikator profilu firmy", implementation = Long.class)
  private Long id;

  @NotEmpty
  @JsonProperty("username")
  @Schema(example = "jkasinski1", description = "Nazwa użytkownika", implementation = String.class)
  private String username;

  @NotEmpty
  @JsonProperty("name")
  @Schema(example = "PZ", description = "Nazwa firmy", implementation = String.class)
  private String name;

  @JsonProperty("description")
  @Schema(example = "Firma zajmująca się tworzeniem stron internetowych", implementation = String.class)
  private String description;

  @JsonProperty("address")
  @Schema(example = "ul. Główna 1, 00-000 Warszawa", implementation = String.class)
  private String address;

  @NotEmpty
  @JsonProperty("nip")
  @Schema(example = "5247289916", description = "Numer NIP", implementation = String.class)
  private String nip;

  @NotEmpty
  @JsonProperty("regon")
  @Schema(example = "850704562", description = "Numer REGON", implementation = String.class)
  private String regon;

  @JsonProperty("krs")
  @Schema(example = "0000385161", description = "Numer KRS", implementation = String.class)
  private String krs;

  @JsonProperty("website")
  @Schema(example = "www.pz.com", description = "Strona internetowa", implementation = String.class)
  private String website;

  @JsonProperty("facebook")
  @Schema(example = "www.facebook.com/pz", description = "Profil na Facebooku", implementation = String.class)
  private String facebook;

  @JsonProperty("linkedin")
  @Schema(example = "www.linkedin.com/pz", description = "Profil na LinkedIn", implementation = String.class)
  private String linkedin;

  @JsonProperty("twitter")
  @Schema(example = "www.twitter.com/pz", description = "Profil na Twitterze", implementation = String.class)
  private String twitter;

  @JsonProperty("instagram")
  @Schema(example = "www.instagram.com/pz", description = "Profil na Instagramie",
      implementation = String.class)
  private String instagram;

  @JsonCreator
  public CompanyProfileResponse(
      @NotNull
      Long id, String username, String name, String description, String address, String nip, String regon,
      String krs, String website, String facebook, String linkedin, String twitter, String instagram) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.description = description;
    this.address = address;
    this.nip = nip;
    this.regon = regon;
    this.krs = krs;
    this.website = website;
    this.facebook = facebook;
    this.linkedin = linkedin;
    this.twitter = twitter;
    this.instagram = instagram;
  }
}
