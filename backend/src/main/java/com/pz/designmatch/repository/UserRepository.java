package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.UserEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

  Optional<UserEntity> findByEmailIgnoreCase(String email);

  Boolean existsByEmailIgnoreCase(String email);

  Boolean existsByUsername(String username);

  Optional<UserEntity> findByUsername(String username);
}
