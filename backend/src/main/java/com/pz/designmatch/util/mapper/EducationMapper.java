package com.pz.designmatch.util.mapper;

import com.pz.designmatch.dto.EducationDto;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.model.user.Education;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class EducationMapper {

  public Set<Education> mapEducationDtoSetToEntitySet(Set<EducationDto> educationDtos,
      ArtistProfile artistProfile) {
    return educationDtos.stream()
        .map(educationRequest -> mapEducationDtoToEntity(educationRequest, artistProfile))
        .collect(Collectors.toSet());
  }

  public Education mapEducationDtoToEntity(EducationDto educationDto, ArtistProfile artistProfile) {
    return new Education(
        artistProfile,
        educationDto.getSchoolName(),
        educationDto.getFaculty(),
        educationDto.getFieldOfStudy(),
        educationDto.getDegree(),
        educationDto.getStartDate(),
        educationDto.getEndDate(),
        educationDto.getDescription()
    );
  }

  public Set<EducationDto> mapEducationEntitySetToDtoSet(Set<Education> educationSet) {
    return educationSet.stream()
        .map(this::mapEducationEntityToDto)
        .collect(Collectors.toSet());
  }

  public EducationDto mapEducationEntityToDto(Education educationDto) {
    return new EducationDto(
        educationDto.getSchoolName(),
        educationDto.getFaculty(),
        educationDto.getFieldOfStudy(),
        educationDto.getDegree(),
        educationDto.getStartDate(),
        educationDto.getEndDate(),
        educationDto.getDescription()
    );
  }
}
