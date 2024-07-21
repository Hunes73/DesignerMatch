package com.pz.designmatch.service.impl;

import com.pz.designmatch.dto.LocalUserDto;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.service.UserService;
import com.pz.designmatch.util.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LocalUserDetailsService implements UserDetailsService {

  private final UserService userService;

  @Autowired
  public LocalUserDetailsService(UserService userService) {
    this.userService = userService;
  }

  @Override
  public LocalUserDto loadUserByUsername(final String email) throws UsernameNotFoundException {
    UserEntity user = userService.findUserByEmail(email);
    if (user == null) {
      throw new UsernameNotFoundException("Użytkownik " + email + " nie został znaleziony w bazie danych");
    }
    return createLocalUser(user);
  }

  private LocalUserDto createLocalUser(UserEntity user) {
    return new LocalUserDto(user.getEmail(), user.getPassword(), user.getEnabled(), true,
        true, true, CommonUtils.buildSimpleGrantedAuthorities(user.getRoles()));
  }
}
