import React, { useEffect, useState } from 'react';
import CardItem from './CardItem';
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
  CardsWrapper,
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
  CheckBoxContainter,
  FilterModalWrapper,
  CardLabel,
  BlankCard,
  Input,
} from './CardsElement';
import axios from '../../api/axios';
import { useMemo } from 'react';
import LoadingPage from '../LoadingPage';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS } from '../../components/Colors';

const { darkLight } = COLORS;

const Cards = () => {
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
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

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
            '/public/api/artist/filter',
            {
              levels: levelsFilter,
              locations: citiesFilter,
              skills: categoriesFilter,
              languages: languagesFilter,
              tags: tagsFilter,
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
        <CheckBoxContainter>
          <CheckBox type="checkbox" id={city} checked={citiesFilter.includes(city)} onChange={handleCityChange} />
          <CheckBoxLabel htmlFor={city} />
        </CheckBoxContainter>
        <CheckBoxText>{city}</CheckBoxText>
      </CheckBoxWrapper>
    ));
  });

  const languageOptions = useMemo(() => {
    return languages.map((language, index) => (
      <CheckBoxWrapper key={index}>
        <CheckBoxContainter>
          <CheckBox
            type="checkbox"
            id={language}
            checked={languagesFilter.includes(language)}
            onChange={handleLanguageChange}
          />
          <CheckBoxLabel htmlFor={language} />
        </CheckBoxContainter>
        <CheckBoxText>{language}</CheckBoxText>
      </CheckBoxWrapper>
    ));
  });

  const tagOptions = useMemo(() => {
    return tags.map((tag, index) => (
      <CheckBoxWrapper key={index}>
        <CheckBoxContainter>
          <CheckBox type="checkbox" id={tag} checked={tagsFilter.includes(tag)} onChange={handleTagChange} />
          <CheckBoxLabel htmlFor={tag} />
        </CheckBoxContainter>
        <CheckBoxText>{tag}</CheckBoxText>
      </CheckBoxWrapper>
    ));
  });

  const levelOptions = useMemo(() => {
    return levels.map((level, index) => (
      <CheckBoxWrapper key={index}>
        <CheckBoxContainter>
          <CheckBox type="checkbox" id={level} checked={levelsFilter.includes(level)} onChange={handleLevelChange} />
          <CheckBoxLabel htmlFor={level} />
        </CheckBoxContainter>
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
            <CheckBoxContainter>
              <CheckBox
                type="checkbox"
                id={subcategory}
                checked={categoriesFilter.includes(subcategory)}
                onChange={handleCategoryChange}
              />
              <CheckBoxLabel htmlFor={subcategory} />
            </CheckBoxContainter>
            <CheckBoxText>{subcategory}</CheckBoxText>
          </CheckBoxWrapper>
        ))}
      </CategoryWrapper>
    ));
  });

  const filteredCards = useMemo(() => {
    if (!Array.isArray(filtered.content)) {
      return null;
    }

    const sortedContent = filtered.content
      .filter((filter) => {
        const { firstname, lastname, username } = filter;
        const lowerCaseSearchText = searchText.toLowerCase();
        return (
          firstname.toLowerCase().includes(lowerCaseSearchText) ||
          lastname.toLowerCase().includes(lowerCaseSearchText) ||
          username.toLowerCase().includes(lowerCaseSearchText) ||
          searchText === ''
        );
      })
      .sort((a, b) => {
        const lastnameA = a.lastname.toLowerCase();
        const lastnameB = b.lastname.toLowerCase();
        if (lastnameA < lastnameB) {
          return -1;
        }
        if (lastnameA > lastnameB) {
          return 1;
        }
        return 0;
      });

    return sortedContent.map((filter, indexF) => {
      const { firstname, lastname, username, level, city, skills } = filter;
      return (
        <CardItem
          onRefresh={handleRefresh}
          key={indexF}
          name={firstname}
          surname={lastname}
          username={username}
          level={level}
          rating={3.5}
          ratingCount={12}
          city={city}
          skills={skills}
          project1="/assets/cards/design1.jpg"
          project2="/assets/cards/design2.png"
          project3="/assets/cards/design3.jpg"
          project4="/assets/cards/design4.png"
        />
      );
    });
  }, [filtered.content, searchText]);

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

  const handleFilterClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleWrapperClick = (event) => {
    event.stopPropagation();
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const Modal = ({ showModal, onCloseModal }) => {
    return (
      <>
        {showModal && (
          <ModalBackground onClick={onCloseModal}>
            <FilterModalWrapper onClick={handleWrapperClick}>
              <ModalIconContainer onClick={onCloseModal}>
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
            <FilterButton onClick={handleFilterClick}>Filtruj</FilterButton>
            {/* <StyledSelect>
                <StyledOption value="">Sortuj po...</StyledOption>
                <StyledOption value="1">najlepsza ocena</StyledOption>
                <StyledOption value="2">najwięcej prac</StyledOption>
                <StyledOption value="3">ostatnia aktywność</StyledOption>
              </StyledSelect> */}
            <Input type="text" value={searchText} onChange={handleInputChange} placeholder="Wyszukaj imię i nazwisko" />
          </TopSection>
          {filtered ? (
            <CardsWrapper>
              {!filtered.empty ? filteredCards : <BlankCard>Brak artystów do wyświetlenia</BlankCard>}
            </CardsWrapper>
          ) : (
            <LoadingPage />
          )}

          <Modal showModal={showModal} onCloseModal={handleCloseModal} />
        </RightLabel>
      </Cards2>
    </>
  );
};

export default Cards;
