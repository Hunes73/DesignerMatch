package com.pz.designmatch.controller;

import static com.pz.designmatch.constants.Constants.apiVersionAccept;

import com.pz.designmatch.dto.response.AvailableSkillsCategoriesResponse;
import com.pz.designmatch.model.enums.City;
import com.pz.designmatch.model.enums.Language;
import com.pz.designmatch.model.enums.Level;
import com.pz.designmatch.model.enums.Tag;
import com.pz.designmatch.util.AvailableCategoriesDtoBuilder;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/api/filter")
public class FilterController {

  @Operation(summary = "Zwraca dostępne kategorie", responses = {
      @ApiResponse(responseCode = "200", description = "Pobrano dostępne kategorie",
          content = @Content(mediaType = apiVersionAccept, array = @ArraySchema(schema =
          @Schema(implementation = String.class,
              example = "[\"Programowanie\",\"Grafika\",\"Marketing\",\"Administracja\",\"Sprzedaż\"]",
              description = "Lista dostępnych kategorii")))),
      @ApiResponse(responseCode = "500",
          description = "Wystąpił błąd podczas pobierania dostępnych kategorii")
  }, tags = {"Filtry"})
  @GetMapping(value = "/getAvailableCategories", produces = apiVersionAccept)
  public ResponseEntity<AvailableSkillsCategoriesResponse> getAvailableCategories() {
    AvailableSkillsCategoriesResponse categoryOptionsDto = AvailableCategoriesDtoBuilder.getAvailableCategoriesDto();
    return ResponseEntity.ok(categoryOptionsDto);
  }


  @Operation(summary = "Zwraca dostępne miasta", responses = {
      @ApiResponse(responseCode = "200", description = "Pobrano dostępne miasta",
          content = @Content(mediaType = apiVersionAccept, array = @ArraySchema(schema =
          @Schema(
              example = "[\"Zdalnie\",\"Warszawa\",\"Kraków\",\"Wrocław\",\"Poznań\",\"Gdańsk\",\"Szczecin\",\"Bydgoszcz\",\"Lublin\"]",
              description = "Lista dostępnych miast")))),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404",
          description = "Wystąpił błąd podczas pobierania dostępnych miast",
          content = @Content)},
      tags = {"Filtry"})
  @GetMapping(value = "/getAvailableCities", produces = apiVersionAccept)
  public ResponseEntity<List<String>> getAvailableCities() {
    List<String> cities = City.getAvailableCities();
    return ResponseEntity.ok(cities);
  }


  @Operation(summary = "Zwraca dostępne poziomy", responses = {
      @ApiResponse(responseCode = "200", description = "Pobrano dostępne poziomy",
          content = @Content(mediaType = apiVersionAccept, array = @ArraySchema(
              schema = @Schema(implementation = String.class, example = "[\"Junior\",\"Mid\",\"Senior\"]",
                  description = "Lista dostępnych poziomów")))),
      @ApiResponse(responseCode = "500", description = "Wystąpił błąd podczas pobierania dostępnych poziomów")
  }, tags = {"Filtry"})
  @GetMapping(value = "/getAvailableLevels", produces = apiVersionAccept)
  public ResponseEntity<List<String>> getAvailableLevels() {
    List<String> levels = Level.getAvailableLevels();
    return ResponseEntity.ok(levels);
  }


  @Operation(summary = "Zwraca dostępne tagi", responses = {
      @ApiResponse(responseCode = "200", description = "Pobrano dostępne tagi",
          content = @Content(mediaType = apiVersionAccept,
              array = @ArraySchema(schema = @Schema(implementation = String.class)))),
      @ApiResponse(responseCode = "500", description = "Wystąpił błąd podczas pobierania dostępnych tagów")
  }, tags = {"Filtry"})
  @GetMapping(value = "/getAvailableTags", produces = apiVersionAccept)
  public ResponseEntity<List<String>> getAvailableTags() {
    List<String> tags = Tag.getAvailableTags();
    return ResponseEntity.ok(tags);
  }


  @Operation(summary = "Zwraca dostępne języki", responses = {
      @ApiResponse(responseCode = "200", description = "Pobrano dostępne języki",
          content = @Content(mediaType = apiVersionAccept,
              array = @ArraySchema(schema = @Schema(implementation = String.class)))),
      @ApiResponse(responseCode = "500", description = "Wystąpił błąd podczas pobierania dostępnych języków")
  }, tags = {"Filtry"})
  @GetMapping(value = "/getAvailableLanguages", produces = apiVersionAccept)
  public ResponseEntity<List<String>> getAvailableLanguages() {
    List<String> languages = Language.getAvailableLanguages();
    return ResponseEntity.ok(languages);
  }
}
