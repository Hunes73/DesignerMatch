package com.pz.designmatch.model.enums;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum Tag {
  AGRICULTURE("Agrokultura"),
  ARCHITECTURE("Architektura"),
  BANKING("Bankowość"),
  SECURITY("Bezpieczeństwo"),
  BUSINESS("Biznes"),
  CONSTRUCTION("Budownictwo"),
  EDUCATION("Edukacja"),
  FITNESS("Fitness"),
  FLORISTRY("Florystyka"),
  PHOTOGRAPHY("Fotografia"),
  GASTRONOMY("Gastronomia"),
  GAMES("Gry"),
  IT("IT"),
  INTERNET("Internet"),
  COSMETICS_AND_BEAUTY("Kosmetyki i uroda"),
  SPACE("Kosmos"),
  FURNITURE("Meble"),
  FASHION("Moda"),
  AUTOMOTIVE("Motoryzacja"),
  REAL_ESTATE("Nieruchomości"),
  NONPROFIT("Nonprofit"),
  MEDICAL("Ochrona zdrowia"),
  LANDSCAPING("Ogród i krajobraz"),
  CHILDCARE("Opieka nad dziećmi"),
  POLITICS("Polityka"),
  LAW("Prawo"),
  PROGRAMMING("Programowanie"),
  INDUSTRIAL("Przemysł"),
  ACCOUNTING_AND_FINANCE("Rachunkowość i finanse"),
  ENTERTAINMENT("Rozrywka"),
  SPORTS("Sport"),
  RETAIL("Sprzedaż detaliczna"),
  CLEANING_AND_MAINTENANCE("Sprzątanie i konserwacja"),
  WEEDING("Ślub"),
  ENVIRONMENT("Środowisko"),
  ART_AND_DESIGN("Sztuka i design"),
  TECHNOLOGY("Technologia"),
  ANIMALS("Zwierzęta");
  private final String displayName;

  Tag(String displayName) {
    this.displayName = displayName;
  }

  public static Tag fromDisplayName(String displayName) {
    for (Tag tag : Tag.values()) {
      if (tag.displayName.equalsIgnoreCase(displayName)) {
        return tag;
      }
    }
    return null;
  }

  public static List<String> getAvailableTags() {
    return Stream.of(values()).map(Tag::getDisplayName).collect(Collectors.toList());

  }

  public String getDisplayName() {
    return displayName;
  }

  @Override
  public String toString() {
    return this.displayName;
  }
}
