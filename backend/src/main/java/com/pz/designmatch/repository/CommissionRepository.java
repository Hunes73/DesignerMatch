package com.pz.designmatch.repository;

import com.pz.designmatch.model.Commission;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommissionRepository extends JpaRepository<Commission, Long> {

  @NotNull
  Optional<Commission> findById(
      @NotNull
      Long id);

  Page<Commission> findAll(
      @NotNull
      Specification<Commission> specification, Pageable pageable);


  @Query(
      value = "SELECT c.id, c.commissioned_at, c.completed_at, c.deadline, c.description, c.is_completed, c.rate, c.title, c.client_id, c.contractor_id  FROM commissions c JOIN users u ON c.client_id = u.id WHERE u.username = :username",
      nativeQuery = true)
  List<Commission> findAllByUserUsername(
      @Param("username")
      String username);
}
