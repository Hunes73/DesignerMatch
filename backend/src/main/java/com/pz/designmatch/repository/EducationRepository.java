package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.Education;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {

  Set<Education> findAllByArtistProfile_User_Username(String username);

  Set<Education> findAllByArtistProfile_Id(Long id);

  void deleteAllByArtistProfile_Id(Long artistProfileId);
}
