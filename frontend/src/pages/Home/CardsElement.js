import styled from 'styled-components';
import { COLORS } from '../../components/Colors';
import { Link } from 'react-router-dom';

const { darkLight, darkLight2, primary, gray, gray1, secondary, secondary1, black, white } = COLORS;

export const Cards2 = styled.div`
  background: transparent;
  @media screen and (max-width: 960px) {
    display: flex;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  max-width: 1120px;
  width: 90%;
  margin: 0 auto;
`;

export const SortLabel = styled.div``;

export const SortButton = styled.button`
  margin-left: 10px;
`;

//>*:not(HeroContainer)
export const Sort = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 1120px;
  width: 90%;
  margin: 0 auto 0;
  align-items: center;
  list-style: none;
`;
export const Sort2 = styled.div`
  display: flex;
  max-width: 1120px;
  width: 90%;
  margin: 0 auto 0;
  align-items: center;
  list-style: none;
`;

export const FilterWrapper = styled.div`
  flex: 1;
  flex-flow: column;
  width: 17rem;
  height: 80vh;
  display: flex;
  background: ${primary};
  border-radius: 10px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
  margin-top: 0.5rem;
`;

export const FilterLabel = styled.div`
  position: fixed;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

export const FilterScroll = styled.div`
  overflow-y: auto;
  padding-bottom: 15rem;
  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    background: ${primary};
  }

  &::-webkit-scrollbar-thumb {
    background: ${gray1};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${darkLight};
  }
`;

export const TitleText = styled.text`
  color: ${darkLight};
  font-size: 2.2rem;
  @media screen and (max-width: 960px) {
    margin-left: 1rem;
  }
`;

export const SubtitleText = styled.text`
  color: ${black};
  font-size: 1.5rem;
  margin: 0rem 0 0rem 1rem;
`;

export const CheckBox = styled.input`
  display: none;
`;

export const CheckBoxLabel = styled.label`
  display: inline-block;
  margin: 0rem 1rem 0 2rem;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  background: ${white};
  border: 2px solid ${darkLight};
  transition: all 150ms;
  cursor: pointer;
  &:hover {
    background: ${darkLight};
  }
  ${CheckBox}:checked + & {
    background: ${darkLight};
  }
  ${CheckBox}:focus + & {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  }
  @media screen and (max-width: 960px) {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

export const CheckBoxWrapper = styled.div`
  flex-direction: row;
  margin: 1rem 1rem;
  align-items: center;
  display: flex;
`;

export const CheckBoxContainter = styled.div`
  justify-content: center;
  display: flex;
`;

// do zmiany
export const JobText = styled(SubtitleText)`
  color: ${gray1};
  font-size: 1.5rem;
  margin: 0;
  cursor: default;
  ${CheckBox}:checked + & {
    color: ${darkLight};
  }
  @media screen and (max-width: 960px) {
    font-size: 3vw;
  }
`;

export const CheckBoxText = styled(JobText)`
  font-size: 1.2rem;
`;

export const Input = styled.input`
  border-radius: 10px;
  border: 0px;
  color: ${darkLight};
  font-size: 1rem;
  padding: 0.2rem 1rem 0.2rem 0.5rem;
  ::placeholder {
    color: ${gray1};
  }
`;

export const SortLayout = styled.div`
  width: 75vw;
`;

export const StyledSelect = styled.select`
  border-radius: 10px;
  border: 0px;
  font-size: 1rem;
  padding: 0.2rem 1rem 0.2rem 0.5rem;
  color: ${gray1};
`;

//StyledOption, StyledOptgroup do stylizacji
export const StyledOption = styled.option``;

export const StyledOptgroup = styled.optgroup``;

export const CardsLabel = styled.div`
  position: fixed;
  top: 14vh;
  right: 1vw;
  bottom: 0;
  width: 80vw;
  overflow-y: scroll;
`;

export const CardsWrapper = styled.div`
  width: 100%;
  height: 82vh;
  padding-bottom: 10rem;
  padding-top: 0.4rem;
  overflow: auto;
  margin-top: 1.5rem;
  padding-left: 2rem;
  &::-webkit-scrollbar {
    width: 0.5vw;
  }

  &::-webkit-scrollbar-track {
    background: ${primary};
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${darkLight};
  }
`;

export const ProjectPhoto = styled.img`
  margin: 0px 1px 0px 1px;
  width: 20%;
  object-fit: cover;
  cursor: pointer;
  @media screen and (max-width: 1600px) {
    width: 25%;
  }
  @media screen and (max-width: 1400px) {
    width: 33.34%;
  }
  @media screen and (max-width: 1280px) {
    width: 50%;
  }
`;

export const FirstPhoto = styled(ProjectPhoto)`
  margin-left: 20%;
  @media screen and (max-width: 1600px) {
    margin-left: 25%;
  }
  @media screen and (max-width: 1400px) {
    margin-left: 33.34%;
  }
  @media screen and (max-width: 1280px) {
    margin-left: 50%;
  }
`;

export const SecondPhoto = styled(ProjectPhoto)`
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
  @media screen and (max-width: 1280px) {
    display: none;
  }
`;

export const ThirdPhoto = styled(ProjectPhoto)`
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
  @media screen and (max-width: 1400px) {
    display: none;
  }
`;

export const FourthPhoto = styled(ProjectPhoto)`
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
  @media screen and (max-width: 1600px) {
    display: none;
  }
`;

export const SimpleInfoContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 20%;
  height: 100%;
  padding: 1rem 1rem 1rem 1rem;
  flex-direction: column;
  @media screen and (max-width: 1600px) {
    width: 25%;
  }
  @media screen and (max-width: 1400px) {
    width: 33.34%;
  }
  @media screen and (max-width: 1280px) {
    width: 50%;
  }
`;

export const DetailedInfoContainer = styled(SimpleInfoContainer)`
  position: absolute;
  left: 20%;
  margin: 0px;
  width: 20%;
  height: 100%;
  opacity: 0;
  justify-content: flex-start;
  align-items: flex-start;
  @media screen and (max-width: 1600px) {
    left: 25%;
    width: 25%;
  }
  @media screen and (max-width: 1400px) {
    left: 33.34%;
    width: 33.34%;
  }
  @media screen and (max-width: 1280px) {
    left: 50%;
    width: 50%;
  }
`;

export const CardLabel = styled.div`
  border-radius: 10px;
  display: flex;
  box-shadow: 4px 2px 10px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 5vh;
  margin-right: 1vw;
  position: relative;
  height: 17rem;
  width: 95%;
  background: ${secondary1};
  @media screen and (min-width: 960px) {
    &:hover > ${FirstPhoto} {
      transition: opacity 0.4s ease-out;
      opacity: 0.1;
    }
    &:hover > ${DetailedInfoContainer} {
      transition: opacity 0.4s ease-out;
      opacity: 1;
      transform: scale(1.05);
    }
  }
  @media screen and (max-width: 960px) {
    width: 95%;
  }
`;

export const BlankCard = styled.div`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  width: 95%;
  box-shadow: 4px 2px 10px 2px rgba(0, 0, 0, 0.2);
  margin-right: 1vw;
  background: ${secondary1};
  padding: 1.5rem 0;
  color: ${gray1};
  @media screen and (max-width: 960px) {
    width: 95%;
  }
`;

export const CardAvatar = styled.img`
  height: 8rem;
  width: 8rem;
  border-radius: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const LevelText = styled(JobText)`
  color: ${gray1};
`;

export const NameText = styled(JobText)`
  color: ${darkLight};
  font-size: 1.5rem;
`;

export const RatingText = styled(NameText)`
  font-size: 0.9rem;
  margin-left: 0.2rem;
`;

export const CategoryHeaderText = styled(SubtitleText)`
  font-size: 1.5rem;
  margin: 1rem 0 0.5rem 0;
`;

export const CategoryText = styled.text`
  font-size: 1.3rem;
  color: ${gray1};
`;

export const CityText = styled.text`
  font-size: 1.2rem;
  color: ${darkLight};
  font-weight: bold;
`;

export const RightLabel = styled.div`
  position: fixed;
  left: 20rem;
  right: 0px;
  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    left: 0;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const TopSection = styled.div`
  display: flex;
  padding-left: 2rem;
`;

export const FilterButton = styled(Link)`
  display: none;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.15);
  color: rgb(255, 255, 255);
  text-decoration: none;
  padding: 0.2rem 1rem;
  margin-right: 1rem;
  font-size: 1rem;
  background: linear-gradient(to top, #4a4e69, #555978);
  @media screen and (max-width: 960px) {
    display: flex;
  }
`;

export const ClearButton = styled(FilterButton)`
  display: flex;
  background: ${darkLight};
  color: ${primary};
  width: 100%;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  justify-content: center;
`;

export const FilterDropDownContainer = styled.div`
  padding: 1rem;
  cursor: pointer;
`;

export const CategoryWrapper = styled.div`
  margin-top: 1rem;
  padding-left: 1rem;
`;

export const ModalBackground = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ModalWrapper = styled.div`
  width: 100%;
  height: 75%;
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
  background: ${primary};
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
`;

export const FilterModalWrapper = styled.div`
  width: 100%;
  height: 75%;
  // animation: modalFilter 0.5s ease;

  // @keyframes modalFilter {
  //     from {
  //     opacity: 0;
  //     transform: translateY(200px);
  //     }
  //     to {
  //     opacity: 1;
  //     transform: translateY(0);
  //     }
  // }
  background: ${primary};
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.4);
`;

export const ModalButton = styled(FilterButton)`
  display: flex;
  margin: 0;
  justify-content: center;
  width: 9rem;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

export const ModalIconContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  font-size: 2rem;
`;

export const LineForm = styled.div`
  background: #ccc;
  border-radius: 100%;
  height: 1px;
  width: 100%;
`;

export const ModalScroll = styled(FilterScroll)`
  max-height: 100%;
`;
