package com.pz.designmatch.util.mapper;

import com.pz.designmatch.dto.response.ArtistProfileResponse;
import com.pz.designmatch.dto.response.ShortArtistProfileResponse;
import com.pz.designmatch.model.enums.Language;
import com.pz.designmatch.model.enums.Skill;
import com.pz.designmatch.model.enums.Tag;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.repository.EducationRepository;
import com.pz.designmatch.repository.ExperienceRepository;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ArtistProfileMapper {

  private final EducationMapper educationMapper;
  private final ExperienceMapper experienceMapper;
  private final EducationRepository educationRepository;
  private final ExperienceRepository experienceRepository;

  @Autowired
  public ArtistProfileMapper(EducationMapper educationMapper, ExperienceMapper experienceMapper,
      EducationRepository educationRepository, ExperienceRepository experienceRepository) {
    this.educationMapper = educationMapper;
    this.experienceMapper = experienceMapper;
    this.educationRepository = educationRepository;
    this.experienceRepository = experienceRepository;
  }


  public ArtistProfileResponse mapToDto(ArtistProfile artistProfile) {
    return new ArtistProfileResponse(
        artistProfile.getId(),
        artistProfile.getUser().getUsername(),
        artistProfile.getFirstname(),
        artistProfile.getLastname(),
        artistProfile.getBio(),
        artistProfile.getLevel() == null ? null : artistProfile.getLevel().getDisplayName(),
        artistProfile.getCity() == null ? null : artistProfile.getCity().getDisplayName(),
        artistProfile.getSkills().stream()
            .map(Skill::getDisplayName)
            .collect(Collectors.toSet()),
        artistProfile.getTags().stream()
            .map(Tag::getDisplayName)
            .collect(Collectors.toSet()),
        artistProfile.getLanguages().stream()
            .map(Language::getDisplayName)
            .collect(Collectors.toSet()),
        educationMapper.mapEducationEntitySetToDtoSet(
            educationRepository.findAllByArtistProfile_Id(artistProfile.getId())),
        experienceMapper.mapEntitySetToDtoSet(
            experienceRepository.findAllByArtistProfile_Id(artistProfile.getId())),
        artistProfile.getWebsite(),
        artistProfile.getFacebook(),
        artistProfile.getLinkedin(),
        artistProfile.getInstagram(),
        artistProfile.getDribble(),
        artistProfile.getPinterest(),
        artistProfile.getTwitter()
    );
  }

  public ShortArtistProfileResponse mapToShortDto(ArtistProfile artistProfile) {
    return new ShortArtistProfileResponse(
        artistProfile.getUser().getUsername(),
        artistProfile.getFirstname(),
        artistProfile.getLastname(),
        artistProfile.getLevel() == null ? null : artistProfile.getLevel().getDisplayName(),
        artistProfile.getCity() == null ? null : artistProfile.getCity().getDisplayName(),
        artistProfile.getSkills().stream()
            .map(Skill::getDisplayName)
            .collect(Collectors.toSet())
    );
  }
}
