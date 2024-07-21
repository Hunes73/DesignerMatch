import React from 'react';
import styled from 'styled-components';
import { logoLoading } from '../assets/img/svg/SvgIcons';

const AllPage = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  justify-content: center;
  padding: 0 rem;
  min-width: 350px;
`;

const Logo = styled(logoLoading)`
  height: 50vh;
  width: auto;
  color: #555978;
  position: absolute;
  top: 50%;
  transform: translateY(calc(50% - 60px));
`;

const LoadingPage = () => {
  return (
    <AllPage>
      <Logo />
    </AllPage>
  );
};

export default LoadingPage;
