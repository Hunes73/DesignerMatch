package com.pz.designmatch.controller;

import static com.pz.designmatch.constants.Constants.apiVersionAccept;

import com.pz.designmatch.dto.response.UserResponse;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.UserRepository;
import com.pz.designmatch.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {

  private final UserService userService;
  private final UserRepository userRepository;

  @Autowired
  public UserProfileController(UserService userService, UserRepository userRepository) {
    this.userService = userService;
    this.userRepository = userRepository;
  }

  @Operation(summary = "Zwraca dane użytkownika od podanym id", responses = {
      @ApiResponse(responseCode = "200", description = "Pomyślnie pobrano użytkownika",
          content = @Content(mediaType = apiVersionAccept,
              schema = @Schema(implementation = UserResponse.class))),
      @ApiResponse(responseCode = "500", description = "Internal Server Error")
  },
      security = @SecurityRequirement(name = "bearerToken"),
      tags = {"Użytkownik"})
  @GetMapping(value = "/getUserById", produces = apiVersionAccept)
  public ResponseEntity<UserResponse> getAllUsers() {
    Optional<UserEntity> user = userRepository.findById(2L);
    if (user.isEmpty()) {
      throw new UsernameNotFoundException("Nie znaleziono użytkownika o podanym id");
    }
    UserResponse userResponse = mapUserEntityToDto(user.get());
    return ResponseEntity.ok(userResponse);
  }

  @Operation(summary = "Zwraca listę nazw użytkowników", responses = {
      @ApiResponse(responseCode = "200", description = "Pomyślnie pobrano listę nazw użytkowników",
          content = @Content(mediaType = apiVersionAccept,
              array = @ArraySchema(schema = @Schema(implementation = String.class)))),
      @ApiResponse(responseCode = "500", description = "Internal Server Error")
  },
      security = @SecurityRequirement(name = "bearerToken"),
      tags = {"Użytkownik"})
  @GetMapping(value = "/getAllUsernames", produces = apiVersionAccept)
  public ResponseEntity<List<String>> getAllUsernames() {
    List<String> usernames = userService.getAllUsernames();
    return ResponseEntity.ok(usernames);
  }

  private UserResponse mapUserEntityToDto(UserEntity userEntity) {
    return new UserResponse(
        userEntity.getEmail(),
        userEntity.getUsername());
  }
}
