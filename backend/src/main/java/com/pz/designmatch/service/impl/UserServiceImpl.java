package com.pz.designmatch.service.impl;

import static com.pz.designmatch.model.user.Role.ROLE_ARTIST;
import static com.pz.designmatch.model.user.Role.ROLE_COMPANY;

import com.pz.designmatch.dto.request.ArtistRegisterRequest;
import com.pz.designmatch.dto.request.CompanyRegisterRequest;
import com.pz.designmatch.dto.request.RegisterRequest;
import com.pz.designmatch.exception.UserAlreadyExistAuthenticationException;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.model.user.CompanyProfile;
import com.pz.designmatch.model.user.Role;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.ArtistProfileRepository;
import com.pz.designmatch.repository.CompanyProfileRepository;
import com.pz.designmatch.repository.RoleRepository;
import com.pz.designmatch.repository.UserRepository;
import com.pz.designmatch.service.ConfirmationTokenService;
import com.pz.designmatch.service.EmailService;
import com.pz.designmatch.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ValidationException;
import java.util.List;
import java.util.stream.Collectors;
import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final ArtistProfileRepository artistProfileRepository;
  private final CompanyProfileRepository companyProfileRepository;
  private final PasswordEncoder passwordEncoder;
  private final ConfirmationTokenService confirmationTokenService;
  private final EmailService emailService;

  @Autowired
  public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
      ArtistProfileRepository artistProfileRepository,
      CompanyProfileRepository companyProfileRepository, PasswordEncoder passwordEncoder,
      ConfirmationTokenServiceImpl confirmationTokenService, EmailService emailService) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.artistProfileRepository = artistProfileRepository;
    this.companyProfileRepository = companyProfileRepository;
    this.passwordEncoder = passwordEncoder;
    this.confirmationTokenService = confirmationTokenService;
    this.emailService = emailService;
  }

  @Override
  public UserEntity findUserByEmail(final String email) {
    return userRepository.findByEmailIgnoreCase(email)
        .orElseThrow(() -> new RuntimeException("Ten email jest już zajęty"));
  }

  @Override
  public List<String> getAllUsernames() {
    return artistProfileRepository.findAll().stream()
        .map(artistProfile -> artistProfile.getUser().getUsername())
        .collect(Collectors.toList());
  }

  @Transactional
  @Override
  public void registerNewUser(RegisterRequest registerRequest, String roleName)
      throws UserAlreadyExistAuthenticationException {
    Role role = roleRepository.findByName(roleName)
        .orElseThrow(() -> new EntityNotFoundException("Taka rola nie istnieje!"));

    if (userRepository.existsByEmailIgnoreCase(registerRequest.getEmail())) {
      throw new UserAlreadyExistAuthenticationException("Ten email jest już zajęty");
    }

    if (userRepository.existsByUsername(registerRequest.getUsername())) {
      throw new UserAlreadyExistAuthenticationException("Ta nazwa użytkownika jest już zajęta");
    }

    EmailValidator emailValidator = new EmailValidator();
    if (!emailValidator.isValid(registerRequest.getEmail(), null)) {
      throw new ValidationException("Niepoprawny email");
    }

    UserEntity user = buildUser(registerRequest, role);

    switch (role.getName()) {
      case ROLE_ARTIST -> {
        if (registerRequest instanceof ArtistRegisterRequest) {
          ArtistProfile artistProfile = buildArtistProfile((ArtistRegisterRequest) registerRequest);
          artistProfile.setUser(user);
          user.setArtistProfile(artistProfile);
          artistProfileRepository.save(artistProfile);
        } else {
          throw new ValidationException("Niepoprawne dane");
        }
      }
      case ROLE_COMPANY -> {
        if (registerRequest instanceof CompanyRegisterRequest) {
          CompanyProfile companyProfile = buildCompanyProfile((CompanyRegisterRequest) registerRequest);
          companyProfile.setUser(user);
          user.setCompanyProfile(companyProfile);
          companyProfileRepository.save(companyProfile);
        } else {
          throw new ValidationException("Niepoprawne dane");
        }
      }
      default -> throw new ValidationException("Niepoprawna rola");
    }

    userRepository.save(user);

    String token = confirmationTokenService.saveConfirmationToken(user);
    sendConfirmationEmail(registerRequest.getEmail(), registerRequest.getUsername(), token);
  }

  private UserEntity buildUser(final RegisterRequest signUpRequest, final Role role) {
    UserEntity user = new UserEntity();
    user.setUsername(signUpRequest.getUsername());
    user.setEmail(signUpRequest.getEmail());
    user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
    user.addRole(role);
    user.setEnabled(true);
    return user;
  }

  private ArtistProfile buildArtistProfile(final ArtistRegisterRequest signUpRequest) {
    ArtistProfile artistProfile = new ArtistProfile();
    artistProfile.setFirstname(signUpRequest.getFirstname());
    artistProfile.setLastname(signUpRequest.getLastname());
    return artistProfile;
  }

  private CompanyProfile buildCompanyProfile(final CompanyRegisterRequest signUpRequest) {
    CompanyProfile companyProfile = new CompanyProfile();
    companyProfile.setName(signUpRequest.getName());
    companyProfile.setNIP(signUpRequest.getNip());
    companyProfile.setREGON(signUpRequest.getRegon());
    companyProfile.setKRS(signUpRequest.getKrs());
    return companyProfile;
  }

  private void sendConfirmationEmail(String email, String username, String token) {
    String link = "http://localhost:8080/auth/confirmEmail?token=" + token;
    String body = emailService.buildConfirmationEmail(username, link);
    emailService.send(email, body, "Email confirmation");
  }
}
