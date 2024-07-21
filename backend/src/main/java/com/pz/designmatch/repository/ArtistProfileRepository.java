package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.ArtistProfile;
import jakarta.validation.constraints.NotNull;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistProfileRepository extends JpaRepository<ArtistProfile, Long> {

  Optional<ArtistProfile> findByUser_Username(String username);

  Optional<ArtistProfile> findByUser_Id(Long id);

  Page<ArtistProfile> findAll(
      @NotNull
      Specification<ArtistProfile> specification, Pageable pageable);
}