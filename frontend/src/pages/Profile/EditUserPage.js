import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { default as axios } from '../../api/axios';
import { COLORS } from '../../components/Colors';
import Modal from '../../components/Modal';
import {
  RightColumn,
  InfoRow,
  LeftColumn,
  Left,
  Image,
  LeftWrapper,
  LineForm,
  ProfileImage,
  ProfileWrapper,
  RightWrapper,
  TopSection,
  LeftInfoRow,
  InfoText,
  DataText,
  HeaderText,
  NameText,
  JobText,
  EditUserDownSection,
  BubbleWrap,
  Bubble,
  InputInfoText,
  LevelSelect,
  LevelContainer,
  StyledTextarea,
  SmallInput,
} from './ProfileElements';
import { CheckBoxLabel, CheckBoxWrapper, CheckBox, CategoryText, StyledOption } from '../Home/CardsElement';
import LoadingPage from '../LoadingPage';

const { secondary } = COLORS;

const FirstScreen = 1954; //wyświetlić (15opini niżej)
const SecondScreen = 1000;
const getArtistProfileURL = process.env.REACT_APP_GET_ARTIST_PROFILE;
const getUserURL = process.env.REACT_APP_GET_USER;
const getShortArtistProfileURL = process.env.REACT_APP_GET_SHORT_ARTIST_PROFILE;

const AboutMe = styled.textarea`
  height: ${(props) => props.hag};
  resize: none;
  overflow: auto;
  min-height: ${(props) => props.hag};
  max-height: 60px;
  zindex: 10;
`;

const AboutInput = styled(StyledTextarea)`
  min-height: 15rem;
  font-size: 1.2rem;
  overflow-y: auto;
  white-space: normal;
`;

const Nawias = styled.p`
  margin: auto 15px auto auto;
`;

const ButtonSave = styled.button`
  padding: 20px 50px;
  font-size: 1.2rem;
  margin-top: 0;
  margin-left: 80vw;
  display: flex;
  color: white;
  border-radius: 15px;
  border: 1px solid black;
  background: ${secondary};
  transform: translateY(2.5rem);
  &:hover {
    transition: 0.3s;
    border: 2px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
  }
`;

const ButtonEdit = styled.button`
  padding: 5px 20px;
  color: black;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.4);
  }
  &:hover{
    transition: 0.3s;
    border: 2px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0px 4px 12px 0 rgba(0, 0, 0, 0.4);
  }
`;

//UserName/UserInfo/MessageButton
const EditUserPage = () => {
  const [get, setGet] = useState(null);
  const [height, setHeight] = useState('20px');
  //popUp
  const [showModal, setShowModal] = useState(false);
  const [showModalLinks, setShowModalLinks] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const openModalLinks = () => {
    setShowModalLinks((prev) => !prev);
  };

  //edycja profilu
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('20.07.2001'); //nie siciaga z bazy

  const [click, setClick] = useState(true);
  const [button, setButton] = useState(true);

  //checkbox
  const [categories, setCategories] = useState([]);
  const [choseLevel, setChoseLevel] = useState([]);

  const limitHeight = 60;
  const maxChars = 300;
  const chars = bio.length;
  const job = '';
  const profileName = 'jakub1';
  let levels = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/api/artist/getAvailableLevels',
    headers: {},
  };

  let profileData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: getArtistProfileURL + profileName,
    headers: {},
  };

  let profileNameData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: getShortArtistProfileURL + profileName,
    headers: {},
  };

  const categoriesData = useMemo(
    () => ({
      method: 'get',
      maxBodyLength: 5000,
      url: '/api/artist/getAvailableCategories',
      headers: {},
    }),
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const level = await axios.request(levels);
        const categoriesResponse = await axios.request(categoriesData);
        const result1 = await axios.request(profileData);
        const result2 = await axios.request(profileNameData);
        setGet(result1.data);
        setBio(result1.data.bio);
        setName(result2.data.firstname);
        setSurname(result2.data.lastname);
        setCity(result2.data.city);
        setCategories(categoriesResponse.data);
        //setDate(result2.data.data);

        setChoseLevel(level.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const levelOptions = useMemo(
    () =>
      choseLevel.map((choseLevel, index) => (
        <StyledOption key={index} value={choseLevel}>
          {choseLevel}
        </StyledOption>
      )),
    [choseLevel],
  );

  //wysweitlanie dropbox

  //wyswietlanie checkboxow
  const categoryCheckBoxes = useMemo(() => {
    if (!Array.isArray(categories.categories)) {
      return null;
    }
    return categories.categories.map((category, indexC) => (
      <>
        <CategoryText key={indexC}>{category.name}</CategoryText>
        {category.subcategories.map((subcategory, indexS) => (
          <CheckBoxWrapper key={indexS}>
            <CheckBox type="checkbox" id={subcategory} />
            <CheckBoxLabel htmlFor={subcategory} />
            <JobText>{subcategory}</JobText>
          </CheckBoxWrapper>
        ))}
      </>
    ));
  });

  const handleClick = () => setClick(!click);

  const showButton = () => {
    if (window.innerWidth <= 1000) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const hanldeDate = (e) => {
    setDate(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      let max = `${Math.min(e.target.scrollHeight + 20, limitHeight)}px`;
      setHeight(max);
    } else {
      e.target.style.height = 'inherit';
      e.target.style.height = `${Math.min(e.target.scrollHeight, limitHeight)}px`;
      setHeight(e.target.style.height);
    }
  };

  window.addEventListener('resize', showButton);

  const reviewCount = 15; //pobrac to z bazy
  const ratingCount = 2.5; //pobrac z bazy
  const Default = '...';
  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      {get ? (
        <ProfileWrapper>
          <TopSection>
            <LeftWrapper>
              <ProfileImage>
                <Image src="/assets/test.jpg" alt="Profile" />
              </ProfileImage>
              <ButtonEdit style={{ marginTop: '5px', marginBottom: '10px' }}>Zmień zdjęcie(ND)</ButtonEdit>
              <InputInfoText>Imię:</InputInfoText>
              <NameText value={name} onChange={(e) => setName(e.target.value)} />
              <InputInfoText>Nazwisko:</InputInfoText>
              <NameText value={surname} onChange={(e) => setSurname(e.target.value)} />
              <InputInfoText>Poziom doświadczenia:</InputInfoText>
              <LevelContainer>
                <LevelSelect>{levelOptions}</LevelSelect>
              </LevelContainer>
              {/* <NameContainer>
                <NameText
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <NameText
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </NameContainer>
              <StyledSelect>{levelOptions}</StyledSelect>
              {!showModal && (
                <RatingWrapper>
                  <Rating
                    size="3.5vh"
                    readonly={true}
                    allowFraction={true}
                    initialValue={ratingCount}
                  />
                  <JobText>({reviewCount} opinii)</JobText>
                </RatingWrapper>
              )}
              <LineForm />
              <Button>Napisz wiadomość</Button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <SmallButton>Napisz opinię</SmallButton>
                <SmallButton> Obserwuj</SmallButton>
              </div> */}
            </LeftWrapper>
            <RightWrapper>
              <InputInfoText>O mnie: </InputInfoText>
              <AboutInput
                hag={height}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={maxChars}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <Nawias>
                ({chars}/{maxChars})
              </Nawias>
              <LineForm />
              <Left>
                <InfoRow>
                  <LeftColumn>
                    <InputInfoText>Członek od:</InputInfoText>
                    <SmallInput value={date} onChange={(e) => hanldeDate(e)} />
                    <InputInfoText>Miejscowość:</InputInfoText>
                    <SmallInput value={city} onChange={(e) => setCity(e.target.value)} />
                    <LineForm />
                    <LeftInfoRow>
                      <HeaderText>Języki:</HeaderText>
                      <ButtonEdit>Edytuj</ButtonEdit>
                    </LeftInfoRow>

                    <BubbleWrap>
                      {get.languages?.length ? (
                        get.languages.map((language, index) => <Bubble key={index}>{language}</Bubble>)
                      ) : (
                        <Bubble>{Default}</Bubble>
                      )}
                    </BubbleWrap>
                    <LineForm />
                    <LeftInfoRow>
                      <HeaderText>Umiejętności:</HeaderText>
                      <ButtonEdit onClick={openModal}>Edytuj</ButtonEdit>
                    </LeftInfoRow>

                    <BubbleWrap>
                      {get.skills?.length ? (
                        get.skills.map((skill, index) => <Bubble key={index}>{skill}</Bubble>)
                      ) : (
                        <Bubble>{Default}</Bubble>
                      )}
                    </BubbleWrap>
                    <LineForm />
                    <LeftInfoRow>
                      <HeaderText>Linki:</HeaderText>
                      <ButtonEdit>Edytuj</ButtonEdit>
                    </LeftInfoRow>
                    <BubbleWrap>
                      <Bubble>{get.website}</Bubble>
                      <Bubble>{get.linkedin}</Bubble>
                    </BubbleWrap>
                  </LeftColumn>
                  <RightColumn>
                    <LeftInfoRow>
                      <HeaderText>Wykształcenie:</HeaderText>
                      <ButtonEdit>Edytuj</ButtonEdit>
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>Nazwa szkoły/uczelni:</InfoText>
                      <DataText>{get.education[0].school_name}</DataText>
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>Wydział:</InfoText>
                      <DataText>{get.education[0].faculty}</DataText>
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>Kierunek:</InfoText>
                      <DataText>{get.education[0].field_of_study}</DataText>
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>Data rozpoczęcia:</InfoText>
                      <DataText>{get.education[0].start_date}</DataText>
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>Data zakończenia:</InfoText>
                      <DataText>{get.education[0].end_date}</DataText>
                    </LeftInfoRow>
                    <LineForm />
                    <LeftInfoRow>
                      <HeaderText>Doświadczenie:</HeaderText>
                      <ButtonEdit>Edytuj</ButtonEdit>
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>Firma:</InfoText>
                      <DataText>{get.experience[0].company}</DataText>
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>Miasto:</InfoText>
                      <DataText>{get.experience[0].city}</DataText>
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>Stanowisko:</InfoText>
                      <DataText>{get.experience[0].position}</DataText>
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>Data rozpoczęcia:</InfoText>
                      <DataText>{get.experience[0].start_date}</DataText>
                    </LeftInfoRow>
                    <LeftInfoRow>
                      <InfoText>Data zakończenia:</InfoText>
                      <DataText>{get.experience[0].end_date}</DataText>
                    </LeftInfoRow>
                  </RightColumn>
                </InfoRow>
              </Left>
            </RightWrapper>
          </TopSection>
          {!showModal && <ButtonSave>ZAPISZ</ButtonSave>}
          <EditUserDownSection></EditUserDownSection>
        </ProfileWrapper>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default EditUserPage;
