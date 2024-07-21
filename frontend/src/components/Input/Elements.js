import styled from 'styled-components';
import { closeEye, openEye } from '../../assets/img/svg/SvgIcons';
import { COLORS } from '../Colors';

const { gray1, darkLight } = COLORS;

export const LabelInput = styled.label`
  position: absolute;
  background: none;
  font-size: 1.2rem;
  top: 1rem;
  left: 25px;
  transition: 0.3s;
  cursor: text;
  color: grey;
`;

export const InputGroup = styled.div`
  position: relative;
  margin: 0 0.5rem;
  padding: 0.4rem 0;
`;

export const Input = styled.input`
  outline: none;
  border: 0 solid #dadce0;
  font-size: 0.8rem;
  width: 100%;
  border-radius: 10px;
  color: rgb(1, 1, 1);
  padding: 12px 24px;
  border-bottom: 2px solid white;
  border-bottom: 2px solid ${({ value, checkRegex }) => (value ? (checkRegex ? 'black' : 'red') : 'none')};
  padding-right: ${({ isWithButton }) => (isWithButton ? '45px' : '10px')};
  &:valid + ${LabelInput} {
    left: 250px;
    opacity: 0;
  }
  &::-ms-reveal {
    display: none;
  }
  &:focus {
    border-bottom: 2px solid ${({ value, checkRegex }) => (value ? (checkRegex ? 'black' : 'red') : 'black')}; //tutaj dziala po kliknieciu, a po wpisaniu dziala wyzej
  }

  &:focus + ${LabelInput} {
    left: 250px;
    opacity: 0;
    transition: 0.4s;
  }
`;
export const OpenEyeIcon = styled(openEye)`
  height: 30px;
  width: auto;
  transform: translateY(0.2rem);
`;
export const CloseEyeIcon = styled(closeEye)`
  height: 30px;
  width: auto;
  transform: translateY(0.2rem);
`;

export const NotButton = styled.div`
  position: absolute;
  transform: translateX(-39px);
  display: inline;
  cursor: pointer;
  padding: 2px 5px;
  color: ${gray1};
  &:hover {
    color: ${darkLight};
  }
`;
