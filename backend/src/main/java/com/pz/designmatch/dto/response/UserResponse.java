package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class UserResponse {

  @JsonProperty("email")
  private String email;

  @JsonProperty("username")
  private String username;

  public UserResponse(String email, String username) {
    this.email = email;
    this.username = username;
  }
}
