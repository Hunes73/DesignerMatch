import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { xIcon, threeLine, betterX, DownPointer, logoHeader } from '../../assets/img/svg/SvgIcons';
import './HeaderFont.css';
import { COLORS } from '../Colors';

const { darkLight, darkLight2, primary } = COLORS;

export const NavbarContainer = styled.div`
  z-index: 1;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  height: 80px;
  @media screen and (max-width: 960px) {
    padding-right: 30px;
  }
`;

export const Button = styled.button`
text-align: center;
cursor: pointer;
background: none;
padding: 1px 6px;
color: rgba(255, 255, 255, 0.75);
border: 2px solid rgba(255, 255, 255, 0.75);
border-radius: 5px;
transition: all 0.2s ease-in-out;
text-decoration: none;
margin-right: 10px;
font-size: 1.2rem;

&:hover {
  transition: all 0.2s ease-in-out;
  border: 2px solid rgba(0, 0, 0, 0.6);\
  transform: scale(1.1);
}
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

/* tutaj height odpowiada za szerokosc na NavBaru*/
export const Nav = styled.nav`
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.3);
  background: linear-gradient(to right, ${darkLight} 0%, #555978 75%);
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
`;

/*to odpowiada za wygląd logo pisane + ikonka*/
export const NavLogo = styled(Link)`
  color: #fff;
  padding-left: 20px;
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2.7rem;
  display: flex;
  align-items: center;

  @media screen and (max-width: 455px) {
    font-size: 2.4rem; /*znika napis przy małych telefonach */
  }
`;

/*to jest ikona w mobilnych*/
export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 10px;
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

/*Tutaj w @media ogarniasz wysuwane menu*/
export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  bacground: none;
  @media screen and (max-width: 960px) {
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.3);
    background: linear-gradient(to right, ${darkLight} 0%, #555978 75%);
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 60px;
    left: ${({ click }) => (click ? 0 : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
  }
`;

export const NavLogoIcon = styled(logoHeader)`
  height: 60px;
  width: auto;
  color: white;
  margin-right: 0.1rem;
`;

/*Tutaj musi być ta sama wysokośc co NavBaru*/
export const XIcon = styled(betterX)`
  height: 60px;
  width: auto;
  color: white;
`;

export const DownPointerIcon = styled(DownPointer)`
  height: 20px;
  width: auto;
  transform: translateY(3px);
  color: white;
`;
export const ThreeLineIcon = styled(threeLine)`
  height: 60px;
  width: auto;
  color: white;
`;

/*Tutaj poprawić height, dla poswietlanego elemetnu*/
export const NavItem = styled.li`
  height: 60px;
  border-bottom: 2px solid transparent;
  &:hover {
    border-bottom: 2px solid #f1f1f1;
  }
  @media screen and (max-width: 960px) {
    width: 100%;
    &:hover {
      border: none;
    }
  }
`;

export const NavItemBtn = styled.li`
  @media screen and (max-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
  }
`;
export const ButtonLogout = styled.button`
  cursor: pointer;
  font-size: 1.2rem;
  border: none;
  background-color: transparent;

  color: #fff;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  height: 100%;
  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
    &:hover {
      transition: all 0.3s ease;
      box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
    }
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;
  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
    &:hover {
      transition: all 0.3s ease;
      box-shadow: 0px 8px 24px 0 rgba(0, 0, 0, 0.3);
    }
  }
`;

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 16px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
`;
