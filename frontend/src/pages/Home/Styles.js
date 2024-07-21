import { COLORS } from '../../components/Colors';
import styled from 'styled-components';

export const AllPage = styled.div`
  position: relative;
  height: 100vh;
  min-width: 350px;
  justify-content: center;
  align-items: center;
  display: contents;
`;

export const HeroContainer = styled.div`
    margin: 7vh 2vw 0vh 2vw;
    padding; 0 1rem;
    @media only screen and (max-width: 1024px) {
        margin-top: 2.5rem;
        display: fixed;
      }
`;

export const SortButton = styled.button`
  margin-left: 0;
`;
export const SortLabel = styled.label`
  margin-left: 0;
  @media only screen and (max-width: 1200px) {
  }
`;
//>*:not(HeroContainer)
export const Sort = styled.div`
  margin-top: 10%;
  border: 2px solid red;
`;

export const HeroBG = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export const HeroContent = styled.div`
  z-index: 3;
  max-height: 100%;
`;

export const HeroItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 25%;
  max-height: 100%;
  padding: 0;
  color: #fff;
  line-height: 1.1;
  font-weight: bold;
`;
export const HeroH1 = styled.div`
  font-size: clamp(1.5rem, 6vw, 4rem);
  letter-spacing: 3px;
  padding: 0 1rem;
`;

export const HeroH2 = styled.div`
  font-size: clamp(1rem, 3vw, 3rem);
`;
