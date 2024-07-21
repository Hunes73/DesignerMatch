import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { COLORS } from './Colors';
import axios from '../api/axios';
import { SecondPhoto } from '../pages/Home/CardsElement';

const { darkLight, darkLight2, primary, gray, gray1, secondary } = COLORS;

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
  &:hover {
    background: ${darkLight2};
  }
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

const SkillButton = styled.button`
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

const ModalSkills = ({ showModal, setShowModal, skills, setSkills }) => {
  const modalRef = useRef();
  const [availableSkills, setAvailableSkills] = useState([]);
  const [availableCategories, setAvailableCategories] = useState('');
  const [skillsToAdd, setSkillsToAdd] = useState([]);

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
  let skillsData = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/public/api/filter/getAvailableCategories',
    headers: {},
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsResponse = await axios.request(skillsData);
        handleClearAvailableSkills();
        setAvailableCategories(skillsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (availableCategories) {
      for (let i = 0; i < availableCategories.categories.length; ++i) {
        for (let j = 0; j < availableCategories.categories[i].skills.length; ++j) {
          handleAddAvailableSkills(availableCategories.categories[i].skills[j]);
        }
      }
    }
  }, [availableCategories]);

  //wychiwytuje klawature
  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  function addSkills() {
    for (let i = 0; i < skillsToAdd.length; ++i) {
      handleAddSkill(skillsToAdd[i]);
    }
    handleClearSkillsToAdd();
  }

  function handleClearSkillsToAdd() {
    setSkillsToAdd([]);
  }

  function handleClearAvailableSkills() {
    setAvailableSkills([]);
  }

  function handleAddAvailableSkills(skill) {
    setAvailableSkills((availableSkills) => [...availableSkills, skill]);
  }

  function handleAddSkillsToAdd(skill) {
    setSkillsToAdd((skillsToAdd) => [...skillsToAdd, skill]);
  }

  function handleDeleteAvailableSkills(skill) {
    setAvailableSkills(availableSkills.filter((s) => s !== skill));
  }

  function handleAddSkill(skill) {
    setSkills((skills) => [...skills, skill]);
  }

  function handleDeleteSkillsToAdd(skill) {
    setSkillsToAdd(skillsToAdd.filter((s) => s !== skill));
  }

  //wyśweitla skills
  function ListAvailableSkills() {
    if (availableSkills) {
      const available = availableSkills.filter((item) => {
        if (!skills.includes(item)) return item;
      });
      const list = available.map((item, id) => (
        <SkillButton
          onClick={() => {
            if (skillsToAdd.includes(item)) {
              handleDeleteSkillsToAdd(item);
            } else {
              handleAddSkillsToAdd(item);
            }
          }}
          key={id}
        >
          <ModalBubble key={id} checked={skillsToAdd.includes(item)}>
            <label style={{ marginRight: 2, cursor: 'pointer' }}>{item}</label>
          </ModalBubble>
        </SkillButton>
      ));
      return <>{list}</>;
    } else {
      return <list>pusto ListAvailableSkills</list>;
    }
  }

  const handleClickSave = () => {
    addSkills();
    setShowModal((prev) => !prev);
  };

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <Header>Wybierz umiejętności</Header>
            <ScrollWrapper>
              <ModalContent>
                <ListAvailableSkills />
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

export default ModalSkills;
