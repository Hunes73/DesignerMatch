import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { COLORS } from './Colors';
import axios from '../api/axios';

const { darkLight, secondary, darkLight2, primary, white, gray, gray1 } = COLORS;

//czesc elementow, na szybko pisane mozna przeniesc gdzies indziej
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.6);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  cursor: pointer;
  background: ${darkLight};
  color: ${primary};
  border: 0px;
  border-radius: 15px;
  font-size: 1.2rem;
  padding: 0.1rem 0.7rem;
  margin: 1rem 1rem;
`;

const ModalWrapper = styled.div`
  width: 50rem;
  height: 35rem;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: ${primary};
  color: #000;
  z-index: 10;
  border-radius: 15px;
  @media screen and (max-width: 960px) {
    width: 100%;
  }
  animation: modalFadeIn 0.5s ease;

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(-100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.8px;
  color: #141414;
  @media screen and (max-width: 960px) {
    line-height: 2px;
  }
`;

const ModalBubble = styled.p`
  padding: 5px 10px 5px 10px;
  display: inline-flex;
  border-radius: 15px;
  // box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  font-size: 16px;
  ${(props) =>
    props.checked === true
      ? `
        font-size: 18px;
        background: ${darkLight};
        color: white;
    `
      : `back`}
`;

const LanguageButton = styled.button`
  border: 0px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7rem 0;
  background: ${primary};
  &:hover {
    background: ${gray};
  }
`;

const Header = styled.div`
  font-size: 2.2rem;
  height: 3.2rem;
  color: ${darkLight};
  text-align: center;
`;

const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100% - 3.2rem);
  border-radius: 15px;
  &::-webkit-scrollbar {
    width: 0.5vw;
  }

  &::-webkit-scrollbar-thumb {
    background: ${gray1};
    border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${darkLight};
  }
`;

const ModalLanguages = ({ showModal, setShowModal, languages, setLanguages }) => {
  const modalRef = useRef();
  const [availableLanguages, setAvailableLanguages] = useState('');
  const [languagesToAdd, setLanguagesToAdd] = useState([]);

  //zamyka modala
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  //wychiwytuje klawature
  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal],
  );
  //pobiera dane z bazy
  let languageData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/public/api/filter/getAvailableLanguages',
    headers: {},
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const languageResponse = await axios.request(languageData);
        setAvailableLanguages(languageResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //wychiwytuje klawature
  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  //potrzebne do dzialania tagow
  function handleAddLanguage(language) {
    setLanguages((languages) => [...languages, language]);
  }

  function handleAddLanguagesToAdd(language) {
    setLanguagesToAdd((languagesToAdd) => [...languagesToAdd, language]);
  }

  function handleDeleteLanguagesToAdd(language) {
    setLanguagesToAdd(languagesToAdd.filter((l) => l !== language));
  }

  function handleClearLanguages() {
    setLanguages([]);
  }

  function handleClearLanguagesToAdd() {
    setLanguagesToAdd([]);
  }

  function addLanguages() {
    for (let i = 0; i < languagesToAdd.length; ++i) {
      handleAddLanguage(languagesToAdd[i]);
    }
    handleClearLanguagesToAdd();
  }

  //wyswietla jezyki

  function ListAvailableLanguages() {
    if (availableLanguages) {
      const available = availableLanguages.filter((item) => {
        if (!languages.includes(item)) return item;
      });
      const list = available.map((item, id) => (
        <LanguageButton
          onClick={() => {
            if (languagesToAdd.includes(item)) {
              handleDeleteLanguagesToAdd(item);
            } else {
              handleAddLanguagesToAdd(item);
            }
          }}
          key={id}
        >
          <ModalBubble key={id} checked={languagesToAdd.includes(item)}>
            <label style={{ marginRight: 2, cursor: 'pointer' }}>{item}</label>
          </ModalBubble>
        </LanguageButton>
      ));
      return <>{list}</>;
    } else {
      return <label>pusto ListAvailableLanguages</label>;
    }
  }

  const handleClickSave = () => {
    addLanguages();
    setShowModal((prev) => !prev);
  };

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <Header>Wybierz Języki</Header>
            <ScrollWrapper>
              <ModalContent>
                <ListAvailableLanguages />
              </ModalContent>
            </ScrollWrapper>
          </ModalWrapper>
          <div>
            <Button onClick={handleClickSave}>Zapisz</Button>
            <Button style={{ background: secondary }} onClick={() => setShowModal((prev) => !prev)}>
              Anuluj
            </Button>
          </div>
        </Background>
      ) : null}
    </>
  );
};

export default ModalLanguages;
