package com.pz.designmatch.model.user;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "users")
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(unique = true, nullable = false)
  private String username;

  @NotNull
  private String password;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
  private Set<Role> roles = new HashSet<>();

  @Column
  private Boolean enabled;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "artist_profile_id", referencedColumnName = "id")
  private ArtistProfile artistProfile;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "company_profile_id", referencedColumnName = "id")
  private CompanyProfile companyProfile;

  public UserEntity(String email, String username,
      @NotNull
      String password) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  public void addRole(Role role) {
    this.roles.add(role);
  }
}