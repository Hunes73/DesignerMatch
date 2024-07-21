package com.pz.designmatch.exception;

import java.util.Date;
import lombok.Getter;

@Getter
public class ErrorObject {

  private final Integer statusCode;
  private final String message;
  private final Date timestamp;

  public ErrorObject(Integer statusCode, String message, Date timestamp) {
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = timestamp;
  }
}
