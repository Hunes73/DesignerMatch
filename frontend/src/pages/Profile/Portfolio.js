import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import LoadingPage from '../LoadingPage';
import {
  AddCommissionButton,
  BottomWrapper,
  Image,
  ModalBackground,
  ModalImageContainer,
  ModalInfo,
  ModalWrapper,
  PortfolioImage,
  PortfolioImageContainer,
  PortfolioWrapper,
} from './ProfileElements';
import { TitleText } from '../Home/CardsElement';
import { CommissionCard } from '../Home/CommissionsElements';
import { COLORS } from '../../components/Colors';

const { gray1 } = COLORS;

const Portfolio = (props) => {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem('storageLogin')) {
          const decodeResult = await axios.request('/auth/decodeToken', {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
            },
          });
          setUsername(decodeResult.data.username);
        }

        const portfolioEntriesResponse = await axios.request(
          '/public/api/artist/getPortfolioEntries/' + props.username,
          {
            params: { page: 0, size: 50 },
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          },
        );

        setEntries(portfolioEntriesResponse.data.content);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props.refreshPortfolio, showModal]);

  const ModalOpen = (data) => {
    console.log(data);
    setModalData(data);
    setShowModal(true);
  };

  const ModalClose = () => {
    setShowModal(false);
  };

  const handleWrapperClick = (event) => {
    event.stopPropagation();
  };

  const handleDeletePhoto = (imageId) => async () => {
    try {
      await axios.delete('/api/artist/deletePortfolioEntry/' + props.username + '/' + imageId, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('storageLogin'),
        },
      });
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const PhotoModal = ({ showModal }) => {
    return (
      <>
        {showModal && (
          <ModalBackground onClick={ModalClose}>
            <ModalWrapper onClick={handleWrapperClick}>
              <TitleText>{modalData.name}</TitleText>
              <ModalInfo>{modalData.description}</ModalInfo>
              <ModalImageContainer>
                <PortfolioImage src={'/public/api/artist/getPortfolioImage/' + props.username + '/' + modalData.id} />
              </ModalImageContainer>
            </ModalWrapper>
            {username === props.username && (
              <AddCommissionButton onClick={handleDeletePhoto(modalData.id)}>Usuń z portfolio</AddCommissionButton>
            )}
          </ModalBackground>
        )}
      </>
    );
  };

  return (
    <>
      {entries.length > 0 ? (
        <PortfolioWrapper>
          {entries.map((entry, index) => (
            <PortfolioImageContainer key={index} onClick={() => ModalOpen(entry)}>
              <PortfolioImage src={'/public/api/artist/getPortfolioImage/' + props.username + '/' + entry.id} />
            </PortfolioImageContainer>
          ))}
          <PhotoModal showModal={showModal} />
        </PortfolioWrapper>
      ) : (
        <CommissionCard style={{ alignItems: 'center', cursor: 'default' }}>
          <text style={{ color: gray1, fontSize: '1.2rem' }}>
            Artysta nie posiada jeszcze żadnych wpisów w portfolio
          </text>
        </CommissionCard>
      )}
    </>
  );
};

export default Portfolio;
