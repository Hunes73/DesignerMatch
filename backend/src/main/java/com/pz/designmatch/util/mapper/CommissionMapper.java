package com.pz.designmatch.util.mapper;

import com.pz.designmatch.dto.request.CommissionRequest;
import com.pz.designmatch.dto.response.CommissionResponse;
import com.pz.designmatch.model.Commission;
import com.pz.designmatch.model.enums.City;
import com.pz.designmatch.model.enums.Language;
import com.pz.designmatch.model.enums.Level;
import com.pz.designmatch.model.enums.Skill;
import com.pz.designmatch.model.enums.Tag;
import com.pz.designmatch.model.user.CompanyProfile;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.CompanyProfileRepository;
import com.pz.designmatch.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class CommissionMapper {

  private final UserRepository userRepository;
  private final CompanyProfileRepository companyProfileRepository;

  @Autowired
  public CommissionMapper(UserRepository userRepository, CompanyProfileRepository companyProfileRepository) {
    this.userRepository = userRepository;
    this.companyProfileRepository = companyProfileRepository;
  }

  public Commission mapToEntity(CommissionRequest commissionRequest) throws UsernameNotFoundException {
    UserEntity client = userRepository.findByUsername(commissionRequest.getClientUsername())
        .orElseThrow(() -> new EntityNotFoundException("Klient nie istnieje"));
    Optional<UserEntity> contractor =
        commissionRequest.getContractorUsername() != null ? userRepository.findByUsername(
            commissionRequest.getContractorUsername()) : Optional.empty();

    return new Commission(
        client,
        contractor.orElse(null),
        commissionRequest.getTitle(),
        commissionRequest.getDescription(),
        LocalDateTime.now(),
        commissionRequest.getDeadline(),
        commissionRequest.getLevel().stream().map(Level::fromDisplayName).collect(Collectors.toSet()),
        commissionRequest.getLocation().stream().map(City::fromDisplayName).collect(Collectors.toSet()),
        commissionRequest.getSkills().stream().map(Skill::fromDisplayName).collect(Collectors.toSet()),
        commissionRequest.getTags().stream().map(Tag::fromDisplayName).collect(Collectors.toSet()),
        commissionRequest.getLanguages().stream().map(Language::fromDisplayName).collect(Collectors.toSet()),
        commissionRequest.getRate());
  }

  public CommissionResponse mapToResponse(Commission commission) {
    CompanyProfile companyProfile = companyProfileRepository.findByUser_Username(
            commission.getClient().getUsername())
        .orElseThrow(() -> new EntityNotFoundException(
            "Nie znaleziono profilu firmy dla nazwy użytkownika: " + commission.getClient().getUsername()));
    return new CommissionResponse(
        commission.getId(),
        commission.getClient().getUsername(),
        commission.getContractor() != null ? commission.getContractor().getUsername() : null,
        commission.getTitle(),
        companyProfile.getName(),
        commission.getDescription(),
        commission.getCommissionedAt(),
        commission.getDeadline(),
        commission.getCompletedAt(),
        commission.getLevel().stream().map(Level::getDisplayName).collect(Collectors.toSet()),
        commission.getLocation().stream().map(City::getDisplayName).collect(Collectors.toSet()),
        commission.getSkills().stream().map(Skill::getDisplayName).collect(Collectors.toSet()),
        commission.getTags().stream().map(Tag::getDisplayName).collect(Collectors.toSet()),
        commission.getLanguages().stream().map(Language::getDisplayName).collect(Collectors.toSet()),
        commission.getRate(),
        commission.isCompleted()
    );
  }
}
