package com.pz.designmatch.controller;

import static com.pz.designmatch.constants.Constants.apiVersionAccept;

import com.pz.designmatch.dto.request.CommissionFilterRequest;
import com.pz.designmatch.dto.request.CommissionRequest;
import com.pz.designmatch.dto.response.CommissionResponse;
import com.pz.designmatch.service.CommissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommissionController {

  private final CommissionService commissionService;

  @Autowired
  public CommissionController(CommissionService commissionService) {
    this.commissionService = commissionService;
  }

  @Operation(summary = "Zwraca zlecenie o podanym id",
      responses = {
          @ApiResponse(responseCode = "200", description = "Znaleziono zlecenie o podanym id",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = CommissionResponse.class))),
          @ApiResponse(responseCode = "401", description = "Nie udało się pobrać zlecenia o podanym id",
              content = @Content),
          @ApiResponse(responseCode = "403", description = "Nie udało się pobrać zlecenia o podanym id",
              content = @Content)},
      parameters = {
          @Parameter(name = "id", description = "Id zlecenia", required = true, example = "1",
              schema = @Schema(type = "long", implementation = Long.class))},
      tags = {"Zlecenia"})
  @GetMapping(value = "/public/api/commission/getById/{id}", produces = apiVersionAccept)
  public ResponseEntity<CommissionResponse> getCommissionById(
      @PathVariable("id")
      Long id) {
    CommissionResponse commission = commissionService.getCommissionById(id);
    return ResponseEntity.ok(commission);
  }


  @Operation(summary = "Zwraca pofiltrowane zlecenia",
      responses = {
          @ApiResponse(responseCode = "200", description = "Znaleziono zlecenia",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = Page.class, example = "[]"))),
          @ApiResponse(responseCode = "404", description = "Nie udało się pobrać zleceń", content = @Content),
          @ApiResponse(responseCode = "400", description = "Nie udało się pobrać zleceń",
              content = @Content)},
      parameters = {
          @Parameter(name = "page", description = "Numer strony", example = "0",
              schema = @Schema(type = "int", implementation = Integer.class)),
          @Parameter(name = "size", description = "Ilość elementów na stronie", example = "10",
              schema = @Schema(type = "int", implementation = Integer.class))},
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Filtrowanie zleceń",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = CommissionFilterRequest.class))),
      tags = {"Zlecenia"})
  @PostMapping(value = "/public/api/commission/filter", produces = apiVersionAccept,
      consumes = apiVersionAccept)
  public ResponseEntity<Page<CommissionResponse>> filterCommissions(
      @RequestBody
      CommissionFilterRequest filterRequest,
      @RequestParam(defaultValue = "0", name = "page")
      int page,
      @RequestParam(defaultValue = "10", name = "size")
      int size) {
    Page<CommissionResponse> filteredCommissions = commissionService.filterCommissions(filterRequest,
        PageRequest.of(page, size));
    return ResponseEntity.ok(filteredCommissions);
  }


  @Operation(summary = "Tworzy zlecenie",
      responses = {
          @ApiResponse(responseCode = "200", description = "Zlecenie zostało utworzone",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = CommissionResponse.class))),
          @ApiResponse(responseCode = "400", description = "Nie udało się utworzyć zlecenia",
              content = @Content),
          @ApiResponse(responseCode = "401", description = "Autoryzacja nie powiodła się",
              content = @Content)},
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Dane zlecenia",
          required = true,
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = CommissionRequest.class))),
      tags = {"Zlecenia"})
  @PostMapping(value = "/api/commission/create", produces = apiVersionAccept, consumes = apiVersionAccept)
  public ResponseEntity<CommissionResponse> createCommission(
      @RequestBody
      CommissionRequest commission) {
    CommissionResponse createdCommission = commissionService.createCommission(commission);
    return ResponseEntity.ok(createdCommission);
  }


  @Operation(summary = "Aktualizuje zlecenie o podanym id",
      responses = {
          @ApiResponse(responseCode = "200", description = "Zlecenie zostało zaktualizowane",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = CommissionResponse.class))),
          @ApiResponse(responseCode = "403",
              description = "Nie udało się zaktualizować zlecenia o podanym id", content = @Content),
          @ApiResponse(responseCode = "401", description = "Autoryzacja nie powiodła się",
              content = @Content)},
      parameters = {
          @Parameter(name = "id", description = "Id zlecenia", required = true, example = "1",
              schema = @Schema(type = "long", implementation = Long.class))},
      requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Dane zlecenia",
          required = true,
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = CommissionRequest.class))),
      tags = {"Zlecenia"})
  @PutMapping(value = "/api/commission/updateById/{id}", produces = apiVersionAccept,
      consumes = apiVersionAccept)
  public ResponseEntity<CommissionResponse> updateCommissionById(
      @PathVariable("id")
      Long id,
      @RequestBody
      CommissionRequest commission) {
    CommissionResponse updatedCommission = commissionService.updateCommissionById(id, commission);
    return ResponseEntity.ok(updatedCommission);
  }

  @Operation(summary = "Ustawia zlecenie o podanym id jako zakończone",
      responses = {
          @ApiResponse(responseCode = "200", description = "Zlecenie o podanym id zostało zaktualizowane",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = CommissionResponse.class))),
          @ApiResponse(responseCode = "403",
              description = "Nie udało się zaktualizować zlecenia o podanym id", content = @Content),
          @ApiResponse(responseCode = "401", description = "Autoryzacja nie powiodła się",
              content = @Content)},
      parameters = {
          @Parameter(name = "id", description = "Id zlecenia", required = true, example = "1",
              schema = @Schema(type = "long", implementation = Long.class))},
      tags = {"Zlecenia"})
  @PutMapping(value = "/api/commission/setCompletedById/{id}", produces = apiVersionAccept)
  public ResponseEntity<CommissionResponse> setCompletedCommissionById(
      @PathVariable("id")
      Long id) {
    CommissionResponse completedCommission = commissionService.setCommissionCompletedById(id);
    return ResponseEntity.ok(completedCommission);
  }

  @Operation(summary = "Zwraca wszystkie zlecenia dla firmy o podanej nazwie użytkownika",
      responses = {
          @ApiResponse(responseCode = "200", description = "Zlecenia dla firmy o podanej nazwie użytkownika",
              content = @Content(mediaType = "application/json",
                  schema = @Schema(implementation = CommissionResponse.class))),
          @ApiResponse(responseCode = "404",
              description = "Nie znaleziono zleceń dla firmy o podanej nazwie użytkownika",
              content = @Content)},
      parameters = {
          @Parameter(name = "username", description = "Nazwa użytkownika", required = true,
              example = "jkasinski1", schema = @Schema(type = "string", implementation = String.class))},
      tags = {"Zlecenia"})
  @GetMapping(value = "/public/api/commission/getAllCommissionFirmByUsername/{username}",
      produces = apiVersionAccept)
  public ResponseEntity<List<CommissionResponse>> getCommissionsByUsername(
      @PathVariable("username")
      String username) {
    List<CommissionResponse> commissionsResponse = commissionService.getCommissionsByUsername(username);
    return ResponseEntity.ok(commissionsResponse);
  }


  @Operation(summary = "Usuwa zlecenie o podanym id",
      responses = {
          @ApiResponse(responseCode = "200", description = "Zlecenie zostało usunięte", content = @Content),
          @ApiResponse(responseCode = "403", description = "Nie udało się usunąć zlecenia o podanym id",
              content = @Content),
          @ApiResponse(responseCode = "401", description = "Autoryzacja nie powiodła się",
              content = @Content)},
      parameters = {
          @Parameter(name = "id", description = "Id zlecenia", required = true, example = "1",
              schema = @Schema(type = "long", implementation = Long.class))},
      tags = {"Zlecenia"})
  @DeleteMapping(value = "/api/deleteCommission/{id}", produces = apiVersionAccept)
  public ResponseEntity<String> deleteCommission(
      @PathVariable("id")
      Long id) {
    commissionService.deleteCommissionById(id);
    return ResponseEntity.ok().body("Zlecenie usunięte");
  }
}