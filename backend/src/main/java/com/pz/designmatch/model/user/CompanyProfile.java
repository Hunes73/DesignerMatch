package com.pz.designmatch.model.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "company_profiles")
public class CompanyProfile {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(mappedBy = "companyProfile")
  private UserEntity user;

  @Column(unique = true)
  private String name;

  private String description;

  @Column(name = "profile_image_url")
  private String profileImageUrl;

  private String address;

  @Column(unique = true)
  private String NIP;

  @Column(unique = true)
  private String REGON;

  @Column(unique = true)
  private String KRS;

  private String website;

  private String facebook;

  private String linkedin;

  private String twitter;

  private String instagram;

  public CompanyProfile(String name, String description, String address, String NIP, String REGON, String KRS,
      String website,
      String facebook, String linkedin, String twitter, String instagram) {
    this.name = name;
    this.description = description;
    this.address = address;
    this.NIP = NIP;
    this.REGON = REGON;
    this.KRS = KRS;
    this.website = website;
    this.facebook = facebook;
    this.linkedin = linkedin;
    this.twitter = twitter;
    this.instagram = instagram;
  }
}
