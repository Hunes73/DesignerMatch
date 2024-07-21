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

const TagButton = styled.button`
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

const ModalTags = ({ showModal, setShowModal, tags, setTags }) => {
  const modalRef = useRef();
  const [availableTags, setAvailableTags] = useState('');
  const [tagsToAdd, setTagsToAdd] = useState([]);

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
  let tagsData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/public/api/filter/getAvailableTags',
    headers: {},
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsResponse = await axios.request(tagsData);
        setAvailableTags(tagsResponse.data);
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
  function addTags() {
    for (let i = 0; i < tagsToAdd.length; ++i) {
      handleAddTag(tagsToAdd[i]);
    }
    handleClearTagsToAdd();
  }

  function handleClearTagsToAdd() {
    setTagsToAdd([]);
  }

  function handleAddTagsToAdd(tag) {
    setTagsToAdd((tagsToAdd) => [...tagsToAdd, tag]);
  }

  function handleDeleteTagsToAdd(tag) {
    setTagsToAdd(tagsToAdd.filter((t) => t !== tag));
  }

  function handleAddTag(tag) {
    setTags((tags) => [...tags, tag]);
  }

  //wyswietla tagi
  function ListAvailableTags() {
    if (availableTags) {
      const available = availableTags.filter((item) => {
        if (!tags.includes(item)) return item;
      });
      const list = available.map((item, id) => (
        <TagButton
          onClick={() => {
            if (tagsToAdd.includes(item)) {
              handleDeleteTagsToAdd(item);
            } else {
              handleAddTagsToAdd(item);
            }
          }}
          key={id}
        >
          <ModalBubble key={id} checked={tagsToAdd.includes(item)}>
            <label style={{ marginRight: 2, cursor: 'pointer' }}>{item}</label>
          </ModalBubble>
        </TagButton>
      ));
      return <>{list}</>;
    } else {
      return <label>pusto ListAvalileTags</label>;
    }
  }

  const handleClickSave = () => {
    addTags();
    setShowModal((prev) => !prev);
  };

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <Header>Wybierz tagi</Header>
            <ScrollWrapper>
              <ModalContent>
                <ListAvailableTags />
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

export default ModalTags;
