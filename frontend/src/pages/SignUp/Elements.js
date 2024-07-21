import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logo } from '../../assets/img/svg/SvgIcons';

import { COLORS } from '../../components/Colors';

const { gray1, darkLight, white } = COLORS;

export const AllPage = styled.div`
  display: flex;
  position: relative;
  height: calc(83vh - 80px);
  justify-content: center;
  left: 50%;
  margin-right: 50%;
  margin-bottom: 10%;
  transform: translate(-50%, 17%);
  padding: 0 rem;
  @media screen and (max-width: 960px) {
    transform: translate(-50%, 10%);
  }
  @media screen and (max-width: 1544px) {
    height: calc(100vh - 80px);
  }
`;

/*zwieksza caly formularz bez loga*/
export const StyledForm = styled.form`
  background: linear-gradient(to left, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.35));
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
  margin: 15px auto;
  border-radius: 5px;
  transform: translateY(3rem);
  width: 25rem;
  padding: 24px;
  text-align: center;
  position: absolute;
  scale: 1.15;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 960px) {
    width: 80vw;
  }
`;

export const StyledLabel = styled.label`
  display: block;
  position: relative;
  transform: translate(-37%, 1.9rem);
  color: lightgrey;
  font-size: 0.8rem;
  transition:
    left 0.3s,
    opacity 0.3s;
`;

export const StyledInput = styled.input`
  display: absolute;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const StyledAlert = styled.div`
  padding: 10px;
  background-color: #f44336;
  color: white;
  margin: 5px auto 5px;
  border-radius: 5px;
`;

export const MainName = styled.div`
  font-size: 2.35em;
  color: rgba(255, 255, 255, 0.75);
  font-family: 'Norwesterregular';
  position: absolute;
  color: #555978;
  transform: translateY(-1.8rem);
  @media screen and (max-width: 960px) {
    font-size: 0px;
  }
`;

export const LogoIcon = styled(logo)`
  transform: translateY(-0.3rem);
  height: 200px;
  width: auto;
  color: #555978;
`;

export const LineForm = styled.div`
  margin: 20px 0px 20px 0px;
  width: 100%;
  height: 1px;
  background-color: #bbb;
`;

export const InputLabel = styled.label`
  color: #888;
  position: absolute;
  top: 12px;
  left: 15px;
  background: none;
  font-size: 14px;
  transition: 0.3s;
`;

export const InputField = styled.input`
  outline: none;
  border: 0px solid #dadce0;
  font-size: 0.8rem;
  width: 100%;
  border: none;
  border-radius: 5px;
  color: rgb(1, 1, 1);
  padding: 12px 24px;
  background-color: #ddd;
  &:focus {
    border: 2px solid black;
  }

  &:valid + ${InputLabel} {
    left: 200px;
    opacity: 0;
  }

  &:focus + ${InputLabel} {
    left: 200px;
    opacity: 0;
    transition: 0.3s;
  }
`;

export const CenterInput = styled.div`
  display: flex;
  padding-bottom: 15px;
  height: 100%;
  position: relative;
`;

export const InputGroup = styled.div`
  position: relative;
  top: 15px;
  padding-bottom: 15px;
  width: 100%;
`;

export const InputGroupSecond = styled.div`
  position: relative;
  top: 15px;
  padding-bottom: 15px;
  width: 100%;
  margin-left: 10px;
`;

export const CenterButton = styled.div`
  position: relative;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 0.9rem;
  height: 100%;
`;

export const Button = styled(Link)`
  background: transparent;
  border: none;
  border-radius: 5px;
  margin-left: 5px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.15);
  color: rgb(255, 255, 255);
  padding: 10px 15px;
  background: transparent;
  text-decoration: none;
  width: 70%;
  font-size: 16px;
  transition: 0.3s;
  background: linear-gradient(to top, #4a4e69, #555978);
  margin: 5px 0px;
  &:hover {
    transform: scale(1.05);
  }
`;

export const SignUpButton = styled(Button)`
  background: linear-gradient(to top, #4a4e69, #555978);
  margin: 5px 0px;
  box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.35);
`;

export const DisabledButton = styled(SignUpButton)`
  color: currentColor;
  cursor: not-allowed;
  opacity: 0.5;
`;

export const GoogleButton = styled(Button)`
  background: linear-gradient(to top, #3dc428, #5ad946);
  margin-bottom: 15px;
`;

export const FacebookButton = styled(Button)`
  background: linear-gradient(to top, #4267b2, #5074be);
  margin-bottom: 10px;
`;

export const ErrorLabel = styled.label`
  color: red;
  font-size: 0.8rem;
`;

export const ErrorLabel2 = styled(ErrorLabel)`
  margin-left: 50px;
  margin-right: 50px;
  transform: translateX(0);
`;

export const InputsWrapper = styled.div``;

export const InfoText = styled.text`
  font-size: 1.3rem;
  color: ${gray1};
  margin: 1rem 0 0.5rem 0;
`;

export const RoleText = styled.text`
  font-size: 1rem;
  color: ${darkLight};
  margin: 0rem 0 0rem 0;
`;

export const RolesWrapper = styled.div`
  height: 10rem;
  justify-content: space-evenly;
  display: flex;
  align-items: start;
  flex-direction: column;
  padding: 0 2rem 3rem 2rem;
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckBox = styled.input`
  display: none;
`;

export const CheckBoxLabel = styled.label`
  display: inline-block;
  margin-right: 1rem;
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
