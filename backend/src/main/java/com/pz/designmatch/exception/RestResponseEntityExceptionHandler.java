package com.pz.designmatch.exception;

import com.pz.designmatch.dto.response.MyApiResponse;
import jakarta.validation.constraints.NotNull;
import java.util.stream.Collectors;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

  public RestResponseEntityExceptionHandler() {
    super();
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
      final @NotNull MethodArgumentNotValidException ex, final @NotNull HttpHeaders headers,
      final @NotNull HttpStatusCode status,
      final @NotNull WebRequest request) {
    logger.error("400 Status Code", ex);
    final BindingResult result = ex.getBindingResult();

    String error = result.getAllErrors().stream().map(e -> {
      if (e instanceof FieldError) {
        return ((FieldError) e).getField() + " : " + e.getDefaultMessage();
      } else {
        return e.getObjectName() + " : " + e.getDefaultMessage();
      }
    }).collect(Collectors.joining(", "));
    return handleExceptionInternal(ex, new MyApiResponse(false, error), new HttpHeaders(),
        HttpStatus.BAD_REQUEST, request);
  }
}