package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.EqualsAndHashCode;
import lombok.Getter;


@Getter
@EqualsAndHashCode(callSuper = true)
@SuppressWarnings("SpellCheckingInspection")
public class CompanyRegisterRequest extends RegisterRequest {

  @NotEmpty
  @JsonProperty("name")
  @Schema(description = "Nazwa firmy", example = "Google", implementation = String.class)
  private String name;

  @NotEmpty
  @JsonProperty("nip")
  @Schema(description = "NIP", example = "5247289916", implementation = String.class)
  private String nip;

  @NotEmpty
  @JsonProperty("regon")
  @Schema(description = "REGON", example = "850704562", implementation = String.class)
  private String regon;

  @JsonProperty("krs")
  @Schema(description = "KRS", example = "0000385161", implementation = String.class)
  private String krs;
}