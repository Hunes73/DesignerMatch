import styled from 'styled-components';
import { COLORS } from '../../components/Colors';

const { darkLight, darkLight2 } = COLORS;

const Variable = { size: '50%' };

export const AllPage = styled.div`
  position: static;
  height: calc(90vh - 80px);
  padding: 0 1rem;
  color: white;
  @media only screen and (min-width: 960px) {
    left: ${Variable.size};
    margin-right: ${Variable.size};
    transform: translateX(${Variable.size});
    top: 0;
  }
`;

export const Border = styled.div`
  @media only screen and (min-width: 960px) {
    margin-top: 10vh;
  }
  background: linear-gradient(to left, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.35));
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  width: 50rem;
`;

export const Top = styled.div`
  color: ${darkLight};
  font-size: 2rem;
  position: relative;
  display: inline-block;
  margin: 0 15% 5rem;
  padding: 10px;
  background: linear-gradient(to left, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.35));
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0 0 15px 15px;
`;

export const Question = styled.div`
  margin: 0 5% 1rem;
  position: relative;
  color: black;
  font-size: 2.35em;
  padding: 7px;
  background: linear-gradient(to left, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.35));
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0 15px 15px 0;
  margin-left: 0;
  display: inline-block;
`;

export const QuestionText = styled.text`
  font-size: 1.8rem;
  color: ${darkLight};
`;

export const Space = styled.div``;

export const Data = styled.div`
  font-size: 1.85rem;
  position: relative;
  margin: 0rem 30% 3rem;
  width: 70%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.2);
  border-radius: 15px 0 0 15px;
  padding: 1.5rem;
`;

export const AnswerText = styled.text`
  font-size: 1.6rem;
  color: ${darkLight};
  margin: 0.5rem 0;
`;

export const Bottom = styled.div`
  color: #4a4e69;
  font-size: 2em;
  margin-top: 10%;
  margin-left: 50%;
  width: 100%;
  transform: translateX(-50%);
  display: inline-block;
  border-radius: 15px 15px 0 0;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.1));
`;
