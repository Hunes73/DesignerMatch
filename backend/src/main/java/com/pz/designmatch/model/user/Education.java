package com.pz.designmatch.model.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Education {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "artist_profile_id")
  private ArtistProfile artistProfile;

  private String schoolName;

  private String faculty;

  private String fieldOfStudy;

  private String degree;

  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private LocalDate startDate;

  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private LocalDate endDate;

  private String description;

  public Education(ArtistProfile artistProfile, String schoolName, String faculty, String fieldOfStudy,
      String degree,
      LocalDate startDate, LocalDate endDate, String description) {
    this.artistProfile = artistProfile;
    this.schoolName = schoolName;
    this.faculty = faculty;
    this.fieldOfStudy = fieldOfStudy;
    this.degree = degree;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }
}
