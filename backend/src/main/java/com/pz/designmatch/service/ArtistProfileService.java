package com.pz.designmatch.service;

import com.pz.designmatch.dto.request.ArtistFilterRequest;
import com.pz.designmatch.dto.request.ArtistProfileRequest;
import com.pz.designmatch.dto.response.ArtistProfileResponse;
import com.pz.designmatch.dto.response.PortfolioEntryResponse;
import com.pz.designmatch.dto.response.ShortArtistProfileResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface ArtistProfileService {

  ArtistProfileResponse getArtistProfileByUsername(String username);

  ShortArtistProfileResponse getShortArtistProfileByUsername(String username);

  byte[] getProfileImageByUsername(String username);

  byte[] getPortfolioImage(String username, Long imageId);

  Page<PortfolioEntryResponse> getPortfolioEntries(String username, Pageable pageable);

  @Transactional
  ArtistProfileResponse updateArtistProfileByUsername(String username, ArtistProfileRequest artistProfile);

  Page<ShortArtistProfileResponse> filterArtistProfiles(ArtistFilterRequest filterRequest, Pageable pageable);

  void deletePortfolioEntry(String username, Long imageId);

  void uploadProfileImage(String username, MultipartFile image);

  void uploadPortfolioImage(String username, MultipartFile image, String name, String description);
}
