package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.Experience;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {

  Set<Experience> findAllByArtistProfile_User_Username(String username);

  Set<Experience> findAllByArtistProfile_Id(Long id);

  void deleteAllByArtistProfile_Id(Long artistProfileId);
}
