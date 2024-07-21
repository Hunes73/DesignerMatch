import styled from 'styled-components';
import { COLORS } from '../../components/Colors';
import { CardsWrapper, TitleText } from './CardsElement';
import { ModalRow, StyledTextarea } from '../Profile/ProfileElements';

const { darkLight, darkLight2, gray, gray1, white, primary, secondary, secondary1 } = COLORS;

export const CommissionWrapper = styled(CardsWrapper)`
  @media screen and (max-width: 960px) {
    padding: 0;
  }
`;

export const CommissionLabel = styled.div`
  border-radius: 10px;
  display: flex;
  box-shadow: 4px 2px 10px 2px rgba(0, 0, 0, 0.2);
  margin: 0.5rem 1vw 5vh 0;
  position: relative;
  width: 95%;
  flex-direction: column;
  padding: 0.5rem 1rem;
  background: ${secondary1};
  transition: transform 0.3s ease;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    transform: scale(1.02);
  }

  @media screen and (max-width: 1280px) {
    font-size: 0.9rem;
  }

  @media screen and (max-width: 1080px) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 960px) {
    font-size: 0.9rem;
    width: 100%;
  }
`;

export const CommissionTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CommissionTitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: calc(100% - 9rem);
`;

export const CommissionTitle = styled.text`
  color: ${darkLight};
  font-size: 170%;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
`;

export const StakeText = styled.p`
  color: ${darkLight};
  font-size: 170%;
  text-align: end;
`;

export const CommissionBubble = styled.p`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${darkLight2};
  border: 1px solid ${darkLight2};
  background: ${primary};
  border-radius: 15px;
  font-size: 1.1rem;
  height: 1.7rem;
  margin: 0 0.3rem;
  padding: 0 0.5rem;
  @media screen and (max-width: 1280px) {
    font-size: 1rem;
    height: 1.6rem;
  }
`;

export const CommissionEditBubble = styled(CommissionBubble)`
  cursor: pointer;
`;

export const SmallCommissionBubble = styled(CommissionBubble)`
  font-size: 100%;
`;

export const LevelBubble = styled(CommissionBubble)`
  background: ${darkLight2};
  color: ${white};
  border: 0px;
`;

export const ModalCommissionWrapper = styled.div`
  overflow-y: auto;
  width: 95rem;
  height: 80%;
  border-radius: 15px;
  flex-direction: column;
  background: ${primary};
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  padding: 2rem;
  font-size: 1.5rem;
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

  @media screen and (max-width: 100rem) {
    width: 95%;
  }

  @media screen and (max-width: 1280px) {
    font-size: 1.2rem;
  }
`;

export const ModalCommissionBackground = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CommissionLineForm = styled.div`
  background: #ccc;
  border-radius: 100%;
  height: 1px;
  width: 100%;
  margin: 1rem 0;
`;

export const CommissionCard = styled.div`
  font-size: 0.85rem;
  display: flex;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.3);
  flex-direction: column;
  margin-bottom: 2.5rem;
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

export const CommissionText = styled.p`
  color: ${gray1};
  font-size: 120%;
  margin-left: 0.5rem;
  margin-right: 1rem;
`;

export const CommissionBottom = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
`;

export const InfoInputText = styled.text`
  font-size: 80%;
  color: ${gray1};
  margin-top: 1rem;
`;

export const TitleInput = styled(StyledTextarea)`
  color: ${darkLight};
  font-size: 2rem;
  min-height: 3rem;
  padding: 0 0 0 0.5rem;
  @media screen and (max-width: 960px) {
    font-size: 1.5rem;
    min-height: 2.2rem;
  }
`;

export const AboutInput = styled(StyledTextarea)`
  min-height: 15rem;
  font-size: 1.2rem;
  overflow-y: auto;
  white-space: normal;
  color: ${gray1};
`;

export const NumberInput = styled.textarea`
  color: ${darkLight};
  border-radius: 10px;
  border: 1px solid ${gray};
  font-size: 100%;
  overflow: hidden;
  white-space: nowrap;
  resize: none;
  text-align: right;
  height: 2.2rem;
  width: 12rem;
  padding-right: 0.5rem;
  &:hover {
    border: 1px solid ${darkLight};
  }
  @media screen and (max-width: 1280px) {
    height: 2rem;
  }

  @media screen and (max-width: 960px) {
    height: 1.8rem;
  }
  &::placeholder {
    color: ${secondary};
  }
`;

export const DateInput = styled(NumberInput)`
  width: 3.5rem;
  text-align: center;
  padding: 0 0.5rem;
`;

export const ModalEditRow = styled(ModalRow)``;

export const VisitCompanyButton = styled.button`
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.15);
  color: ${primary};
  text-decoration: none;
  background: ${darkLight};
  padding: 0.2rem 0.5rem;
  font-size: 1.2rem;
  margin: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
    background: ${darkLight2};
  }
`;
