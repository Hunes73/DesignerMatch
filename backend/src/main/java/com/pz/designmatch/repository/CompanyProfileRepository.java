package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.CompanyProfile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyProfileRepository extends JpaRepository<CompanyProfile, Long> {

  Optional<CompanyProfile> findByUser_Username(String username);
}
