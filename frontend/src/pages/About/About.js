import React, { useEffect } from 'react';
import { AllPage, Top, Data, Bottom, Border, Question, Space, AnswerText, QuestionText } from './Elements';
import sessionStoreCleaner from '../../components/sessionStoreCleaner';

const About = () => {
  useEffect(() => {
    sessionStoreCleaner.checkAndRemoveSessionStorage();
  }, []);

  return (
    <AllPage>
      <Border>
        <Top>O nas!</Top>
        <Space></Space>
        <Question>
          <QuestionText>Kim jesteśmy?</QuestionText>
        </Question>
        <Data>
          <AnswerText>
            Wystartowaliśmy w 2023 roku. DesignerMatch to platforma, która umożliwia szukanie artystów graficznych do
            zleceń oraz umieszczanie zleceń przez klientów poszukujących usług artystycznych. Głównym celem strony jest
            połączenie artystów graficznych z potencjalnymi klientami, którzy potrzebują ich umiejętności i talentu w
            zakresie projektowania graficznego.
          </AnswerText>
        </Data>
        <Question>
          <QuestionText>Dlaczego my?</QuestionText>
        </Question>
        <Data>
          <AnswerText>1. Duży wybór artystów graficznych.</AnswerText>
          <AnswerText>2. Możliwość przeglądania portfolio.</AnswerText>
          <AnswerText>3. Proces łatwego składania ofert.</AnswerText>
        </Data>
        <Bottom>Zarejestruj się i sam zobacz!</Bottom>
      </Border>
    </AllPage>
  );
};

export default About;
