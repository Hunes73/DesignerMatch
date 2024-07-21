package com.pz.designmatch.service;

import com.pz.designmatch.dto.request.CompanyProfileRequest;
import com.pz.designmatch.dto.response.CompanyProfileResponse;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

public interface CompanyProfileService {

  CompanyProfileResponse updateCompanyProfileByUsername(String username, CompanyProfileRequest companiesDto);

  @Transactional(readOnly = true)
  CompanyProfileResponse getCompanyProfileByUsername(String username);

  byte[] getProfileImageByUsername(String username);

  void uploadProfileImage(String username, MultipartFile file);
}
