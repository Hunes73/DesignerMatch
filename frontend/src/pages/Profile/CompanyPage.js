import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TitleText } from '../Home/CardsElement';
import { COLORS } from '../../components/Colors';
import sessionStoreCleaner from '../../components/sessionStoreCleaner';
import axios from '../../api/axios';
import {
  AboutMe,
  AddCommissionButton,
  BoldLabel,
  Bracket,
  Bubble,
  BubbleLinks,
  BubbleWrap,
  BubblesDropDown,
  Button,
  DataText,
  DownSection,
  Image,
  InfoRow,
  InfoText,
  Left,
  LeftColumn,
  LeftInfoRow,
  LeftWrapper,
  LineForm,
  LongDataText,
  ModalBackground,
  ModalBottomSection,
  ModalBubbleContainer,
  ModalColumn,
  ModalData,
  ModalInfo,
  ModalRow,
  ModalTitle,
  ModalWrapper,
  NameText,
  ProfileImage,
  ProfileWrapper,
  RightColumn,
  RightWrapper,
  StyledDropDown,
  TopSection,
} from './ProfileElements';
import {
  AboutInput,
  CommissionBottom,
  CommissionBubble,
  CommissionCard,
  CommissionEditBubble,
  CommissionText,
  CommissionTitle,
  CommissionTitleContainer,
  CommissionTop,
  DateInput,
  LevelBubble,
  ModalEditRow,
  NumberInput,
  SmallCommissionBubble,
  StakeText,
  TitleInput,
} from '../Home/CommissionsElements';
import LoadingPage from '../LoadingPage';
import { FiBriefcase, FiClock, FiMapPin, FiUser } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const { darkLight, gray1, secondary } = COLORS;

const levelOptions = ['Junior', 'Junior+', 'Mid', 'Mid+', 'Senior'];

const CompanyPage = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [get, setGet] = useState('');
  const [CommissionsData, setCommissionsData] = useState([]);
  const [username, setUsername] = useState('');

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

  function handleLevels(level) {
    if (level === 'Junior+') {
      return ['Junior', 'Mid', 'Senior'];
    } else if (level === 'Mid+') {
      return ['Mid', 'Senior'];
    } else {
      return [level];
    }
  }

  const maxChars = 255;

  const citiesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/public/api/filter/getAvailableCities',
      headers: {},
    }),
    [],
  );

  const tagsData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/public/api/filter/getAvailableTags',
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

  const levelsData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/public/api/filter/getAvailableLevels',
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
    sessionStoreCleaner.checkAndRemoveSessionStorage();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodeResponse = await axios.request('/auth/decodeToken', {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
            'Content-Type': 'application/json',
          },
        });

        const companyResponse = await axios.request({
          url: '/public/api/company/getProfileByUsername/' + decodeResponse.data.username,
          headers: {
            accept: 'application/json',
          },
        });

        const commissionResponse = await axios.request({
          url: '/public/api/commission/getAllCommissionFirmByUsername/' + decodeResponse.data.username,
          headers: { accept: 'application/json' },
        });

        const [citiesResponse, tagsResponse, categoriesResponse, languagesResponse, levelsResponse] = await Promise.all(
          [
            axios.request(citiesData),
            axios.request(tagsData),
            axios.request(categoriesData),
            axios.request(languagesData),
            axios.request(levelsData),
          ],
        );
        setUsername(decodeResponse.data.username);
        setCommissionsData(commissionResponse.data);
        setGet(companyResponse.data);
        setCities(citiesResponse.data);
        setTags(tagsResponse.data);
        setLevels(levelsResponse.data);
        setLanguages(languagesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [showModal, showModalEdit, citiesData, tagsData, categoriesData, languagesData, levelsData]);

  const openModalEditClick = () => {
    setShowModalEdit(true);
  };

  const closeModalEditClick = () => {
    setShowModalEdit(false);
  };

  const openModalClick = (data) => {
    setModalData(data);
    setShowModal(true);
  };

  const closeModalClick = () => {
    setShowModal(false);
  };

  const handleWrapperClick = (event) => {
    event.stopPropagation();
  };

  const ModalEdit = ({ showModalEdit }) => {
    const [modalEditData, setModalEditData] = useState({
      client_username: username,
      title: '',
      description: '',
      deadline: '',
      level: [],
      rate: 0,
      location: [],
      tags: [],
      skills: [],
      languages: [],
    });

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [skillsT, setSkillsT] = useState([]);
    const [languagesT, setLanguagesT] = useState(languages);
    const [tagsT, setTagsT] = useState(tags);
    const [locationT, setLocationT] = useState(cities);
    const [levelT, setLevelT] = useState(levels);

    useEffect(() => {
      if (categories && categories.categories && Array.isArray(categories.categories)) {
        const updatedSkills = categories.categories.flatMap((category) =>
          category.skills.map((subcategory) => ({
            value: subcategory,
            label: subcategory,
          })),
        );
        setSkillsT(updatedSkills);
      }
    }, []);

    useEffect(() => {
      const deadline = `${day}/${month}/${year}`;
      setModalEditData({ ...modalEditData, deadline: deadline });
    }, [day, month, year]);

    const handleAddCommission = useCallback(async () => {
      try {
        if (modalEditData.title && modalEditData.description && modalEditData.rate) {
          modalEditData.level = handleLevels(modalEditData.level);
          const response = await axios.post(`/api/commission/create`, modalEditData, {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
              'Content-Type': 'application/json',
            },
          });
          setShowModalEdit(false);
        } else {
          alert('Pola tytułu, opisu, stawki i czasu wykonania powinny być wypełnione.');
        }
      } catch (err) {
        console.error('Error while saving data:', err);
      }
    }, [modalEditData]);

    return (
      <>
        {showModalEdit && (
          <ModalBackground>
            <ModalWrapper onClick={handleWrapperClick}>
              <ModalInfo>Tytuł zlecenia:</ModalInfo>
              <TitleInput
                maxLength={maxChars}
                value={modalEditData.title}
                onChange={({ target }) => setModalEditData({ ...modalEditData, title: target.value })}
              />
              <ModalInfo>Opis:</ModalInfo>
              <AboutInput
                maxLength={maxChars}
                value={modalEditData.description}
                onChange={({ target }) => setModalEditData({ ...modalEditData, description: target.value })}
              />
              {modalEditData.description && (
                <Bracket>
                  ({Math.min(modalEditData.description.length, maxChars)}/{maxChars})
                </Bracket>
              )}
              <LineForm />
              <ModalBottomSection>
                <ModalColumn>
                  <ModalEditRow>
                    <ModalInfo>Stawka:</ModalInfo>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}
                    >
                      <NumberInput
                        type="number"
                        maxLength={16}
                        value={modalEditData.rate}
                        onChange={({ target }) => {
                          const rate = parseInt(target.value);
                          if (rate >= 0) {
                            setModalEditData({ ...modalEditData, rate });
                          }
                        }}
                      />
                      <ModalData style={{ color: darkLight }}>PLN</ModalData>
                    </div>
                  </ModalEditRow>
                  <ModalEditRow>
                    <ModalInfo>Czas wykonania:</ModalInfo>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <DateInput
                        placeholder="DD"
                        maxLength={2}
                        value={day}
                        onChange={({ target }) => {
                          const rate = parseInt(target.value);
                          if (rate >= 0) {
                            setDay(target.value);
                          }
                        }}
                      />
                      <ModalData style={{ margin: '0 0.5rem' }}>/</ModalData>
                      <DateInput
                        placeholder="MM"
                        maxLength={2}
                        value={month}
                        onChange={({ target }) => {
                          const rate = parseInt(target.value);
                          if (rate >= 0) {
                            setMonth(target.value);
                          }
                        }}
                      />
                      <ModalData style={{ margin: '0 0.5rem' }}>/</ModalData>
                      <DateInput
                        style={{ width: '5.5rem' }}
                        placeholder="RRRR"
                        maxLength={4}
                        value={year}
                        onChange={({ target }) => {
                          const rate = parseInt(target.value);
                          if (rate >= 0) {
                            setYear(target.value);
                          }
                        }}
                      />
                    </div>
                  </ModalEditRow>
                  <ModalEditRow>
                    <ModalInfo>Poziom zaawansowania:</ModalInfo>
                    <BubblesDropDown
                      options={levelOptions}
                      value={modalEditData.level}
                      placeholder={modalEditData.level}
                      onChange={(e) => {
                        setModalEditData({ ...modalEditData, level: e.value });
                      }}
                    />
                  </ModalEditRow>
                  {}
                  <ModalEditRow>
                    <ModalInfo>Lokalizacja:</ModalInfo>
                    <BubblesDropDown
                      options={locationT}
                      value={modalEditData.location}
                      placeHolder={modalEditData.location}
                      onChange={(e) => {
                        const selectedLocation = e.value;
                        setLocationT((prevLocation) => prevLocation.filter((loc) => loc !== selectedLocation));
                        setModalEditData((prevData) => ({
                          ...prevData,
                          location: [...prevData.location, selectedLocation],
                        }));
                      }}
                    />
                  </ModalEditRow>
                  <ModalBubbleContainer>
                    {Array.isArray(modalEditData.location) &&
                      modalEditData.location.map((loc, index) => (
                        <CommissionEditBubble
                          key={index}
                          onClick={() => {
                            setLocationT((prevLocation) => [...prevLocation, loc]);
                            setModalEditData((prevData) => ({
                              ...prevData,
                              location: prevData.location.filter((s) => s !== loc),
                            }));
                          }}
                        >
                          {loc}
                        </CommissionEditBubble>
                      ))}
                  </ModalBubbleContainer>
                  <LineForm />
                </ModalColumn>
                <ModalColumn>
                  <ModalEditRow>
                    <ModalInfo>Wymagane umiejętności:</ModalInfo>
                    <BubblesDropDown
                      options={skillsT}
                      value={modalEditData.skills}
                      placeholder="Wybierz"
                      onChange={(e) => {
                        const selectedSkill = e.value;
                        setSkillsT((prevSkills) => prevSkills.filter((ski) => ski.value !== selectedSkill));
                        setModalEditData((prevData) => ({
                          ...prevData,
                          skills: [...prevData.skills, selectedSkill],
                        }));
                      }}
                    />
                  </ModalEditRow>
                  <ModalBubbleContainer>
                    {Array.isArray(modalEditData.skills) &&
                      modalEditData.skills.map((skill, index) => (
                        <CommissionEditBubble
                          key={index}
                          onClick={() => {
                            setSkillsT((prevSkills) => [...prevSkills, skill]);
                            setModalEditData((prevData) => ({
                              ...prevData,
                              skills: prevData.skills.filter((s) => s !== skill),
                            }));
                          }}
                        >
                          {skill} <FaTimes />
                        </CommissionEditBubble>
                      ))}
                  </ModalBubbleContainer>
                  <LineForm />
                  <ModalEditRow>
                    <ModalInfo>Wymagane języki:</ModalInfo>
                    <BubblesDropDown
                      options={languagesT}
                      value={modalEditData.languages}
                      placeHolder={modalEditData.languages}
                      onChange={(e) => {
                        const selectedLanguage = e.value;
                        setLanguagesT((prevLanguages) => prevLanguages.filter((lang) => lang !== selectedLanguage));
                        setModalEditData((prevData) => ({
                          ...prevData,
                          languages: [...prevData.languages, selectedLanguage],
                        }));
                      }}
                    />
                  </ModalEditRow>
                  <ModalBubbleContainer>
                    {Array.isArray(modalEditData.languages) &&
                      modalEditData.languages.map((language, index) => (
                        <CommissionEditBubble
                          key={index}
                          onClick={() => {
                            setLanguagesT((prevLanguages) => [...prevLanguages, language]);
                            setModalEditData((prevData) => ({
                              ...prevData,
                              languages: prevData.languages.filter((s) => s !== language),
                            }));
                          }}
                        >
                          {language}
                        </CommissionEditBubble>
                      ))}
                  </ModalBubbleContainer>
                  <LineForm />
                  <ModalEditRow>
                    <ModalInfo>Tagi:</ModalInfo>
                    <BubblesDropDown
                      options={tagsT}
                      value={modalEditData.tags}
                      placeHolder={modalEditData.tags}
                      onChange={(e) => {
                        const selectedTag = e.value;
                        setTagsT((prevTags) => prevTags.filter((ta) => ta !== selectedTag));
                        setModalEditData((prevData) => ({
                          ...prevData,
                          tags: [...prevData.tags, selectedTag],
                        }));
                      }}
                    />
                  </ModalEditRow>
                  <ModalBubbleContainer>
                    {Array.isArray(modalEditData.tags) &&
                      modalEditData.tags.map((tag, index) => (
                        <CommissionEditBubble
                          key={index}
                          onClick={() => {
                            setTagsT((prevTags) => [...prevTags, tag]);
                            setModalEditData((prevData) => ({
                              ...prevData,
                              tags: prevData.tags.filter((s) => s !== tag),
                            }));
                          }}
                        >
                          {tag}
                        </CommissionEditBubble>
                      ))}
                  </ModalBubbleContainer>
                  <LineForm />
                </ModalColumn>
              </ModalBottomSection>
            </ModalWrapper>
            <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
              <AddCommissionButton onClick={handleAddCommission}>Dodaj zlecenie</AddCommissionButton>
              <AddCommissionButton style={{ background: secondary }} onClick={closeModalEditClick}>
                Anuluj
              </AddCommissionButton>
            </div>
          </ModalBackground>
        )}
      </>
    );
  };

  const Modal = ({ showModal }) => {
    const handleDeleteCommission = useCallback(async () => {
      console.log(modalData.id);
      try {
        const response = await axios.delete(`/api/deleteCommission/` + modalData.id, {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
            'Content-Type': 'application/json',
          },
        });
        console.log('Data saved successfully!');
        console.log(response.data);
      } catch (err) {
        console.error('Error while saving data:', err);
      }
      setShowModal(false);
    });

    const handleGoProfile = (nick) => {
      navigate(`/other-account/${nick}`, {
        state: {
          argument: nick,
        },
      });
    };

    return (
      <>
        {showModal && (
          <ModalBackground onClick={closeModalClick}>
            <ModalWrapper onClick={handleWrapperClick}>
              <ModalTitle>{modalData.title}</ModalTitle>
              <ModalInfo>{modalData.description}</ModalInfo>
              <LineForm />
              <ModalBottomSection>
                <ModalColumn>
                  <ModalRow>
                    <ModalInfo>Zleceniobiorca:</ModalInfo>
                    <ModalData style={{ color: darkLight }}>
                      {modalData.contractor_username ? (
                        <text
                          onClick={() => handleGoProfile(modalData.contractor_username)}
                          style={{ cursor: 'pointer' }}
                        >
                          {modalData.contractor_username}
                        </text>
                      ) : (
                        'brak'
                      )}
                    </ModalData>
                  </ModalRow>
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
                    <ModalData>{modalData.level}</ModalData>
                  </ModalRow>
                  <ModalInfo>Lokalizacja:</ModalInfo>
                  <ModalData>{modalData.location.map((loc, index) => (index !== 0 ? ' / ' + loc : loc))}</ModalData>
                  <LineForm />
                </ModalColumn>
                <ModalColumn>
                  <ModalInfo>Wymagane umiejętności:</ModalInfo>
                  <ModalBubbleContainer>
                    {modalData.skills.map((category, index) => (
                      <CommissionBubble key={index}>{category}</CommissionBubble>
                    ))}
                  </ModalBubbleContainer>
                  <LineForm />
                  <ModalInfo>Wymagane języki:</ModalInfo>
                  <ModalBubbleContainer>
                    {modalData.languages.map((language, index) => (
                      <CommissionBubble key={index}>{language}</CommissionBubble>
                    ))}
                  </ModalBubbleContainer>
                  <LineForm />
                  <ModalInfo>Tagi:</ModalInfo>
                  <ModalBubbleContainer>
                    {modalData.tags.map((tag, index) => (
                      <CommissionBubble key={index}>{tag}</CommissionBubble>
                    ))}
                  </ModalBubbleContainer>
                </ModalColumn>
              </ModalBottomSection>
            </ModalWrapper>
            <AddCommissionButton onClick={handleDeleteCommission}>Usuń zlecenie</AddCommissionButton>
          </ModalBackground>
        )}
      </>
    );
  };

  const CommissionElement = (props) => {
    return (
      <CommissionCard onClick={() => openModalClick(props)}>
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
          {props.contractor_username && (
            <>
              <FiUser size={18} style={{ color: gray1 }} />
              <CommissionText>{props.contractor_username}</CommissionText>
            </>
          )}
        </div>
        <CommissionBottom>
          {props.tags.map((tag, indexT) => (
            <SmallCommissionBubble key={indexT}>{tag}</SmallCommissionBubble>
          ))}
        </CommissionBottom>
      </CommissionCard>
    );
  };

  return (
    <>
      {get ? (
        <ProfileWrapper>
          <TopSection>
            <LeftWrapper>
              <ProfileImage>
                <Image
                  src={'/public/api/company/getProfileImageByUsername/' + get.username}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/cards/defaultavatar.png';
                  }}
                  alt="Profile"
                />
              </ProfileImage>
              <NameText>{get.name}</NameText>
              <LineForm />
              <Button onClick={() => openModalEditClick()}>Dodaj zlecenie</Button>
            </LeftWrapper>
            <RightWrapper>
              <BoldLabel>O firmie:</BoldLabel>
              <AboutMe>{get.description ? get.description : 'brak opisu'}</AboutMe>
              <Left>
                <LineForm />
                <InfoRow>
                  {(get.website || get.linkedin || get.facebook || get.instagram || get.twitter) && (
                    <LeftColumn>
                      <InfoText>Media społecznościowe:</InfoText>
                      <BubbleWrap>
                        {get.website && <BubbleLinks href={get.website}>strona firmy</BubbleLinks>}
                        {get.linkedin && <BubbleLinks href={get.linkedin}>linkedin</BubbleLinks>}
                        {get.facebook && <BubbleLinks href={get.facebook}>facebook</BubbleLinks>}
                        {get.instagram && <BubbleLinks href={get.instagram}>instagram</BubbleLinks>}
                        {get.twitter && <BubbleLinks href={get.twitter}>twitter</BubbleLinks>}
                      </BubbleWrap>
                    </LeftColumn>
                  )}
                  <RightColumn>
                    <LeftInfoRow>
                      <InfoText>Adres:</InfoText>
                      <LongDataText>{get.address ? get.address : 'brak'}</LongDataText>
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>NIP:</InfoText>
                      <DataText>{get.nip}</DataText>
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>REGON:</InfoText>
                      <DataText>{get.regon}</DataText>
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>KRS:</InfoText>
                      <DataText>{get.krs ? get.krs : 'brak'}</DataText>
                    </LeftInfoRow>
                  </RightColumn>
                </InfoRow>
              </Left>
            </RightWrapper>
          </TopSection>
          <DownSection>
            <TitleText style={{ width: '100%', textAlign: 'center' }}>Zlecenia</TitleText>
            {CommissionsData.length > 0 ? (
              CommissionsData.map((com, indexC) => (
                <CommissionElement
                  key={indexC}
                  title={com.title}
                  description={com.description}
                  rate={com.rate}
                  deadline={com.deadline}
                  level={getSelectedLevel(com.level)}
                  location={com.location}
                  languages={com.languages}
                  tags={com.tags}
                  skills={com.skills}
                  contractor_username={com.contractor_username}
                  id={com.id}
                />
              ))
            ) : (
              <CommissionCard style={{ alignItems: 'center', cursor: 'default' }}>
                <text style={{ color: gray1, fontSize: '1.2rem' }}>Firma nie posiada obecnie żadnych zleceń</text>
              </CommissionCard>
            )}
          </DownSection>
          <ModalEdit showModalEdit={showModalEdit} />
          <Modal showModal={showModal} data={modalData} />
        </ProfileWrapper>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default CompanyPage;
