package com.pz.designmatch.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CommissionNotFound extends RuntimeException {

  public CommissionNotFound(String message) {
    super(message);
  }
}
