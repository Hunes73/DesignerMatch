package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public final class SkillsCategoryResponse {

  @JsonProperty("name")
  @Schema(description = "Nazwa kategorii", example = "Logo i identyfikacja wizualna",
      implementation = String.class)
  private final String name;

  @JsonProperty("skills")
  @ArraySchema(arraySchema = @Schema(description = "Umiejętności", example = "[\"Logo\", \"Wizytówka\"]"))
  private final List<String> skills;

  public SkillsCategoryResponse(String name, List<String> skills) {
    this.name = name;
    this.skills = skills;
  }
}
