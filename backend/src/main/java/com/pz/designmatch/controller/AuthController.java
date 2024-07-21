package com.pz.designmatch.controller;

import static com.pz.designmatch.model.user.Role.ROLE_ARTIST;
import static com.pz.designmatch.model.user.Role.ROLE_COMPANY;

import com.pz.designmatch.dto.LocalUserDto;
import com.pz.designmatch.dto.request.ArtistRegisterRequest;
import com.pz.designmatch.dto.request.CompanyRegisterRequest;
import com.pz.designmatch.dto.request.LoginRequest;
import com.pz.designmatch.dto.request.RegisterRequest;
import com.pz.designmatch.dto.response.JwtAuthenticationResponse;
import com.pz.designmatch.dto.response.MyApiResponse;
import com.pz.designmatch.exception.UserAlreadyExistAuthenticationException;
import com.pz.designmatch.service.ConfirmationTokenService;
import com.pz.designmatch.service.UserService;
import com.pz.designmatch.service.impl.ConfirmationTokenServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.ValidationException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {

  private final JwtEncoder encoder;
  private final UserService userService;
  private final AuthenticationManager authenticationManager;
  private final ConfirmationTokenService confirmationTokenService;
  private final JwtDecoder jwtDecoder;
  private final JdbcTemplate jdbcTemplate;

  public AuthController(JwtEncoder encoder, UserService userService,
      AuthenticationManager authenticationManager,
      ConfirmationTokenServiceImpl confirmationTokenService, JwtDecoder jwtDecoder,
      JdbcTemplate jdbcTemplate) {
    this.encoder = encoder;
    this.userService = userService;
    this.authenticationManager = authenticationManager;
    this.confirmationTokenService = confirmationTokenService;
    this.jwtDecoder = jwtDecoder;
    this.jdbcTemplate = jdbcTemplate;
  }

  @Operation(summary = "Logowanie użytkownika",
      responses = {
          @ApiResponse(responseCode = "200", description = "Zalogowano pomyślnie",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = JwtAuthenticationResponse.class))),
          @ApiResponse(responseCode = "401", description = "Niepoprawne dane logowania",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = MyApiResponse.class)))},
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = LoginRequest.class))),
      tags = {"Autoryzacja"})

  @PostMapping("/login")
  public ResponseEntity<?> login(
      @RequestBody
      LoginRequest loginRequest) {
    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
        (loginRequest.getEmail(), loginRequest.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    LocalUserDto localUser = (LocalUserDto) authentication.getPrincipal();
    String jwt = getToken(localUser);
    return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
  }


  @Operation(summary = "Zwraca nowy token JWT dla użytkownika",
      responses = {
          @ApiResponse(responseCode = "200", description = "Pomyślnie wygenerowano nowy token JWT",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = MyApiResponse.class))),
          @ApiResponse(responseCode = "401", description = "Autoryzacja nie powiodła się",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = MyApiResponse.class)))},
      security = @SecurityRequirement(name = "bearerToken"),
      tags = {"Autoryzacja"})
  @PostMapping("/token")
  public ResponseEntity<?> getToken(Authentication authentication) {
    LocalUserDto localUser = (LocalUserDto) authentication.getPrincipal();
    String jwt = getToken(localUser);
    return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
  }


  @Operation(summary = "Rejestracja artysty",
      responses = {
          @ApiResponse(responseCode = "200", description = "Pomyślnie zarejestrowano artystę",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = MyApiResponse.class))),
          @ApiResponse(responseCode = "400",
              description = "Niepoprawne dane rejestracji, być może są już zajęte",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = MyApiResponse.class)))},
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ArtistRegisterRequest.class))),
      tags = {"Autoryzacja"})
  @PostMapping("/registerArtist")
  public ResponseEntity<?> registerArtist(
      @RequestBody
      ArtistRegisterRequest artistRegisterRequest) {
    return registerUser(artistRegisterRequest, ROLE_ARTIST);
  }


  @Operation(summary = "Rejestracja firmy",
      responses = {
          @ApiResponse(responseCode = "200", description = "Pomyślnie zarejestrowano użytkownika",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = MyApiResponse.class))),
          @ApiResponse(responseCode = "400",
              description = "Niepoprawne dane rejestracji, być może są już zajęte",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = MyApiResponse.class)))},
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = CompanyRegisterRequest.class))),
      tags = {"Autoryzacja"})
  @PostMapping("/registerCompany")
  public ResponseEntity<?> registerCompany(
      @RequestBody
      CompanyRegisterRequest companyRegisterRequest) {
    return registerUser(companyRegisterRequest, ROLE_COMPANY);
  }

  @Operation(summary = "Potwierdzenie adresu email",
      responses = {
          @ApiResponse(responseCode = "200", description = "Pomyślnie potwierdzono adres email",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = MyApiResponse.class))),
          @ApiResponse(responseCode = "400", description = "Niepoprawny token",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = MyApiResponse.class)))},
      tags = {"Autoryzacja"})
  @GetMapping(path = "/confirmEmail")
  public RedirectView confirm(
      @RequestParam("token")
      String token) {
    return confirmationTokenService.confirmToken(token);
  }

  @PutMapping()
  public String redirect() {
    return "redirect:/redirect";
  }

  @Operation(summary = "Zwraca dane aktualnie zalogowanego użytkownika",
      responses = {
          @ApiResponse(responseCode = "200", description = "Pomyślnie zwrócono dane użytkownika",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = MyApiResponse.class))),
          @ApiResponse(responseCode = "401", description = "Autoryzacja nie powiodła się",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = MyApiResponse.class)))},
      security = @SecurityRequirement(name = "bearerToken"),
      tags = {"Autoryzacja"})
  @GetMapping(path = "/decodeToken")
  public ResponseEntity<?> decodeToken(
      @RequestHeader("Authorization")
      String authorizationHeader) {
    String token = authorizationHeader.substring("Bearer ".length());
    Jwt jwt = jwtDecoder.decode(token);
    String email = jwt.getClaimAsString("sub");
    String query = "SELECT username FROM users WHERE email = ?";
    String username = jdbcTemplate.queryForObject(query, String.class, email);

    String role = com.pz.designmatch.util.JWTUtil.getRoleFromToken();
    Map<String, Object> responseJson = new HashMap<>();

    responseJson.put("role", role);
    responseJson.put("username", username);

    return ResponseEntity.ok(responseJson);
  }

  private ResponseEntity<?> registerUser(RegisterRequest registerRequest, String roleName) {
    try {
      userService.registerNewUser(registerRequest, roleName);
    } catch (UserAlreadyExistAuthenticationException | ValidationException e) {
      log.error("Exception Occurred", e);
      return new ResponseEntity<>(new MyApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok().body(new MyApiResponse(true, "Pomyślnie zarejestrowano!"));
  }

  private String getToken(LocalUserDto localUser) {
    Instant now = Instant.now();
    long expiry = 36000L;
    String scope = localUser.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.joining(" "));
    JwtClaimsSet claims = JwtClaimsSet.builder()
        .issuer("self")
        .issuedAt(now)
        .expiresAt(now.plusSeconds(expiry))
        .subject(localUser.getUsername())
        .claim("scope", scope)
        .build();
    return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
  }
}
