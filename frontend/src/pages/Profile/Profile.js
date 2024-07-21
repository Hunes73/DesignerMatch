import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Rating } from 'react-simple-star-rating';
import { default as axios } from '../../api/axios';
import sessionStoreCleaner from '../../components/sessionStoreCleaner';
import LoadingPage from '../LoadingPage';
import {
  AboutInput,
  AboutMe,
  BoldLabel,
  BottomSection,
  BottomWrapper,
  Bracket,
  Bubble,
  BubbleLinks,
  BubbleWrap,
  Button,
  DataText,
  HeaderText,
  Image,
  InfoRow,
  InfoText,
  JobText,
  Left,
  LeftColumn,
  LeftInfoRow,
  LeftWrapper,
  LineForm,
  LongDataText,
  ModalBackground,
  ModalInfo,
  ModalWrapper,
  NameText,
  ProfileImage,
  ProfileWrapper,
  RatingText,
  RatingWrapper,
  RightColumn,
  RightWrapper,
  SmallButton,
  TopSection,
} from './ProfileElements';
import { TitleText } from '../Home/CardsElement';
import Portfolio from './Portfolio';
import { TitleInput } from '../Home/CommissionsElements';

const FirstScreen = 1954; //wyświetlić (15opini niżej)
const SecondScreen = 1000;
const getArtistProfileURL = process.env.REACT_APP_GET_ARTIST_PROFILE;
const getUserURL = process.env.REACT_APP_GET_USER;
const getShortArtistProfileURL = process.env.REACT_APP_GET_SHORT_ARTIST_PROFILE;

//UserName/UserInfo/MessageButton
const UserPage = () => {
  const [get, setGet] = useState('');
  const [checkLoading, setCheckLoading] = useState(false);
  const [shortProfile, setShortProfile] = useState('');
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [rating, setRating] = useState(0); //rating wyslac do bazy jako ocenę
  const [button, setButton] = useState(true);
  const [username, setUsername] = useState('');
  const [showModalEdit, setShowModalEdit] = useState(false);
  const fileInputRef = useRef(null);
  const [refreshPortfolio, setRefreshPortfolio] = useState(false);

  const handleRefreshPortfolio = () => {
    setRefreshPortfolio((prevState) => !prevState);
  };

  useEffect(() => {
    sessionStoreCleaner.checkAndRemoveSessionStorage();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodeResult = await axios.request('/auth/decodeToken', {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
          },
        });

        const userResult = await axios.request({
          url: '/public/api/artist/getArtistProfileByUsername/' + decodeResult.data.username,
        });

        setUsername(decodeResult.data.username);
        setGet(userResult.data);
        setCheckLoading(userResult);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [showModalEdit]);

  useEffect(() => {
    if (get) {
      clear();
      for (let i = 0; i < get.education.length; i++) {
        handleAddEducationElement(
          i,
          get.education[i].school_name,
          get.education[i].faculty,
          get.education[i].field_of_study,
          get.education[i].degree,
          get.education[i].start_date,
          get.education[i].end_date,
          get.education[i].description,
        );
      }
      for (let i = 0; i < get.experience.length; i++) {
        handleAddExperienceElement(
          i,
          get.experience[i].company,
          get.experience[i].city,
          get.experience[i].position,
          get.experience[i].description,
          get.experience[i].start_date,
          get.experience[i].end_date,
        );
      }
    }
  }, [get]);

  const handleAddEducationElement = (
    newId,
    schoolName,
    faculty,
    fieldOfStudy,
    degree,
    startDate,
    endDate,
    description,
  ) => {
    setEducationList((prevList) => [
      ...prevList,
      {
        id: newId,
        school_name: schoolName,
        faculty: faculty,
        field_of_study: fieldOfStudy,
        degree: degree,
        start_date: startDate,
        end_date: endDate,
        description: description,
      },
    ]);
  };

  function handleAddExperienceElement(id, company, city, position, description, start_date, end_date) {
    setExperienceList((experienceList) => [
      ...experienceList,
      {
        id: id,
        company: company,
        city: city,
        position: position,
        description: description,
        start_date: start_date,
        end_date: end_date,
      },
    ]);
  }

  function clear() {
    handleClearEducationList();
    handleClearExperienceList();
  }

  function handleClearEducationList() {
    setEducationList([]);
  }

  function handleClearExperienceList() {
    setExperienceList([]);
  }

  function ListEducation() {
    const list = educationList.map((item, index) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }} key={item.id}>
          {index !== 0 && <LineForm />}
          {index === 0 && <HeaderText style={{ marginBottom: '1.5rem' }}>Wykształcenie</HeaderText>}
          <LeftInfoRow>
            <InfoText>Uczelnia:</InfoText>
            <LongDataText>{item.school_name}</LongDataText>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Kierunek:</InfoText>
            <LongDataText>{item.faculty}</LongDataText>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Dziedzina nauk: </InfoText>
            <LongDataText>{item.field_of_study ? item.field_of_study : 'brak'}</LongDataText>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Stopień: </InfoText>
            <LongDataText>{item.degree}</LongDataText>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Od: </InfoText>
            <LongDataText>{item.start_date}</LongDataText>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Do: </InfoText>
            <LongDataText>{item.end_date}</LongDataText>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Opis: </InfoText>
            <LongDataText>{item.description}</LongDataText>
          </LeftInfoRow>
        </div>
      );
    });

    return <>{list}</>;
  }

  function ListLinks() {
    return (
      <>
        {(get.facebook || get.instagram || get.linkedin || get.pinterest || get.twitter || get.website) && (
          <>
            <LineForm />
            <InfoText>Media społecznościowe:</InfoText>
          </>
        )}
        <BubbleWrap>
          {get.facebook && <BubbleLinks href={get.facebook}>facebook</BubbleLinks>}
          {get.instagram && <BubbleLinks href={get.instagram}>instagram</BubbleLinks>}
          {get.linkedin && <BubbleLinks href={get.linkedin}>linkedin</BubbleLinks>}
          {get.pinterest && <BubbleLinks href={get.pinterest}>pinterest</BubbleLinks>}
          {get.twitter && <BubbleLinks href={get.twitter}>twitter</BubbleLinks>}
          {get.website && <BubbleLinks href={get.website}>własna strona</BubbleLinks>}
        </BubbleWrap>
      </>
    );
  }

  function ListExperience() {
    const list = experienceList.map((item, index) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }} key={item.id}>
          {index !== 0 && <LineForm />}
          {index === 0 && (
            <>
              <LineForm />
              <HeaderText style={{ marginBottom: '1.5rem' }}>Doświadczenie zawodowe</HeaderText>
            </>
          )}
          <LeftInfoRow>
            <InfoText>Nazwa firmy: </InfoText>
            <LongDataText>{item.company}</LongDataText>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Miasto: </InfoText>
            <LongDataText>{item.city}</LongDataText>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Stanowisko: </InfoText>
            <LongDataText>{item.position}</LongDataText>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Od: </InfoText>
            <LongDataText>{item.start_date}</LongDataText>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Do: </InfoText>
            <LongDataText>{item.end_date}</LongDataText>
          </LeftInfoRow>
        </div>
      );
    });

    return <>{list}</>;
  }

  const showButton = () => {
    if (window.innerWidth <= 1000) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  function handleRating(rate) {
    setRating(rate);
  }

  window.addEventListener('resize', showButton);

  const reviewCount = 15; //pobrac to z bazy
  const ratingCount = 2.5; //pobrac z bazy
  const Default = '...';

  const openModalEditClick = () => {
    setShowModalEdit(true);
  };

  const closeModalEditClick = () => {
    setShowModalEdit(false);
  };
  const handleWrapperClick = (event) => {
    event.stopPropagation();
  };
  const ModalEdit = ({ showModalEdit }) => {
    const [avatar, setAvatar] = useState('');
    const [blob, setBlob] = useState('');

    const [modalEditData, setModalEditData] = useState({
      name: '',
      description: '',
    });

    const handleAddPhoto = useCallback(async () => {
      try {
        const response = await axios.post('/api/artist/createPortfolioEntry/' + username, blob, {
          params: {
            name: modalEditData.name,
            description: modalEditData.description,
          },
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
            'Content-Type': 'multipart/form-data',
          },
        });
        handleRefreshPortfolio(); // Odświeżenie Portfolio
      } catch (err) {
        console.error('Error while saving data:', err);
      }
      setShowModalEdit(false);
    }, [blob, handleRefreshPortfolio, modalEditData.description, modalEditData.name, username]);

    const handleEditImageClick = () => {
      fileInputRef.current.click();
    };

    const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setAvatar(URL.createObjectURL(file));
        const formData = new FormData();
        formData.append('image', file, file.name);
        setBlob(formData);
      }
    };

    return (
      <>
        {showModalEdit && (
          <ModalBackground onClick={closeModalEditClick}>
            <ModalWrapper onClick={handleWrapperClick}>
              <ModalInfo>Tytuł:</ModalInfo>
              <TitleInput
                value={modalEditData.name}
                onChange={({ target }) => setModalEditData({ ...modalEditData, name: target.value })}
              />
              <ModalInfo>Opis:</ModalInfo>
              <AboutInput
                maxLength={300}
                value={modalEditData.description}
                onChange={({ target }) => setModalEditData({ ...modalEditData, description: target.value })}
              />
              {modalEditData.description && (
                <Bracket>
                  ({Math.min(modalEditData.description.length, 300)}/{300})
                </Bracket>
              )}
              <div
                style={{
                  height: '100%',
                  justifyContent: 'end',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Button style={{ width: '10rem' }} onClick={handleEditImageClick}>
                  Wybierz zdjęcie
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />
                <Button style={{ width: '6rem' }} onClick={handleAddPhoto}>
                  Dodaj
                </Button>
              </div>
            </ModalWrapper>
          </ModalBackground>
        )}
      </>
    );
  };

  return (
    <>
      {checkLoading && get && username ? (
        <ProfileWrapper>
          <TopSection>
            <LeftWrapper>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <ProfileImage>
                  {
                    <Image
                      src={'/public/api/artist/getProfileImageByUsername/' + username}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/cards/defaultavatar.png';
                      }}
                      alt="Profile"
                    />
                  }
                </ProfileImage>
                <JobText>{get.level}</JobText>
              </div>
              <NameText>
                {get.firstname} {get.lastname}{' '}
              </NameText>
              <Button onClick={() => openModalEditClick()}>Dodaj zdjęcie</Button>
            </LeftWrapper>
            <RightWrapper>
              <BoldLabel>O mnie:</BoldLabel>
              <AboutMe>{get.bio ? get.bio : 'brak opisu'}</AboutMe>
              <Left>
                <LineForm />
                <InfoRow>
                  <LeftColumn>
                    <LeftInfoRow>
                      <InfoText>Miejscowość:</InfoText>
                      <DataText>{get.location ? get.location : 'puste'}</DataText>
                    </LeftInfoRow>
                    <LineForm />
                    <InfoText>Umiejętności:</InfoText>
                    <BubbleWrap>
                      {get.skills?.length ? (
                        get.skills.map((skill, index) => <Bubble key={index}>{skill}</Bubble>)
                      ) : (
                        <Bubble>brak</Bubble>
                      )}
                    </BubbleWrap>
                    <LineForm />
                    <InfoText>Języki:</InfoText>
                    <BubbleWrap>
                      {get.languages?.length ? (
                        get.languages.map((language, index) => <Bubble key={index}>{language}</Bubble>)
                      ) : (
                        <Bubble>brak</Bubble>
                      )}
                    </BubbleWrap>
                    <LineForm />
                    <InfoText>Tagi:</InfoText>
                    <BubbleWrap>
                      {get.tags?.length ? (
                        get.tags.map((tag, index) => <Bubble key={index}>{tag}</Bubble>)
                      ) : (
                        <Bubble>brak</Bubble>
                      )}
                    </BubbleWrap>
                    <ListLinks />
                  </LeftColumn>
                  {get.education.length > 0 || get.experience.length > 0 ? (
                    <RightColumn>
                      <ListEducation />
                      <ListExperience />
                    </RightColumn>
                  ) : null}
                </InfoRow>
              </Left>
            </RightWrapper>
          </TopSection>
          <BottomSection>
            <TitleText>Portfolio</TitleText>
            <BottomWrapper>
              <Portfolio username={username} refreshPortfolio={handleRefreshPortfolio} />
            </BottomWrapper>
          </BottomSection>
          <ModalEdit showModalEdit={showModalEdit} handleRefreshPortfolio={handleRefreshPortfolio} />
        </ProfileWrapper>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default UserPage;
