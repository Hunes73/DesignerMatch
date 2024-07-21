import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TitleText } from '../Home/CardsElement';
import { useNavigate, useLocation } from 'react-router-dom';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { COLORS } from '../../components/Colors';
import axios from '../../api/axios';
import sessionStoreCleaner from '../../components/sessionStoreCleaner';
import {
  AboutMe,
  BoldLabel,
  Bracket,
  Bubble,
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
  ButtonMessageOff,
  ButtonMessage,
  ProfileImage,
  ProfileWrapper,
  RightColumn,
  RightWrapper,
  StyledDropDown,
  TopSection,
  BubbleLinks,
  LongDataText,
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
  LevelBubble,
  ModalEditRow,
  NumberInput,
  SmallCommissionBubble,
  StakeText,
  TitleInput,
} from '../Home/CommissionsElements';
import LoadingPage from '../LoadingPage';
import { FiClock, FiMapPin } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const { darkLight, gray1 } = COLORS;
let stompClient = null

const OtherCompanyPage = () => {
  const { argument } = useParams();
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
  const [myUsername, setmyUsername] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || '/sign-in';

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
        const companyResponse = await axios.request({
          url: '/public/api/company/getProfileByUsername/' + argument,
        });

        const commissionResponse = await axios.request({
          url: '/public/api/commission/getAllCommissionFirmByUsername/' + argument,
          headers: {},
        });

        if (localStorage.getItem('storageLogin')) {
          const decoderResult = await axios.request({
            url: '/auth/decodeToken',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
            },
          });
          setmyUsername(decoderResult.data.username);
        }

        const [citiesResponse, tagsResponse, categoriesResponse, languagesResponse, levelsResponse] = await Promise.all(
          [
            axios.request(citiesData),
            axios.request(tagsData),
            axios.request(categoriesData),
            axios.request(languagesData),
            axios.request(levelsData),
          ],
        );
        setUsername(argument);
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
  }, [citiesData, tagsData, categoriesData, languagesData, levelsData]);

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

  const Modal = ({ showModal }) => {
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
          {props.deadline.length > 0 && (
            <>
              <FiClock size={18} style={{ color: gray1 }} />
              <CommissionText>{props.deadline}</CommissionText>
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
                  src={'/public/api/company/getProfileImageByUsername/' + username}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/cards/defaultavatar.png';
                  }}
                  alt="Profile"
                />
              </ProfileImage>
              <NameText>{get.name}</NameText>
              <LineForm />
              {argument !== myUsername && myUsername !== '' ? (
                <ButtonMessage onClick={() => connect()}>Napisz wiadomość</ButtonMessage>
              ) : (
                <ButtonMessage onClick={() => navigate(redirectPath, { replace: true })}>
                  {' '}
                  Napisz wiadomość{' '}
                </ButtonMessage>
              )}
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
            <TitleText style={{ width: '100%', textAlign: 'center', paddingRight: '1rem' }}>Zlecenia</TitleText>
            {CommissionsData.map((com, indexC) => (
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
              />
            ))}
          </DownSection>
        </ProfileWrapper>
      ) : (
        <LoadingPage />
      )}
      <Modal showModal={showModal} data={modalData} />
    </>
  );
};

export default OtherCompanyPage;
