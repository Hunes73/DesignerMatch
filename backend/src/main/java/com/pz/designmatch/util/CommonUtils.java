package com.pz.designmatch.util;

import com.pz.designmatch.model.user.Role;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class CommonUtils {

  public static List<SimpleGrantedAuthority> buildSimpleGrantedAuthorities(final Set<Role> userRoles) {
    List<SimpleGrantedAuthority> authorities = new ArrayList<>();
    for (Role userRole : userRoles) {
      authorities.add(new SimpleGrantedAuthority(userRole.getName()));
    }
    return authorities;
  }
}
