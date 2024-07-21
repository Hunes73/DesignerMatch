package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public final class AvailableSkillsCategoriesResponse {

  @JsonProperty("categories")
  @Schema(description = "Kategorie umiejętności", implementation = SkillsCategoryResponse.class)
  private final List<SkillsCategoryResponse> skillsCategoryResponseList;


  public AvailableSkillsCategoriesResponse(List<SkillsCategoryResponse> skillsCategoryResponseList) {
    this.skillsCategoryResponseList = skillsCategoryResponseList;
  }
}
