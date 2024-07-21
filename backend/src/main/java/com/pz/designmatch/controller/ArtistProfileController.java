package com.pz.designmatch.controller;

import static com.pz.designmatch.constants.Constants.apiVersionAccept;

import com.pz.designmatch.dto.request.ArtistFilterRequest;
import com.pz.designmatch.dto.request.ArtistProfileRequest;
import com.pz.designmatch.dto.response.ArtistProfileResponse;
import com.pz.designmatch.dto.response.MyApiResponse;
import com.pz.designmatch.dto.response.PortfolioEntryResponse;
import com.pz.designmatch.dto.response.ShortArtistProfileResponse;
import com.pz.designmatch.service.impl.ArtistProfileServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ArtistProfileController {

  private final ArtistProfileServiceImpl artistProfileServiceImpl;

  @Autowired
  public ArtistProfileController(ArtistProfileServiceImpl artistProfileServiceImpl) {
    this.artistProfileServiceImpl = artistProfileServiceImpl;
  }


  @Operation(summary = "Zwraca profil artysty o podanej nazwie użytkownika",
      responses = {
          @ApiResponse(responseCode = "200", description = "Znaleziono artystę o podanej nazwie użytkownika",
              content = @Content(mediaType = apiVersionAccept,
                  schema = @Schema(implementation = ArtistProfileResponse.class))),
          @ApiResponse(responseCode = "403",
              description = "Nie udało się pobrać artysty o podanej nazwie użytkownika", content = @Content),
          @ApiResponse(responseCode = "401",
              description = "Nie udało się pobrać artysty o podanej nazwie użytkownika", content = @Content)},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika", required = true,
              example = "jkasinski2", schema = @Schema(type = "string"))},
      tags = {"Profil artysty"})
  @GetMapping(value = "/public/api/artist/getArtistProfileByUsername/{username}", produces = apiVersionAccept)
  public ResponseEntity<ArtistProfileResponse> getArtistProfileByUsername(
      @PathVariable("username")
      String username) {
    ArtistProfileResponse artistProfile = artistProfileServiceImpl.getArtistProfileByUsername(username);
    return ResponseEntity
        .status(HttpStatus.OK.value())
        .body(artistProfile);
  }


  @Operation(summary = "Zwraca krótki profil artysty o podanej nazwie użytkownika",
      responses = {
          @ApiResponse(responseCode = "200", description = "Znaleziono artystę o podanej nazwie użytkownika",
              content = @Content(mediaType = apiVersionAccept,
                  schema = @Schema(implementation = ShortArtistProfileResponse.class))),
          @ApiResponse(responseCode = "403",
              description = "Nie udało się pobrać artysty o podanej nazwie użytkownika", content = @Content),
          @ApiResponse(responseCode = "401",
              description = "Nie udało się pobrać artysty o podanej nazwie użytkownika", content = @Content)},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika", required = true,
              example = "jkasinski2",
              schema = @Schema(type = "string", implementation = String.class))},
      tags = {"Profil artysty"})
  @GetMapping(value = "/public/api/artist/getShortArtistProfileByUsername/{username}",
      produces = apiVersionAccept)
  public ResponseEntity<ShortArtistProfileResponse> getShortArtistProfileByUsername(
      @PathVariable("username")
      String username) {
    ShortArtistProfileResponse artistProfile = artistProfileServiceImpl.getShortArtistProfileByUsername(
        username);
    return ResponseEntity.ok(artistProfile);
  }


  @Operation(summary = "Zwraca pofiltrowaną listę krótkich profili artystów",
      responses = {
          @ApiResponse(responseCode = "200", description = "Znaleziono artystów",
              content = @Content(mediaType = apiVersionAccept,
                  schema = @Schema(implementation = ShortArtistProfileResponse.class))),
          @ApiResponse(responseCode = "404", description = "Nie udało się pobrać artystów",
              content = @Content),
          @ApiResponse(responseCode = "400", description = "Niepoprawne parametry filtrowania",
              content = @Content)},
      parameters = {
          @Parameter(name = "page", description = "Numer strony", example = "0",
              schema = @Schema(type = "int", implementation = Integer.class)),
          @Parameter(name = "size", description = "Ilość elementów na stronie", example = "10",
              schema = @Schema(type = "int", implementation = Integer.class))},
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          description = "Kryteria filtrowania", required = true,
          content = @Content(mediaType = apiVersionAccept,
              schema = @Schema(implementation = ArtistFilterRequest.class))),
      tags = {"Profil artysty"})
  @PostMapping(value = "/public/api/artist/filter", produces = apiVersionAccept, consumes = apiVersionAccept)
  public ResponseEntity<Page<ShortArtistProfileResponse>> filterArtists(
      @RequestBody
      ArtistFilterRequest filterRequest,
      @RequestParam(defaultValue = "0", name = "page")
      int page,
      @RequestParam(defaultValue = "10", name = "size")
      int size) {
    Page<ShortArtistProfileResponse> filteredArtists = artistProfileServiceImpl.filterArtistProfiles(
        filterRequest, PageRequest.of(page, size));
    return ResponseEntity.ok(filteredArtists);
  }


  @Operation(summary = "Zwraca zdjęcie profilowe artysty o podanej nazwie użytkownika",
      responses = {
          @ApiResponse(responseCode = "200", description = "Znaleziono zdjęcie profilowe artysty",
              content = @Content(mediaType = MediaType.IMAGE_JPEG_VALUE)),
          @ApiResponse(responseCode = "403", description = "Nie udało się pobrać zdjęcia profilowego artysty",
              content = @Content),
          @ApiResponse(responseCode = "401", description = "Nie udało się pobrać zdjęcia profilowego artysty",
              content = @Content)},
      parameters = {
          @Parameter(name = "username", required = true, description = "Nazwa użytkownika artysty",
              schema = @Schema(implementation = String.class), example = "jkasinski2")},
      tags = {"Profil artysty"})
  @GetMapping(value = "/public/api/artist/getProfileImageByUsername/{username}",
      produces = MediaType.IMAGE_JPEG_VALUE)
  public ResponseEntity<byte[]> getProfileImage(
      @PathVariable("username")
      String username) {
    byte[] bytes = artistProfileServiceImpl.getProfileImageByUsername(username);
    return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(bytes);
  }


  @Operation(
      summary = "Zwraca zdjęcie z portfolio artysty o podanej nazwie użytkownika i id wpisu w portfolio",
      responses = {
          @ApiResponse(responseCode = "200", description = "Znaleziono wpis w portfolio dla tego artysty",
              content = {@Content(mediaType = MediaType.IMAGE_JPEG_VALUE)}),
          @ApiResponse(responseCode = "403", description = "Nie udało się pobrać zdjęcia z portfolio artysty",
              content = @Content),
          @ApiResponse(responseCode = "401", description = "Nie udało się pobrać zdjęcia z portfolio artysty",
              content = @Content)},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika artysty", example = "jkasinski2",
              required = true, schema = @Schema(type = "string")),
          @Parameter(name = "portfolioEntryId", description = "Id wpisu w portfolio", example = "1",
              required = true, schema = @Schema(type = "long", implementation = Long.class))},
      tags = {"Profil artysty"})
  @GetMapping(value = "/public/api/artist/getPortfolioImage/{username}/{portfolioEntryId}",
      produces = MediaType.IMAGE_JPEG_VALUE)
  public ResponseEntity<byte[]> getPortfolioImage(
      @PathVariable("username")
      String username,
      @PathVariable("portfolioEntryId")
      Long imageId) {
    byte[] bytes = artistProfileServiceImpl.getPortfolioImage(username, imageId);
    return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(bytes);
  }


  @Operation(summary = "Zwraca listę wpisów z portfolio artysty o podanej nazwie użytkownika",
      responses = {
          @ApiResponse(responseCode = "200", description = "Znaleziono artystę",
              content = @Content(mediaType = apiVersionAccept,
                  schema = @Schema(implementation = PortfolioEntryResponse.class))),
          @ApiResponse(responseCode = "403", description = "Nie udało się pobrać wpisów z portfolio artysty",
              content = @Content)},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika artysty", example = "jkasinski2",
              required = true, schema = @Schema(type = "string")),
          @Parameter(name = "page", description = "Numer strony", example = "0",
              schema = @Schema(type = "int", implementation = Integer.class)),
          @Parameter(name = "size", description = "Ilość elementów na stronie", example = "10",
              schema = @Schema(type = "int", implementation = Integer.class))},
      tags = {"Profil artysty"})
  @GetMapping(value = "/public/api/artist/getPortfolioEntries/{username}", produces = apiVersionAccept)
  public ResponseEntity<Page<PortfolioEntryResponse>> getPortfolioEntries(
      @PathVariable("username")
      String username,
      @RequestParam(defaultValue = "0", name = "page")
      int page,
      @RequestParam(defaultValue = "10", name = "size")
      int size) {
    Page<PortfolioEntryResponse> portfolioEntries = artistProfileServiceImpl.getPortfolioEntries(username,
        PageRequest.of(page, size));
    return ResponseEntity.ok(portfolioEntries);
  }


  @Operation(summary = "Aktualizuje profil artysty o podanej nazwie użytkownika",
      responses = {
          @ApiResponse(responseCode = "200",
              description = "Zaktualizowano profil artysty o podanej nazwie użytkownika",
              content = {@Content(mediaType = apiVersionAccept,
                  schema = @Schema(implementation = ArtistProfileResponse.class))}),
          @ApiResponse(responseCode = "403", description = "Aktualizacja profilu artysty nie powiodła się",
              content = @Content),
          @ApiResponse(responseCode = "401", description = "Autoryzacja nie powiodła się",
              content = @Content)},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika artysty", required = true,
              example = "jkasinski2",
              schema = @Schema(type = "string", implementation = String.class))},
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          description = "Dane do aktualizacji profilu artysty", required = true,
          content = @Content(mediaType = apiVersionAccept,
              schema = @Schema(implementation = ArtistProfileRequest.class))),
      security = @SecurityRequirement(name = "bearerToken"),
      tags = {"Profil artysty"})
  @PutMapping(value = "/api/artist/updateProfileByUsername/{username}", produces = apiVersionAccept,
      consumes = apiVersionAccept)
  public ResponseEntity<ArtistProfileResponse> updateArtistProfileByUsername(
      @PathVariable("username")
      String username,
      @RequestBody
      ArtistProfileRequest artistProfile) {
    ArtistProfileResponse updatedArtistProfile = artistProfileServiceImpl.updateArtistProfileByUsername(
        username, artistProfile);
    return ResponseEntity.ok(updatedArtistProfile);
  }


  @Operation(summary = "Aktualizuje zdjęcie profilowe artysty o podanej nazwie użytkownika",
      responses = {
          @ApiResponse(responseCode = "200", description = "Zaktualizowano zdjęcie profilowe artysty",
              content = @Content(mediaType = apiVersionAccept,
                  schema = @Schema(implementation = MyApiResponse.class))),
          @ApiResponse(responseCode = "403",
              description = "Nie znaleziono artysty o podanej nazwie użytkownika", content = @Content),
          @ApiResponse(responseCode = "400",
              description = "Nie udało się zaktualizować zdjęcia profilowego artysty", content = @Content),
          @ApiResponse(responseCode = "401", description = "Autoryzacja nie powiodła się",
              content = @Content)},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika artysty", required = true,
              example = "jkasinski2", schema = @Schema(type = "string"))},
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE), required = true),
      security = @SecurityRequirement(name = "bearerToken"),
      tags = {"Profil artysty"})
  @PostMapping(value = "/api/artist/updateProfileImage/{username}", produces = apiVersionAccept,
      consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<MyApiResponse> updateProfileImageByUsername(
      @PathVariable("username")
      String username,
      @RequestParam("image")
      MultipartFile image) {
    artistProfileServiceImpl.uploadProfileImage(username, image);
    return ResponseEntity.ok(new MyApiResponse(true, "Pomyślnie zaktualizowano zdjęcie profilowe"));
  }

  @Operation(summary = "Dodaje wpis do portfolio artysty o podanej nazwie użytkownika",
      responses = {
          @ApiResponse(responseCode = "200", description = "Dodano zdjęcie do portfolio artysty",
              content = @Content(mediaType = apiVersionAccept,
                  schema = @Schema(implementation = MyApiResponse.class))),
          @ApiResponse(responseCode = "403",
              description = "Nie znaleziono artysty o podanej nazwie użytkownika", content = @Content),
          @ApiResponse(responseCode = "400", description = "Nie udało sie dodać wpisu do portfolio artysty",
              content = @Content),
          @ApiResponse(responseCode = "401", description = "Autoryzacja nie powiodła się",
              content = @Content)},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika artysty", required = true,
              example = "jkasinski2",
              schema = @Schema(type = "string", implementation = String.class)),
          @Parameter(name = "name", description = "Nazwa wpisu w portfolio", required = true,
              example = "Zdjęcie 1",
              schema = @Schema(type = "string", implementation = String.class)),
          @Parameter(name = "description", description = "Opis wpisu w portfolio", required = true,
              example = "Opis zdjęcia 1",
              schema = @Schema(type = "string", implementation = String.class))},
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE), required = true),
      security = @SecurityRequirement(name = "bearerToken"),
      tags = {"Profil artysty"})
  @PostMapping(value = "/api/artist/createPortfolioEntry/{username}", produces = apiVersionAccept,
      consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<MyApiResponse> uploadPortfolioImageByUsername(
      @PathVariable("username")
      String username,
      @RequestParam("image")
      MultipartFile image,
      @RequestParam
      String name,
      @RequestParam
      String description) {
    artistProfileServiceImpl.uploadPortfolioImage(username, image, name, description);
    return ResponseEntity.ok(new MyApiResponse(true, "Pomyślnie dodano zdjęcie do portfolio"));
  }


  @Operation(summary = "Usuwa wpis z portfolio artysty o podanej nazwie użytkownika i id wpisu w portfolio",
      responses = {
          @ApiResponse(responseCode = "200", description = "Usunięto zdjęcie z portfolio artysty",
              content = @Content(mediaType = apiVersionAccept,
                  schema = @Schema(implementation = MyApiResponse.class))),
          @ApiResponse(responseCode = "403", description = "Nie znaleziono artysty lub wpisu w portfolio",
              content = @Content),
          @ApiResponse(responseCode = "401", description = "Autoryzacja nie powiodła się",
              content = @Content)},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika artysty", required = true,
              example = "jkasinski2", schema = @Schema(type = "string", implementation = String.class)),
          @Parameter(name = "imageId", description = "Id zdjęcia w portfolio", required = true, example = "1",
              schema = @Schema(type = "long", implementation = Long.class))},
      security = @SecurityRequirement(name = "bearerToken"),
      tags = {"Profil artysty"})
  @DeleteMapping(value = "/api/artist/deletePortfolioEntry/{username}/{imageId}", produces = apiVersionAccept)
  public ResponseEntity<MyApiResponse> deletePortfolioEntry(
      @PathVariable("username")
      String username,
      @PathVariable("imageId")
      Long imageId) {
    artistProfileServiceImpl.deletePortfolioEntry(username, imageId);
    return ResponseEntity.ok(new MyApiResponse(true, "Pomyślnie usunięto zdjęcie z portfolio"));
  }
}
