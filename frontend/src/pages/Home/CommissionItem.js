import React from 'react';
import { CommissionLabel, CommissionTitle, CommissionTitleContainer } from './CommissionsElements';
import { CommissionBottom, CommissionBubble, CommissionText, CommissionTop, LevelBubble } from './CommissionsElements';
import { TitleText } from './CardsElement';

function CommissionItem(props) {
  return (
    <CommissionLabel>
      <CommissionTop>
        <CommissionTitleContainer>
          <CommissionTitle>{props.title}</CommissionTitle>
          <LevelBubble>{props.level}</LevelBubble>
        </CommissionTitleContainer>
        <TitleText>{props.rate} PLN</TitleText>
      </CommissionTop>
      <div>
        <CommissionText>{props.location}</CommissionText>
        <CommissionText>{props.deadline}</CommissionText>
      </div>
      <CommissionBottom>
        {props.tags.map((tag, indexT) => (
          <CommissionBubble key={indexT}>{tag}</CommissionBubble>
        ))}
      </CommissionBottom>
    </CommissionLabel>
  );
}

export default CommissionItem;
