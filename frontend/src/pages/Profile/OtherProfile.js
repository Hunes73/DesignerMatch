import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { default as axios } from '../../api/axios';
import LoadingPage from '../LoadingPage';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { useParams } from 'react-router-dom';
import sessionStoreCleaner from '../../components/sessionStoreCleaner';
import {
  AboutMe,
  BoldLabel,
  BottomWrapper,
  Bubble,
  BubbleLinks,
  BubbleWrap,
  Button,
  DataText,
  DownSection,
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
  NameText,
  ProfileImage,
  ProfileWrapper,
  ButtonMessageOff,
  ButtonMessage,
  RatingText,
  RatingWrapper,
  RightColumn,
  RightWrapper,
  SmallButton,
  TopSection,
  ModalBackground,
  ModalWrapper,
  LongDataText,
} from './ProfileElements';
import { BlankCard, TitleText } from '../Home/CardsElement';
import Portfolio from './Portfolio';
import {
  CommissionBottom,
  CommissionCard,
  CommissionText,
  CommissionTitle,
  CommissionTitleContainer,
  CommissionTop,
  LevelBubble,
  SmallCommissionBubble,
  StakeText,
} from '../Home/CommissionsElements';
import { FiClock, FiMapPin } from 'react-icons/fi';
import { COLORS } from '../../components/Colors';

const { gray1 } = COLORS;

const FirstScreen = 1954; //wyświetlić (15opini niżej)
const SecondScreen = 1000;
const getArtistProfileURL = process.env.REACT_APP_GET_ARTIST_PROFILE;
const getUserURL = process.env.REACT_APP_GET_USER;
const getShortArtistProfileURL = process.env.REACT_APP_GET_SHORT_ARTIST_PROFILE;

let stompClient = null
//UserName/UserInfo/MessageButton
const OtherUserPage = () => {
  const { argument } = useParams();
  const [argumentSet, setArgumentSet] = useState(argument);
  const [get, setGet] = useState('');
  const [checkLoading, setCheckLoading] = useState(null);
  const [shortProfile, setShortProfile] = useState('');
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [myUsername, setmyUsername] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [rating, setRating] = useState(0); //rating wyslac do bazy jako ocenę
  const [click, setClick] = useState(true);
  const [button, setButton] = useState(true);
  const [role, setRole] = useState('');
  const [commissions, setCommissions] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || '/sign-in';

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

        const commissionsResponse = await axios.request({
          url: '/public/api/commission/getAllCommissionFirmByUsername/' + decodeResult.data.username,
          headers: {},
        });

        setCommissions(commissionsResponse.data);
        setArgumentSet(argument);
        setRole(decodeResult.data.role);
        setmyUsername(decodeResult.data.username);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [showModal]);

  useEffect(() => {
    sessionStoreCleaner.checkAndRemoveSessionStorage();
  }, []);

  useEffect(() => {
    let profileName = '';
    if (!argument) profileName = 'jakub1';
    else profileName = argument;

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

    const fetchData = async () => {
      try {
        const result1 = await axios.request(profileData);
        const result2 = await axios.request(profileNameData);
        setGet(result1.data);
        setCheckLoading(result1);
        setShortProfile(result2.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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

  const connect = () => {
    const Stomp = require('stompjs');
    let SockJS = require('sockjs-client');
    SockJS = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, onConnected, onError());
  };
  const onError = (error) => {
    console.error('WebSocket error:', error);
  };

  const onConnected = () => {
    if (stompClient) {
      if (stompClient.connected) {
        let newMessage = {
          sender_username: myUsername,
          recipient_username: argument,
          content: '!$@DM@$!',
        };

        stompClient.send('/app/chat', {}, JSON.stringify(newMessage));
        try {
          stompClient.disconnect();
        } catch (e) {
          console.log('stomp Client ma problem z disconnected, ZAWSZE');
        }
        navigate('/chat');
      } else console.log('błąd wysyłania: brak połączenia z WebSocket');
    } else console.log('błąd wysyłania: stompClient niezdefiniowany');
  };

  const handleAddEducationElement = (
    newId,
    faculty,
    schoolName,
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
        faculty,
        school_name: schoolName,
        field_of_study: fieldOfStudy,
        degree,
        start_date: startDate,
        end_date: endDate,
        description,
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
            <DataText>{item.school_name}</DataText>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Kierunek:</InfoText>
            <LongDataText>{item.faculty}</LongDataText>
          </LeftInfoRow>
          <LeftInfoRow>
            <InfoText>Dziedzina nauk: </InfoText>
            <LongDataText>{item.field_of_study}</LongDataText>
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
          {get.website && <BubbleLinks href={get.website}>website</BubbleLinks>}
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

  window.addEventListener('resize', showButton);

  const Default = '...';

  const handleMandatory = (comId) => async () => {
    try {
      await axios.put(
        '/api/commission/updateById/' + comId,
        {
          contractor_username: argument,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
            'Content-Type': 'application/json',
          },
        },
      );
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
    setShowModal(false);
  };

  const handleCommissionShow = () => {
    setShowModal(true);
  };

  const ModalClose = () => {
    setShowModal(false);
  };

  const handleWrapperClick = (event) => {
    event.stopPropagation();
  };

  const CommissionElement = (props) => {
    return (
      <CommissionCard onClick={handleMandatory(props.id)}>
        <CommissionTop>
          <CommissionTitleContainer>
            <CommissionTitle>{props.title}</CommissionTitle>
            <LevelBubble>{props.level}</LevelBubble>
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
          <FiMapPin size={18} style={{ color: gray1 }} />
          <CommissionText>{props.location}</CommissionText>
          <FiClock size={18} style={{ color: gray1 }} />
          <CommissionText>{props.deadline}</CommissionText>
        </div>
        <CommissionBottom>
          {props.tags.map((tag, indexT) => (
            <SmallCommissionBubble key={indexT}>{tag}</SmallCommissionBubble>
          ))}
        </CommissionBottom>
      </CommissionCard>
    );
  };

  const Modal = ({ showModal }) => {
    return (
      <>
        {showModal && (
          <ModalBackground onClick={ModalClose}>
            <ModalWrapper onClick={handleWrapperClick}>
              <TitleText style={{ marginBottom: '1rem' }}>
                Wybierz zlecenie dla: {get.firstname} {get.lastname}
              </TitleText>
              {commissions.length > 0 ? (
                commissions.map(
                  (com, indexC) =>
                    !com.contractor_username && (
                      <CommissionElement
                        key={indexC}
                        title={com.title}
                        description={com.description}
                        rate={com.rate}
                        deadline={com.deadline}
                        level={com.level}
                        location={com.location}
                        languages={com.languages}
                        tags={com.tags}
                        skills={com.skills}
                        id={com.id}
                      />
                    ),
                )
              ) : (
                <BlankCard>Brak dostępnych zleceń</BlankCard>
              )}
            </ModalWrapper>
          </ModalBackground>
        )}
      </>
    );
  };

  return (
    <>
      {checkLoading && get ? (
        <ProfileWrapper>
          <TopSection>
            <LeftWrapper>
              <ProfileImage>
                <Image
                  src={'/public/api/artist/getProfileImageByUsername/' + get.username}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/cards/defaultavatar.png';
                  }}
                  alt="Profile"
                />
              </ProfileImage>
              <JobText>{get.level}</JobText>
              <NameText>
                {get.firstname} {get.lastname}{' '}
              </NameText>
              {/* <RatingWrapper>
              <Rating
                size="2rem"
                allowFraction={true}
                initialValue={ratingCount}
                onClick={handleRating}
                onPointerEnter={() => console.log('Enter')}
                onPointerLeave={() => console.log('Leave')}
                onPointerMove={(value, index) => console.log(value, index)}
              />
              <RatingText>({reviewCount} opinii)</RatingText>
            </RatingWrapper> */}
              <LineForm />
              {argumentSet !== myUsername && myUsername !== '' ? (
                <ButtonMessage onClick={() => connect()}>Napisz wiadomość</ButtonMessage>
              ) : (
                <ButtonMessage
                  onClick={() => {
                    navigate(redirectPath, { replace: true });
                    console.log(myUsername + argument);
                  }}
                >
                  {' '}
                  Napisz wiadomość{' '}
                </ButtonMessage>
              )}
              {role === 'COMPANY' && <ButtonMessage onClick={handleCommissionShow}>Wyznacz zlecenie</ButtonMessage>}
              {/* <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <SmallButton>Napisz opinię</SmallButton>
              <SmallButton> Like</SmallButton>
            </div> */}
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
                      <DataText>{shortProfile.city}</DataText>
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
          <DownSection>
            <TitleText style={{ width: '100%', textAlign: 'center' }}>Portfolio</TitleText>
            <BottomWrapper>
              <Portfolio username={argument} />
            </BottomWrapper>
          </DownSection>
          <Modal showModal={showModal} />
        </ProfileWrapper>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default OtherUserPage;
