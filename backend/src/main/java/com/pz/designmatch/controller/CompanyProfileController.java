package com.pz.designmatch.controller;

import static com.pz.designmatch.constants.Constants.apiVersionAccept;

import com.pz.designmatch.dto.request.CompanyProfileRequest;
import com.pz.designmatch.dto.response.CompanyProfileResponse;
import com.pz.designmatch.dto.response.MyApiResponse;
import com.pz.designmatch.service.CompanyProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class CompanyProfileController {

  private final CompanyProfileService companyProfileService;

  public CompanyProfileController(CompanyProfileService companyProfileService) {
    this.companyProfileService = companyProfileService;
  }

  @Operation(summary = "Zwraca profil firmy o podanej nazwie użytkownika",
      responses = {
          @ApiResponse(responseCode = "200",
              description = "Znaleziono profil firmy dla podanej nazwy użytkownika",
              content = @Content(mediaType = apiVersionAccept,
                  schema = @Schema(implementation = CompanyProfileResponse.class))),
          @ApiResponse(responseCode = "401",
              description = "Nie udało się pobrać profilu firmy dla podanej nazwy użytkownika",
              content = @Content)},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika", required = true,
              example = "jkasinski1")},
      tags = {"Profil firmy"})
  @GetMapping(value = "/public/api/company/getProfileByUsername/{username}", produces = apiVersionAccept)
  public ResponseEntity<CompanyProfileResponse> getCompanyProfileByUsername(
      @PathVariable("username")
      String username) {
    CompanyProfileResponse company = companyProfileService.getCompanyProfileByUsername(username);
    return ResponseEntity.status(HttpStatus.OK.value()).body(company);
  }


  @Operation(summary = "Zwraca zdjęcie profilowe firmy o podanej nazwie użytkownika",
      responses = {
          @ApiResponse(responseCode = "200",
              description = "Znaleziono zdjęcie profilowe firmy o podanej nazwie użytkownika",
              content = @Content(mediaType = MediaType.IMAGE_JPEG_VALUE)),
          @ApiResponse(responseCode = "401",
              description = "Nie udało się pobrać zdjęcia profilowego firmy dla podanej nazwy użytkownika",
              content = @Content)},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika", required = true,
              example = "jkasinski1")},
      tags = {"Profil firmy"})
  @GetMapping(value = "/public/api/company/getProfileImageByUsername/{username}",
      produces = MediaType.IMAGE_JPEG_VALUE)
  public ResponseEntity<byte[]> getProfileImageByUsername(
      @PathVariable("username")
      String username) {
    byte[] bytes = companyProfileService.getProfileImageByUsername(username);
    return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(bytes);
  }


  @Operation(summary = "Aktualizuje profil firmy o podanej nazwie użytkownika",
      responses = {
          @ApiResponse(responseCode = "200", description = "Zaktualizowano profil firmy",
              content = @Content(mediaType = apiVersionAccept,
                  schema = @Schema(implementation = CompanyProfileResponse.class))),
          @ApiResponse(responseCode = "403",
              description = "Nie udało się zaktualizować profilu firmy dla podanej nazwy użytkownika",
              content = @Content),
          @ApiResponse(responseCode = "401", description = "Autoryzacja nie powiodła się",
              content = @Content)},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika", required = true,
              example = "jkasinski1")},
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          content = @Content(mediaType = apiVersionAccept,
              schema = @Schema(implementation = CompanyProfileRequest.class))),
      tags = {"Profil firmy"})
  @PutMapping(value = "/api/company/updateProfileByUsername/{username}", produces = apiVersionAccept,
      consumes = apiVersionAccept)
  public ResponseEntity<CompanyProfileResponse> updateCompanyProfileByUsername(
      @PathVariable("username")
      String username,
      @RequestBody
      CompanyProfileRequest companyProfile) {
    CompanyProfileResponse updatedCompanyProfile = companyProfileService.updateCompanyProfileByUsername(
        username, companyProfile);
    return ResponseEntity.ok(updatedCompanyProfile);
  }


  @Operation(summary = "Aktualizuje zdjęcie profilowe firmy o podanej nazwie użytkownika",
      responses = {
          @ApiResponse(responseCode = "200", description = "Zaktualizowano zdjęcie profilowe firmy",
              content = @Content(mediaType = apiVersionAccept,
                  schema = @Schema(implementation = MyApiResponse.class))),
          @ApiResponse(responseCode = "403",
              description = "Nie udało się zaktualizować zdjęcia profilowego firmy dla podanej nazwy użytkownika",
              content = @Content),
          @ApiResponse(responseCode = "400",
              description = "Nie udało się zaktualizować zdjęcia profilowego firmy", content = @Content),
          @ApiResponse(responseCode = "401", description = "Autoryzacja nie powiodła się",
              content = @Content),},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika", required = true,
              example = "jkasinski1")},
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
          content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE), required = true),
      tags = {"Profil firmy"})
  @PostMapping(value = "/api/company/uploadProfileImage/{username}", produces = apiVersionAccept,
      consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<MyApiResponse> uploadProfileImage(
      @PathVariable("username")
      String username,
      @RequestParam("file")
      MultipartFile file) {
    companyProfileService.uploadProfileImage(username, file);
    return ResponseEntity.ok(new MyApiResponse(true, "Pomyślnie zaktualizowano zdjęcie profilowe"));
  }
}
