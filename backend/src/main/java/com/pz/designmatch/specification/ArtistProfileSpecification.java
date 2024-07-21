package com.pz.designmatch.specification;

import com.pz.designmatch.model.enums.City;
import com.pz.designmatch.model.enums.Language;
import com.pz.designmatch.model.enums.Level;
import com.pz.designmatch.model.enums.Skill;
import com.pz.designmatch.model.enums.SkillsCategory;
import com.pz.designmatch.model.enums.Tag;
import com.pz.designmatch.model.user.ArtistProfile;
import jakarta.persistence.criteria.Join;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;

public class ArtistProfileSpecification {

  public static Specification<ArtistProfile> hasLevel(List<Level> level) {
    return (root, query, builder) -> root.get("level").in(level);
  }

  public static Specification<ArtistProfile> hasCategory(List<SkillsCategory> skillsCategory) {
    return (root, query, builder) -> root.get("category").in(skillsCategory);
  }

  public static Specification<ArtistProfile> hasCity(List<City> city) {
    return (root, query, builder) -> root.get("city").in(city);
  }

  public static Specification<ArtistProfile> hasLanguage(List<Language> languages) {
    return (root, query, builder) -> {
      Join<ArtistProfile, Language> join = root.join("languages");
      return join.in(languages);
    };
  }

  public static Specification<ArtistProfile> hasSkills(List<Skill> skill) {
    return (root, query, criteriaBuilder) -> {
      Join<ArtistProfile, Skill> join = root.join("skills");
      return join.in(skill);
    };
  }

  public static Specification<ArtistProfile> hasTag(List<Tag> tags) {
    return (root, query, builder) -> {
      Join<ArtistProfile, Tag> join = root.join("tags");
      return join.in(tags);
    };
  }
}
