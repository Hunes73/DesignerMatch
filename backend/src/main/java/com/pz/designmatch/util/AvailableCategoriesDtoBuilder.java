package com.pz.designmatch.util;

import com.pz.designmatch.dto.response.AvailableSkillsCategoriesResponse;
import com.pz.designmatch.dto.response.SkillsCategoryResponse;
import com.pz.designmatch.model.enums.Skill;
import com.pz.designmatch.model.enums.SkillsCategory;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AvailableCategoriesDtoBuilder {

  public static AvailableSkillsCategoriesResponse getAvailableCategoriesDto() {
    List<SkillsCategoryResponse> skillsCategoryResponseList = new ArrayList<>();
    List<SkillsCategory> categories = List.of(SkillsCategory.values());
    List<Skill> skills = List.of(Skill.values());

    for (SkillsCategory skillsCategory : categories) {
      List<String> skillsNames = skills.stream()
          .filter(skill -> skill.getSkillsCategory().equals(skillsCategory))
          .map(Skill::getDisplayName)
          .collect(Collectors.toList());

      skillsCategoryResponseList.add(
          new SkillsCategoryResponse(skillsCategory.getDisplayName(), skillsNames));
    }

    return new AvailableSkillsCategoriesResponse(skillsCategoryResponseList);
  }
}