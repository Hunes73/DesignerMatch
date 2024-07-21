package com.pz.designmatch.service;

import com.pz.designmatch.dto.request.RegisterRequest;
import com.pz.designmatch.exception.UserAlreadyExistAuthenticationException;
import com.pz.designmatch.model.user.UserEntity;
import jakarta.validation.ValidationException;
import java.util.List;

public interface UserService {

  UserEntity findUserByEmail(String email);

  List<String> getAllUsernames();

  void registerNewUser(RegisterRequest registerRequest, String roleName)
      throws UserAlreadyExistAuthenticationException, ValidationException;
}