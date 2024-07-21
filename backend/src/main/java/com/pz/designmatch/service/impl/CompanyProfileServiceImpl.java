package com.pz.designmatch.service.impl;

import com.pz.designmatch.dto.request.CompanyProfileRequest;
import com.pz.designmatch.dto.response.CompanyProfileResponse;
import com.pz.designmatch.model.user.CompanyProfile;
import com.pz.designmatch.repository.CompanyProfileRepository;
import com.pz.designmatch.service.CompanyProfileService;
import com.pz.designmatch.util.ImageUtils;
import com.pz.designmatch.util.mapper.CompanyProfileMapper;
import jakarta.persistence.EntityNotFoundException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CompanyProfileServiceImpl implements CompanyProfileService {

  private final CompanyProfileRepository companyProfileRepository;
  private final CompanyProfileMapper companyProfileMapper;
  private final ImageUtils imageUtils;

  @Autowired
  public CompanyProfileServiceImpl(CompanyProfileRepository companyProfileRepository,
      CompanyProfileMapper companyProfileMapper, ImageUtils imageUtils) {
    this.companyProfileRepository = companyProfileRepository;
    this.companyProfileMapper = companyProfileMapper;
    this.imageUtils = imageUtils;
  }

  @Override
  public CompanyProfileResponse updateCompanyProfileByUsername(String username,
      CompanyProfileRequest companiesDto) {
    CompanyProfile existingCompanyProfile = companyProfileRepository.findByUser_Username(username)
        .orElseThrow(
            () -> new EntityNotFoundException("Nie znaleziono profilu firmy dla użytkownika " + username));

    Optional.ofNullable(companiesDto.getName()).ifPresent(existingCompanyProfile::setName);
    Optional.ofNullable(companiesDto.getDescription()).ifPresent(existingCompanyProfile::setDescription);
    Optional.ofNullable(companiesDto.getRegon()).ifPresent(existingCompanyProfile::setREGON);
    Optional.ofNullable(companiesDto.getKrs()).ifPresent(existingCompanyProfile::setKRS);
    Optional.ofNullable(companiesDto.getWebsite()).ifPresent(existingCompanyProfile::setWebsite);
    Optional.ofNullable(companiesDto.getFacebook()).ifPresent(existingCompanyProfile::setFacebook);
    Optional.ofNullable(companiesDto.getTwitter()).ifPresent(existingCompanyProfile::setTwitter);
    Optional.ofNullable(companiesDto.getInstagram()).ifPresent(existingCompanyProfile::setInstagram);
    Optional.ofNullable(companiesDto.getLinkedin()).ifPresent(existingCompanyProfile::setLinkedin);
    Optional.ofNullable(companiesDto.getAddress()).ifPresent(existingCompanyProfile::setAddress);

    return companyProfileMapper.mapToResponse(companyProfileRepository.save(existingCompanyProfile));
  }

  @Override
  public CompanyProfileResponse getCompanyProfileByUsername(String username) {
    return companyProfileMapper.mapToResponse(companyProfileRepository.findByUser_Username(username)
        .orElseThrow(
            () -> new EntityNotFoundException("Nie znaleziono profilu firmy dla użytkownika " + username)));
  }

  @Override
  public byte[] getProfileImageByUsername(String username) {
    String imagePath = companyProfileRepository.findByUser_Username(username)
        .map(CompanyProfile::getProfileImageUrl).orElseThrow(
            () -> new EntityNotFoundException("Nie znaleziono profilu artysty dla użytkownika: " + username));

    return imageUtils.getImageFromPath(imagePath);
  }

  @Override
  public void uploadProfileImage(String username, MultipartFile image) {
    CompanyProfile companyProfile = companyProfileRepository.findByUser_Username(username).orElseThrow(
        () -> new EntityNotFoundException("Nie znaleziono profilu firmy dla użytkownika " + username));
    String imagePath = imageUtils.generateImagePath(image);

    companyProfile.setProfileImageUrl(imagePath);
    companyProfileRepository.save(companyProfile);
  }
}