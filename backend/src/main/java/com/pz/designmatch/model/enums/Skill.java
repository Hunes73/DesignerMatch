package com.pz.designmatch.model.enums;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.Getter;

@Getter
public enum Skill {

  LOGO(SkillsCategory.LOGO_AND_IDENTITY, "Logo"),
  IDENTITY(SkillsCategory.LOGO_AND_IDENTITY, "Identyfikacja wizualna"),
  BUSINESS_CARD(SkillsCategory.LOGO_AND_IDENTITY, "Wizytówka"),
  WEBPAGE(SkillsCategory.WEB_AND_MOBILE, "Strona internetowa"),
  WORDPRESS_THEME(SkillsCategory.WEB_AND_MOBILE, "Motyw WordPress"),
  ICON_OR_BUTTON(SkillsCategory.WEB_AND_MOBILE, "Ikona lub przycisk"),
  MOBILE_APP(SkillsCategory.WEB_AND_MOBILE, "Aplikacja mobilna"),
  BANNER(SkillsCategory.MARKETING_AND_ADVERTISEMENT, "Baner"),
  FLYER(SkillsCategory.MARKETING_AND_ADVERTISEMENT, "Broszura"),
  POSTER(SkillsCategory.MARKETING_AND_ADVERTISEMENT, "Plakat"),
  INFOGRAPHIC(SkillsCategory.MARKETING_AND_ADVERTISEMENT, "Infografika"),
  CARWRAP(SkillsCategory.MARKETING_AND_ADVERTISEMENT, "Okleina samochodowa"),
  MENU(SkillsCategory.MARKETING_AND_ADVERTISEMENT, "Menu"),
  T_SHIRT(SkillsCategory.CLOTHING_AND_MERCHANDISE, "T-shirt"),
  CLOTHING(SkillsCategory.CLOTHING_AND_MERCHANDISE, "Inne ubrania"),
  ACCESSORY(SkillsCategory.CLOTHING_AND_MERCHANDISE, "Akcesorium"),
  CUP(SkillsCategory.CLOTHING_AND_MERCHANDISE, "Kubek"),
  STICKER(SkillsCategory.CLOTHING_AND_MERCHANDISE, "Naklejka, magnes lub przypinka"),
  ILLUSTRATION(SkillsCategory.ART_AND_ILLUSTRATION, "Ilustracja lub grafika"),
  ALBUM_COVER(SkillsCategory.ART_AND_ILLUSTRATION, "Okładka albumu"),
  MASCOT(SkillsCategory.ART_AND_ILLUSTRATION, "Maskotka"),
  TATTOO(SkillsCategory.ART_AND_ILLUSTRATION, "Tatuaż"),
  MODEL_3D(SkillsCategory.ART_AND_ILLUSTRATION, "Model 3D"),
  PACKAGING(SkillsCategory.PACKAGING_AND_LABELS, "Opakowanie"),
  LABEL(SkillsCategory.PACKAGING_AND_LABELS, "Etykieta");
  private final SkillsCategory skillsCategory;
  private final String displayName;

  Skill(SkillsCategory skillsCategory, String displayName) {
    this.skillsCategory = skillsCategory;
    this.displayName = displayName;
  }

  public static List<Skill> getSkillsByCategory(SkillsCategory skillsCategory) {
    return Stream.of(Skill.values()).filter(skill -> skill.getSkillsCategory().equals(skillsCategory))
        .collect(Collectors.toList());
  }

  public static Skill fromDisplayName(String text) {
    for (Skill skill : Skill.values()) {
      if (skill.displayName.equalsIgnoreCase(text)) {
        return skill;
      }
    }
    return null;
  }

  public String toString() {
    return this.displayName;
  }
}
