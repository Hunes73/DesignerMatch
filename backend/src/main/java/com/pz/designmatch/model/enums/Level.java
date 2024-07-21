package com.pz.designmatch.model.enums;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum Level {

  JUNIOR("Junior"),
  MID("Mid"),
  SENIOR("Senior");
  private final String displayName;

  Level(String displayName) {
    this.displayName = displayName;
  }

  public static Level fromDisplayName(String text) {
    for (Level level : Level.values()) {
      if (level.displayName.equalsIgnoreCase(text)) {
        return level;
      }
    }
    return null;
  }

  public static List<String> getAvailableLevels() {
    return Stream.of(Level.values()).map(Level::getDisplayName).collect(Collectors.toList());
  }

  public String getDisplayName() {
    return displayName;
  }

  public String toString() {
    return this.displayName;
  }
}
