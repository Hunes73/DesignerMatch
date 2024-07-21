import React, { useEffect } from 'react';
import styled from 'styled-components';
import { logo } from '../../assets/img/svg/SvgIcons';
import './HeaderFont.css';
import { Top, Data, Bottom, Question, Space, AnswerText, QuestionText } from '../About/Elements';
import sessionStoreCleaner from '../../components/sessionStoreCleaner';

const Variable = { size: '50%' };
export const LogoIcon = styled(logo)`
  transform: translateY(-0.3rem);
  height: 200px;
  width: auto;
  color: #555978;
`;
export const AllPage = styled.div`
  position: static;
  height: calc(90vh - 50px);
  padding: 0 1rem;
  color: white;
  overflow: hidden;
  @media only screen and (min-width: 960px) {
    left: ${Variable.size};
    margin-right: ${Variable.size};
    transform: translateX(${Variable.size});
    top: 0;
  }
`;

export const Border = styled.div`
  @media only screen and (min-width: 960px) {
    margin-top: 40vh;
  }
  background: linear-gradient(to left, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.35));
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 15px;
  width: 50rem;
`;

export const Label = styled.label`
  color: #555978;
  font-size: 3.25rem;
  font-family: 'Norwesterregular';
  top: 50%;
  left: 17rem;
  position: fixed;
`;

export const Label2 = styled.label`
  color: #555978;
  font-size: 1.8rem;
  left: 18rem;
  position: fixed;
  top: 60%;
`;
const Code404 = () => {
  useEffect(() => {
    sessionStoreCleaner.checkAndRemoveSessionStorage();
  }, []);

  return (
    <AllPage>
      <Border>
        <div>
          <LogoIcon />
          <Label> DESIGNERMATCH </Label>
          <Label2> Nie znaleziono strony, błąd 404 </Label2>
        </div>
      </Border>
    </AllPage>
  );
};

export default Code404;
