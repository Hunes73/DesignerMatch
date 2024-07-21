package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.model.user.PortfolioEntry;
import jakarta.validation.constraints.NotNull;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PortfolioImagesRepository extends JpaRepository<PortfolioEntry, Long> {


  @Modifying
  @Query(
      value = "DELETE FROM portfolio_entries WHERE id = :imageId AND artist_profile = (SELECT id FROM artist_profiles WHERE id = (SELECT artist_profile_id FROM users WHERE username = :username))",
      nativeQuery = true)
  void deleteByArtistProfile_User_UsernameAndId(String username, Long imageId);

  @NotNull
  Optional<PortfolioEntry> findById(
      @NotNull
      Long id);

  Page<PortfolioEntry> findAllByArtistProfile(ArtistProfile artistProfile, Pageable pageable);
}
