package com.pz.designmatch.dto;

import java.io.Serial;
import java.util.Collection;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

@Getter
public class LocalUserDto extends User {

  @Serial
  private static final long serialVersionUID = -2845160792248762779L;

  public LocalUserDto(final String userID, final String password, final boolean enabled,
      final boolean accountNonExpired, final boolean credentialsNonExpired,
      final boolean accountNonLocked, final Collection<? extends GrantedAuthority> authorities) {
    super(userID, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
  }
}
