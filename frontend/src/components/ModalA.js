import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const Button = styled.button`
  min-widt: 100px;
  padding: 16px 32px;
  border-radous: 4px;
  border: none;
  background: #141414;
  color: #fff;
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ModalA = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Button onClick={openModal}>Modal</Button>
        <Modal URL="/api/artist/getAvailableCategories" showModal={showModal} setShowModal={setShowModal} />
      </Container>
    </>
  );
};

export default ModalA;
