package com.pz.designmatch.specification;

import com.pz.designmatch.model.Commission;
import com.pz.designmatch.model.enums.City;
import com.pz.designmatch.model.enums.Language;
import com.pz.designmatch.model.enums.Level;
import com.pz.designmatch.model.enums.Skill;
import com.pz.designmatch.model.enums.SkillsCategory;
import com.pz.designmatch.model.enums.Tag;
import jakarta.persistence.criteria.Join;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;

public class CommissionSpecification {

  public static Specification<Commission> hasLevel(List<Level> level) {
    return (root, query, builder) -> {
      Join<Commission, Level> join = root.join("level");
      return join.in(level);
    };
  }

  public static Specification<Commission> hasCategory(List<SkillsCategory> skillsCategory) {
    return (root, query, builder) -> {
      Join<Commission, SkillsCategory> join = root.join("category");
      return join.in(skillsCategory);
    };
  }

  public static Specification<Commission> hasCity(List<City> city) {
    return (root, query, builder) -> {
      Join<Commission, City> join = root.join("location");
      return join.in(city);
    };
  }

  public static Specification<Commission> hasLanguage(List<Language> languages) {
    return (root, query, builder) -> {
      Join<Commission, Language> join = root.join("languages");
      return join.in(languages);
    };
  }

  public static Specification<Commission> hasSkills(List<Skill> skill) {
    return (root, query, criteriaBuilder) -> {
      Join<Commission, Skill> join = root.join("skills");
      return join.in(skill);
    };
  }

  public static Specification<Commission> hasTag(List<Tag> tags) {
    return (root, query, builder) -> {
      Join<Commission, Tag> join = root.join("tags");
      return join.in(tags);
    };
  }
}
