package com.pz.designmatch.model.enums;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum Language {

  POLISH("Polski"),
  ENGLISH("Angielski"),
  GERMAN("Niemiecki"),
  FRENCH("Francuski"),
  SPANISH("Hiszpański"),
  ITALIAN("Włoski"),
  RUSSIAN("Rosyjski"),
  CHINESE("Chiński");
  private final String displayName;

  Language(String displayName) {
    this.displayName = displayName;
  }

  public static Language fromDisplayName(String text) {
    for (Language language : Language.values()) {
      if (language.displayName.equalsIgnoreCase(text)) {
        return language;
      }
    }
    return null;
  }

  public static List<String> getAvailableLanguages() {
    return Stream.of(Language.values()).map(Language::getDisplayName).collect(Collectors.toList());
  }

  public String getDisplayName() {
    return displayName;
  }

  public String toString() {
    return this.displayName;
  }
}
