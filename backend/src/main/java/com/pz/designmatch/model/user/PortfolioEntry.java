package com.pz.designmatch.model.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "portfolio_entries")
public class PortfolioEntry {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "artist_profile")
  private ArtistProfile artistProfile;

  private String imageUrl;

  private String name;

  private String description;

  public PortfolioEntry(ArtistProfile artistProfile, String imageUrl,
      String name, String description) {
    this.artistProfile = artistProfile;
    this.imageUrl = imageUrl;
    this.name = name;
    this.description = description;
  }
}
