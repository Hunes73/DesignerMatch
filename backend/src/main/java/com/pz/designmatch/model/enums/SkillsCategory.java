package com.pz.designmatch.model.enums;

import java.util.Collection;
import lombok.Getter;

@Getter
public enum SkillsCategory {
  LOGO_AND_IDENTITY("Logo i identyfikacja wizualna"),
  WEB_AND_MOBILE("Strony internetowe i aplikacje mobilne"),
  MARKETING_AND_ADVERTISEMENT("Marketing i reklama"),
  CLOTHING_AND_MERCHANDISE("Odzież i merchandising"),
  ART_AND_ILLUSTRATION("Sztuka i ilustracje"),
  PACKAGING_AND_LABELS("Opakowania i etykiety");
  private final String displayName;

  SkillsCategory(String displayName) {
    this.displayName = displayName;
  }

  public static SkillsCategory fromDisplayName(String displayName) {
    for (SkillsCategory skillsCategory : SkillsCategory.values()) {
      if (skillsCategory.displayName.equalsIgnoreCase(displayName)) {
        return skillsCategory;
      }
    }
    return null;
  }

  public String getDisplayName() {
    return displayName;
  }

  public Collection<Skill> getSkills() {
    return Skill.getSkillsByCategory(this);
  }

  @Override
  public String toString() {
    return this.displayName;
  }
}
