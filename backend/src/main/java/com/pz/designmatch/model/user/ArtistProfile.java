package com.pz.designmatch.model.user;

import com.pz.designmatch.model.enums.City;
import com.pz.designmatch.model.enums.Language;
import com.pz.designmatch.model.enums.Level;
import com.pz.designmatch.model.enums.Skill;
import com.pz.designmatch.model.enums.Tag;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "artist_profiles")
public class ArtistProfile {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(mappedBy = "artistProfile")
  private UserEntity user;

  private String firstname;

  private String lastname;

  private String bio;

  @Column(name = "profile_image_url")
  private String profileImageUrl;


  @Enumerated(EnumType.STRING)
  private Level level;

  @Enumerated(EnumType.STRING)
  private City city;

  @ElementCollection(targetClass = Skill.class)
  @Enumerated(EnumType.STRING)
  private Set<Skill> skills;

  @ElementCollection(targetClass = Tag.class)
  @Enumerated(EnumType.STRING)
  private Set<Tag> tags;

  @ElementCollection(targetClass = Language.class)
  @Enumerated(EnumType.STRING)
  private Set<Language> languages;

  private String website;

  private String facebook;

  private String linkedin;

  private String instagram;

  private String dribble;

  private String pinterest;

  private String twitter;

  public ArtistProfile(String firstname, String lastname, String bio, Level level, City city,
      Set<Skill> skills, Set<Tag> tags, Set<Language> languages,
      String website, String facebook, String linkedin, String instagram, String dribble, String pinterest,
      String twitter) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.bio = bio;
    this.level = level;
    this.city = city;
    this.skills = skills;
    this.tags = tags;
    this.languages = languages;
    this.website = website;
    this.facebook = facebook;
    this.linkedin = linkedin;
    this.instagram = instagram;
    this.dribble = dribble;
    this.pinterest = pinterest;
    this.twitter = twitter;
  }
}
