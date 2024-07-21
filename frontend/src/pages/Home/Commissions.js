import React, { useEffect, useState, useRef } from 'react';
import {
  Cards2,
  FilterWrapper,
  SubtitleText,
  TitleText,
  CheckBoxLabel,
  CheckBoxWrapper,
  CheckBox,
  FilterLabel,
  StyledSelect,
  StyledOption,
  CategoryText,
  RightLabel,
  TopSection,
  FilterButton,
  FilterDropDownContainer,
  CategoryWrapper,
  CheckBoxText,
  ClearButton,
  FilterScroll,
  ModalBackground,
  ModalWrapper,
  ModalButton,
  ModalButtonContainer,
  ModalIconContainer,
  LineForm,
  ModalScroll,
  FilterModalWrapper,
  BlankCard,
  Input,
} from './CardsElement';
import axios from '../../api/axios';
import { useMemo } from 'react';
import LoadingPage from '../LoadingPage';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS } from '../../components/Colors';
import {
  CommissionBottom,
  CommissionBubble,
  CommissionLabel,
  CommissionLineForm,
  CommissionText,
  CommissionTitle,
  CommissionTitleContainer,
  CommissionTop,
  CommissionWrapper,
  LevelBubble,
  ModalCommissionBackground,
  ModalCommissionWrapper,
  StakeText,
  VisitCompanyButton,
} from './CommissionsElements';
import {
  Button,
  ModalBottomSection,
  ModalBubbleContainer,
  ModalColumn,
  ModalData,
  ModalInfo,
  ModalRow,
  ModalTitle,
} from '../Profile/ProfileElements';
import { FiBriefcase, FiClock, FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const { darkLight, gray1 } = COLORS;

const Commissions = () => {
  const [cities, setCities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [levelsFilter, setLevelsFilter] = useState([]);
  const [citiesFilter, setCitiesFilter] = useState([]);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [languagesFilter, setLanguagesFilter] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [showCities, setShowCities] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showFModal, setShowFModal] = useState(false);
  const [showCModal, setShowCModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [searchText, setSearchText] = useState('');

  function getSelectedLevel(levels) {
    if (levels) {
      if (levels.length === 3) {
        return 'Junior+';
      } else if (levels.length === 2) {
        return 'Mid+';
      } else if (levels.length === 1) {
        return levels[0];
      }
    }
  }

  const navigate = useNavigate();

  const handleCityChange = (e) => {
    const city = e.target.id;
    if (e.target.checked) {
      setCitiesFilter([...citiesFilter, city]);
    } else {
      setCitiesFilter(citiesFilter.filter((c) => c !== city));
    }
  };

  const handleLanguageChange = (e) => {
    const language = e.target.id;
    if (e.target.checked) {
      setLanguagesFilter([...languagesFilter, language]);
    } else {
      setLanguagesFilter(languagesFilter.filter((c) => c !== language));
    }
  };

  const handleTagChange = (e) => {
    const tag = e.target.id;
    if (e.target.checked) {
      setTagsFilter([...tagsFilter, tag]);
    } else {
      setTagsFilter(tagsFilter.filter((c) => c !== tag));
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.id;
    if (e.target.checked) {
      setCategoriesFilter([...categoriesFilter, category]);
    } else {
      setCategoriesFilter(categoriesFilter.filter((c) => c !== category));
    }
  };

  const handleLevelChange = (e) => {
    const level = e.target.id;
    if (e.target.checked) {
      setLevelsFilter([...levelsFilter, level]);
    } else {
      setLevelsFilter(levelsFilter.filter((c) => c !== level));
    }
  };

  const clearFilters = () => {
    setLevelsFilter([]);
    setLanguagesFilter([]);
    setCitiesFilter([]);
    setCategoriesFilter([]);
    setTagsFilter([]);
  };

  const tagsData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/public/api/filter/getAvailableTags',
      headers: {},
    }),
    [],
  );

  const levelsData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/public/api/filter/getAvailableLevels',
      headers: {},
    }),
    [],
  );

  const languagesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/public/api/filter/getAvailableLanguages',
      headers: {},
    }),
    [],
  );

  const citiesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/public/api/filter/getAvailableCities',
      headers: {},
    }),
    [],
  );

  const categoriesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/public/api/filter/getAvailableCategories',
      headers: {},
    }),
    [],
  );

  useEffect(() => {
    const filter = async () => {
      try {
        const response = await axios
          .post(
            '/public/api/commission/filter',
            {
              levels: levelsFilter,
              locations: citiesFilter,
              skills: categoriesFilter,
              tags: tagsFilter,
              languages: languagesFilter,
            },
            {
              params: { page: 0, size: 50 },
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            },
          )
          .catch((error) => {
            console.log(error);
          });
        if ((response.status = 200)) {
          setFiltered(response.data);
          console.log(response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    filter();
  }, [levelsFilter, categoriesFilter, languagesFilter, citiesFilter, tagsFilter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse, tagsResponse, categoriesResponse, languagesResponse, levelsResponse] = await Promise.all(
          [
            axios.request(citiesData),
            axios.request(tagsData),
            axios.request(categoriesData),
            axios.request(languagesData),
            axios.request(levelsData),
          ],
        );
        setCities(citiesResponse.data);
        setTags(tagsResponse.data);
        setLevels(levelsResponse.data);
        setLanguages(languagesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [citiesData, tagsData, categoriesData, languagesData, levelsData]);

  const cityOptions = useMemo(() => {
    return cities.map((city, index) => (
      <CheckBoxWrapper key={index}>
        <div>
          <CheckBox type="checkbox" id={city} checked={citiesFilter.includes(city)} onChange={handleCityChange} />
          <CheckBoxLabel htmlFor={city} />
        </div>
        <CheckBoxText>{city}</CheckBoxText>
      </CheckBoxWrapper>
    ));
  });

  const languageOptions = useMemo(() => {
    return languages.map((language, index) => (
      <CheckBoxWrapper key={index}>
        <div>
          <CheckBox
            type="checkbox"
            id={language}
            checked={languagesFilter.includes(language)}
            onChange={handleLanguageChange}
          />
          <CheckBoxLabel htmlFor={language} />
        </div>
        <CheckBoxText>{language}</CheckBoxText>
      </CheckBoxWrapper>
    ));
  });

  const tagOptions = useMemo(() => {
    return tags.map((tag, index) => (
      <CheckBoxWrapper key={index}>
        <div>
          <CheckBox type="checkbox" id={tag} checked={tagsFilter.includes(tag)} onChange={handleTagChange} />
          <CheckBoxLabel htmlFor={tag} />
        </div>
        <CheckBoxText>{tag}</CheckBoxText>
      </CheckBoxWrapper>
    ));
  });

  const levelOptions = useMemo(() => {
    return levels.map((level, index) => (
      <CheckBoxWrapper key={index}>
        <div>
          <CheckBox type="checkbox" id={level} checked={levelsFilter.includes(level)} onChange={handleLevelChange} />
          <CheckBoxLabel htmlFor={level} />
        </div>
        <CheckBoxText>{level}</CheckBoxText>
      </CheckBoxWrapper>
    ));
  });

  const categoryOptions = useMemo(() => {
    if (!Array.isArray(categories.categories)) {
      return null;
    }

    return categories.categories.map((category, indexC) => (
      <CategoryWrapper>
        <CategoryText key={indexC}>{category.name}</CategoryText>
        {category.skills.map((subcategory, indexS) => (
          <CheckBoxWrapper key={indexS}>
            <div>
              <CheckBox
                type="checkbox"
                id={subcategory}
                checked={categoriesFilter.includes(subcategory)}
                onChange={handleCategoryChange}
              />
              <CheckBoxLabel htmlFor={subcategory} />
            </div>
            <CheckBoxText>{subcategory}</CheckBoxText>
          </CheckBoxWrapper>
        ))}
      </CategoryWrapper>
    ));
  });

  const handleCityVisibleClick = () => {
    setShowCities(!showCities);
  };

  const handleLanguageVisibleClick = () => {
    setShowLanguages(!showLanguages);
  };

  const handleTagVisibleClick = () => {
    setShowTags(!showTags);
  };

  const handleCategoryVisibleClick = () => {
    setShowCategories(!showCategories);
  };

  const handleLevelVisibleClick = () => {
    setShowLevels(!showLevels);
  };

  const FModalOpen = () => {
    setShowFModal(true);
  };

  const FModalClose = () => {
    setShowFModal(false);
  };

  const CModalOpen = (data) => {
    console.log(data);
    setModalData(data);
    setShowCModal(true);
  };

  const CModalClose = () => {
    setShowCModal(false);
  };

  const handleWrapperClick = (event) => {
    event.stopPropagation();
  };

  const FilterModal = ({ showFModal, onCloseFModal }) => {
    return (
      <>
        {showFModal && (
          <ModalBackground onClick={onCloseFModal}>
            <FilterModalWrapper onClick={handleWrapperClick}>
              <ModalIconContainer onClick={onCloseFModal}>
                <FontAwesomeIcon style={{ color: darkLight }} icon={faChevronDown} />
              </ModalIconContainer>
              <LineForm />
              <ModalScroll>
                <ModalButtonContainer>
                  <ModalButton onClick={clearFilters}>Wyczyść filtry</ModalButton>
                </ModalButtonContainer>
                <FilterDropDownContainer onClick={handleCityVisibleClick}>
                  <FontAwesomeIcon icon={showCities ? faChevronDown : faChevronRight} />
                  <SubtitleText>Skąd?</SubtitleText>
                </FilterDropDownContainer>
                {showCities && <>{cityOptions}</>}
                <FilterDropDownContainer onClick={handleLanguageVisibleClick}>
                  <FontAwesomeIcon icon={showLanguages ? faChevronDown : faChevronRight} />
                  <SubtitleText>Języki</SubtitleText>
                </FilterDropDownContainer>
                {showLanguages && <>{languageOptions}</>}
                <FilterDropDownContainer onClick={handleTagVisibleClick}>
                  <FontAwesomeIcon icon={showTags ? faChevronDown : faChevronRight} />
                  <SubtitleText>Tagi</SubtitleText>
                </FilterDropDownContainer>
                {showTags && <>{tagOptions}</>}
                <FilterDropDownContainer onClick={handleCategoryVisibleClick}>
                  <FontAwesomeIcon icon={showCategories ? faChevronDown : faChevronRight} />
                  <SubtitleText>Umiejętności</SubtitleText>
                </FilterDropDownContainer>
                {showCategories && <>{categoryOptions}</>}
                <FilterDropDownContainer onClick={handleLevelVisibleClick}>
                  <FontAwesomeIcon icon={showLevels ? faChevronDown : faChevronRight} />
                  <SubtitleText>Poziom</SubtitleText>
                </FilterDropDownContainer>
                {showLevels && <>{levelOptions}</>}
              </ModalScroll>
            </FilterModalWrapper>
          </ModalBackground>
        )}
      </>
    );
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const CommissionElement = (props) => {
    return (
      <CommissionLabel onClick={() => CModalOpen(props)}>
        <CommissionTop>
          <CommissionTitleContainer>
            <CommissionTitle>{props.title}</CommissionTitle>
            {props.level && <LevelBubble>{props.level}</LevelBubble>}
          </CommissionTitleContainer>
          <StakeText>{props.rate} PLN</StakeText>
        </CommissionTop>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '0.4rem 0',
            alignItems: 'center',
          }}
        >
          <FiBriefcase size={18} style={{ color: gray1 }} />
          <CommissionText>{props.name}</CommissionText>
          {props.location.length > 0 && (
            <>
              <FiMapPin size={18} style={{ color: gray1 }} />
              <CommissionText>
                {props.location.length === 1 ? props.location[0] : props.location[0] + '+'}
              </CommissionText>
            </>
          )}
          <FiClock size={18} style={{ color: gray1 }} />
          <CommissionText>{props.deadline}</CommissionText>
        </div>
        <CommissionBottom>
          {props.tags.map((tag, indexT) => (
            <CommissionBubble key={indexT}>{tag}</CommissionBubble>
          ))}
        </CommissionBottom>
      </CommissionLabel>
    );
  };

  const filteredCommissions = useMemo(() => {
    if (!filtered || !filtered.content) {
      return null;
    }

    const countWithoutContractor = filtered.content.reduce((count, filter) => {
      if (!filter.contractor_username) {
        return count + 1;
      }
      return count;
    }, 0);

    if (countWithoutContractor === 0) {
      return <BlankCard style={{ margin: '0 0 0 1rem' }}>Brak zleceń do wyświetlenia</BlankCard>;
    } else {
      return filtered.content.map((filter, indexF) => {
        const {
          company_name,
          contractor_username,
          title,
          rate,
          description,
          deadline,
          level,
          location,
          tags,
          skills,
          languages,
          client_username,
        } = filter;

        if (
          !contractor_username &&
          (company_name.toLowerCase().includes(searchText.toLowerCase()) ||
            client_username.toLowerCase().includes(searchText.toLowerCase()) ||
            title.toLowerCase().includes(searchText.toLowerCase()) ||
            searchText === '')
        ) {
          return (
            <CommissionElement
              key={indexF}
              avatar="/assets/cards/person1.jpg"
              name={company_name}
              title={title}
              rate={rate}
              description={description}
              deadline={deadline}
              level={getSelectedLevel(level)}
              location={location}
              tags={tags}
              categories={skills}
              languages={languages}
              username={client_username}
            />
          );
        }
        return null;
      });
    }
  }, [filtered.content, searchText]);

  const CommissionModal = ({ showCModal }) => {
    const handleCompanyNavigation = () => {
      navigate(`/other-company/${modalData.username}`, {
        state: {
          argument: modalData.username,
        },
      });
    };

    return (
      <>
        {showCModal && (
          <ModalCommissionBackground onClick={CModalClose}>
            <ModalCommissionWrapper onClick={handleWrapperClick}>
              <ModalTitle>{modalData.title}</ModalTitle>
              <ModalInfo>{modalData.description}</ModalInfo>
              <CommissionLineForm />
              <ModalBottomSection>
                <ModalColumn>
                  <ModalRow>
                    <ModalInfo>Stawka:</ModalInfo>
                    <ModalData style={{ color: darkLight }}>{modalData.rate} PLN</ModalData>
                  </ModalRow>
                  <ModalRow>
                    <ModalInfo>Czas wykonania:</ModalInfo>
                    <ModalData>{modalData.deadline}</ModalData>
                  </ModalRow>
                  <ModalRow>
                    <ModalInfo>Poziom zaawansowania:</ModalInfo>
                    <ModalData>{modalData.level ? modalData.level : 'brak'}</ModalData>
                  </ModalRow>
                  <ModalInfo>Lokalizacja:</ModalInfo>
                  <ModalData>
                    {modalData.location.length > 0
                      ? modalData.location.map((loc, index) => (index !== 0 ? ' / ' + loc : loc))
                      : 'brak'}
                  </ModalData>
                  <ModalRow>
                    <ModalInfo>Firma:</ModalInfo>
                    <ModalData>{modalData.name}</ModalData>
                  </ModalRow>
                  <CommissionLineForm />
                </ModalColumn>
                <ModalColumn>
                  <ModalInfo>Wymagane umiejętności:</ModalInfo>
                  <ModalBubbleContainer>
                    {modalData.categories.length > 0 ? (
                      modalData.categories.map((category, index) => (
                        <CommissionBubble key={index}>{category}</CommissionBubble>
                      ))
                    ) : (
                      <ModalData>brak</ModalData>
                    )}
                  </ModalBubbleContainer>
                  <CommissionLineForm />
                  <ModalInfo>Wymagane języki:</ModalInfo>
                  <ModalBubbleContainer>
                    {modalData.languages.length ? (
                      modalData.languages.map((language, index) => (
                        <CommissionBubble key={index}>{language}</CommissionBubble>
                      ))
                    ) : (
                      <ModalData>brak</ModalData>
                    )}
                  </ModalBubbleContainer>
                  <CommissionLineForm />
                  <ModalInfo>Tagi:</ModalInfo>
                  <ModalBubbleContainer>
                    {modalData.tags.length ? (
                      modalData.tags.map((tag, index) => <CommissionBubble key={index}>{tag}</CommissionBubble>)
                    ) : (
                      <ModalData>brak</ModalData>
                    )}
                  </ModalBubbleContainer>
                </ModalColumn>
              </ModalBottomSection>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'end',
                }}
              ></div>
            </ModalCommissionWrapper>
            <VisitCompanyButton onClick={handleCompanyNavigation}>Odwiedź firmę</VisitCompanyButton>
          </ModalCommissionBackground>
        )}
      </>
    );
  };

  return (
    <>
      <Cards2>
        <FilterLabel>
          <TitleText>Filtruj</TitleText>
          <FilterWrapper>
            <ClearButton onClick={clearFilters}>Wyczyść filtry</ClearButton>
            <FilterScroll>
              <FilterDropDownContainer onClick={handleCityVisibleClick}>
                <FontAwesomeIcon icon={showCities ? faChevronDown : faChevronRight} />
                <SubtitleText>Skąd?</SubtitleText>
              </FilterDropDownContainer>
              {showCities && <>{cityOptions}</>}
              <FilterDropDownContainer onClick={handleLanguageVisibleClick}>
                <FontAwesomeIcon icon={showLanguages ? faChevronDown : faChevronRight} />
                <SubtitleText>Języki</SubtitleText>
              </FilterDropDownContainer>
              {showLanguages && <>{languageOptions}</>}
              <FilterDropDownContainer onClick={handleTagVisibleClick}>
                <FontAwesomeIcon icon={showTags ? faChevronDown : faChevronRight} />
                <SubtitleText>Tagi</SubtitleText>
              </FilterDropDownContainer>
              {showTags && <>{tagOptions}</>}
              <FilterDropDownContainer onClick={handleCategoryVisibleClick}>
                <FontAwesomeIcon icon={showCategories ? faChevronDown : faChevronRight} />
                <SubtitleText>Umiejętności</SubtitleText>
              </FilterDropDownContainer>
              {showCategories && <>{categoryOptions}</>}
              <FilterDropDownContainer onClick={handleLevelVisibleClick}>
                <FontAwesomeIcon icon={showLevels ? faChevronDown : faChevronRight} />
                <SubtitleText>Poziom</SubtitleText>
              </FilterDropDownContainer>
              {showLevels && <>{levelOptions}</>}
            </FilterScroll>
          </FilterWrapper>
        </FilterLabel>
        <RightLabel>
          <TopSection>
            <FilterButton onClick={FModalOpen}>Filtruj</FilterButton>
            {/* <StyledSelect>
                <StyledOption value="">Sortuj po...</StyledOption>
                <StyledOption value="1">najlepsza ocena</StyledOption>
                <StyledOption value="2">najwięcej prac</StyledOption>
                <StyledOption value="3">ostatnia aktywność</StyledOption>
              </StyledSelect> */}
            <Input
              style={{ width: '16rem' }}
              type="text"
              value={searchText}
              onChange={handleInputChange}
              placeholder="Wyszukaj tytuł i nazwę firmy"
            />
          </TopSection>
          {filtered ? (
            <CommissionWrapper>
              {!filtered.empty ? (
                filteredCommissions
              ) : (
                <BlankCard style={{ margin: '0 0 0 1rem' }}>Brak zleceń do wyświetlenia</BlankCard>
              )}
            </CommissionWrapper>
          ) : (
            <LoadingPage />
          )}
          <FilterModal showFModal={showFModal} onCloseFModal={FModalClose} />
          <CommissionModal showCModal={showCModal} />
        </RightLabel>
      </Cards2>
    </>
  );
};

export default Commissions;
