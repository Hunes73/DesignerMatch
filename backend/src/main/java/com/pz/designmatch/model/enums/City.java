package com.pz.designmatch.model.enums;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum City {

  @Schema(description = "Zdalnie", example = "Zdalnie")
  REMOTE("Zdalnie"),
  @Schema(description = "Warszawa", example = "Warszawa")
  WARSZAWA("Warszawa"),
  @Schema(description = "Kraków", example = "Kraków")
  KRAKOW("Kraków"),
  @Schema(description = "Wrocław", example = "Wrocław")
  WROCLAW("Wrocław"),
  @Schema(description = "Łódź", example = "Łódź")
  LODZ("Łódź"),
  @Schema(description = "Poznań", example = "Poznań")
  POZNAN("Poznań"),
  @Schema(description = "Gdańsk", example = "Gdańsk")
  GDANSK("Gdańsk"),
  @Schema(description = "Szczecin", example = "Szczecin")
  SZCZECIN("Szczecin"),
  @Schema(description = "Bydgoszcz", example = "Bydgoszcz")
  BYDGOSZCZ("Bydgoszcz"),
  @Schema(description = "Lublin", example = "Lublin")
  LUBLIN("Lublin");
  private final String displayName;

  City(String displayName) {
    this.displayName = displayName;
  }

  public static City fromDisplayName(String text) {
    for (City city : City.values()) {
      if (city.displayName.equalsIgnoreCase(text)) {
        return city;
      }
    }
    return null;
  }

  public static List<String> getAvailableCities() {
    return Stream.of(City.values()).map(City::getDisplayName).collect(Collectors.toList());
  }

  public String getDisplayName() {
    return displayName;
  }

  public String toString() {
    return this.displayName;
  }
}
