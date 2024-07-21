package com.pz.designmatch.service.impl;

import com.pz.designmatch.model.user.ConfirmationToken;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.ConfirmationTokenRepository;
import com.pz.designmatch.service.ConfirmationTokenService;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.RedirectView;

@Service
@AllArgsConstructor
public class ConfirmationTokenServiceImpl implements ConfirmationTokenService {

  private final ConfirmationTokenRepository confirmationTokenRepository;

  public String saveConfirmationToken(UserEntity user) {
    String token = UUID.randomUUID().toString();
    ConfirmationToken confirmationToken = new ConfirmationToken(token, LocalDateTime.now(),
        LocalDateTime.now().plusMinutes(15), user);
    confirmationTokenRepository.save(confirmationToken);
    return token;
  }

  public RedirectView confirmToken(String token) {
    ConfirmationToken confirmationToken = getToken(token).orElseThrow(
        () -> new IllegalStateException("Token not found"));
    if (confirmationToken.getConfirmedAt() != null) {
      RedirectView redirectView = new RedirectView();
      redirectView.setUrl("http://localhost:3000/login");
      return redirectView;
    }
    LocalDateTime expiresAt = confirmationToken.getExpiresAt();
    if (expiresAt.isBefore(LocalDateTime.now())) {
      RedirectView redirectView = new RedirectView();
      redirectView.setUrl("http://localhost:3000/login");
      return redirectView;
    }

    setConfirmedAt(token);
    RedirectView redirectView = new RedirectView();
    redirectView.setUrl("http://localhost:3000/confirm");
    return redirectView;
  }

  private void setConfirmedAt(String token) {
    confirmationTokenRepository.updateConfirmedAt(token, LocalDateTime.now());
  }

  private Optional<ConfirmationToken> getToken(String token) {
    return confirmationTokenRepository.findByToken(token);
  }
}
