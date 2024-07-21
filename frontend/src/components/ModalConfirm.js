import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { COLORS } from './Colors';
import { AddCommissionButton, Button } from '../pages/Profile/ProfileElements';
import { useNavigate } from 'react-router-dom';
import { VisitCompanyButton } from '../pages/Home/CommissionsElements';

const { primary, darkLight } = COLORS;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: ${primary};
  color: #010101;
  z-index: auto;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.8px;
  color: #141414;
  position: fixed;
  @media screen and (max-width: 960px) {
    line-height: 2px;
  }
`;
const ButtonClose = styled.button`
  cursor: pointer;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const Label = styled.label`
  margin-top: 50%;
`;

const ModalConfirm = ({ showModal, setShowModal, setNavigateGo, navigateGo, onClose }) => {
  const modalRef = useRef();
  const navigate = useNavigate(); // Używanie hooka useNavigate z react-router-dom

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setNavigateGo(true);
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  const handleConfirmClick = () => {
    navigate('/sign-in');
  };

  return (
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <ModalWrapper showModal={showModal} style={{ padding: '1rem' }}>
            <div style={{ textAlign: 'center', height: '100%', fontSize: '2rem', color: darkLight }}>
              Pomyślnie zarejestrowano użytkownika. Aby dokończyć rejestrację, potwierdź adres e-mail przed
              zalogowaniem.
            </div>
            <VisitCompanyButton onClick={handleConfirmClick}>Rozumiem</VisitCompanyButton>
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default ModalConfirm;
