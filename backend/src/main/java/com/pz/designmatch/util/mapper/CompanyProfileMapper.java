package com.pz.designmatch.util.mapper;

import com.pz.designmatch.dto.request.CompanyProfileRequest;
import com.pz.designmatch.dto.response.CompanyProfileResponse;
import com.pz.designmatch.model.user.CompanyProfile;
import org.springframework.stereotype.Component;

@Component
public class CompanyProfileMapper {

  public CompanyProfile mapToEntity(CompanyProfileRequest companyProfileRequest) {
    return new CompanyProfile(
        companyProfileRequest.getName(),
        companyProfileRequest.getDescription(),
        companyProfileRequest.getAddress(),
        companyProfileRequest.getNip(),
        companyProfileRequest.getRegon(),
        companyProfileRequest.getKrs(),
        companyProfileRequest.getWebsite(),
        companyProfileRequest.getFacebook(),
        companyProfileRequest.getLinkedin(),
        companyProfileRequest.getTwitter(),
        companyProfileRequest.getInstagram()
    );
  }

  public CompanyProfileResponse mapToResponse(CompanyProfile companyProfile) {
    return new CompanyProfileResponse(
        companyProfile.getId(),
        companyProfile.getUser().getUsername(),
        companyProfile.getName(),
        companyProfile.getDescription(),
        companyProfile.getAddress(),
        companyProfile.getNIP(),
        companyProfile.getREGON(),
        companyProfile.getKRS(),
        companyProfile.getWebsite(),
        companyProfile.getFacebook(),
        companyProfile.getLinkedin(),
        companyProfile.getTwitter(),
        companyProfile.getInstagram()
    );
  }
}
