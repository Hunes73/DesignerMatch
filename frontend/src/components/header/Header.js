import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth';
import { useNavigate } from 'react-router-dom';
import Dropdown from './DropDown/DropDownUser';
import {
  Nav,
  NavLink,
  NavMenu,
  ButtonLogout,
  NavBtnLink,
  NavItemBtn,
  NavItem,
  NavLogo,
  NavbarContainer,
  MobileIcon,
  Button,
  NavLogoIcon,
  XIcon,
  ThreeLineIcon,
  DownPointerIcon,
} from './NavbarElements';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [role, setRole] = useState('');
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/" onClick={closeMobileMenu}>
            <NavLogoIcon />
            DesignerMatch
          </NavLogo>
          <MobileIcon onClick={handleClick}>{click ? <XIcon /> : <ThreeLineIcon />}</MobileIcon>
          <NavMenu onClick={handleClick} click={click}>
            <NavItem>
              <NavLink to="/about" onClick={closeMobileMenu}>
                Informacje
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/" onClick={closeMobileMenu}>
                Artyści
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/commissions" onClick={closeMobileMenu}>
                Zlecenia
              </NavLink>
            </NavItem>
            {!auth.user ? (
              <NavItem>
                <NavLink to="/sign-in" onClick={closeMobileMenu}>
                  Logowanie
                </NavLink>
              </NavItem>
            ) : (
              <NavItem></NavItem>
            )}
            {!auth.user ? (
              <>
                <NavItemBtn>
                  {button ? (
                    <NavBtnLink to="/sign-up">
                      <Button fontBig primary>
                        Rejestracja
                      </Button>
                    </NavBtnLink>
                  ) : (
                    <NavBtnLink to="/sign-up">
                      <Button onClick={closeMobileMenu} fontBig primary>
                        Rejestracja
                      </Button>
                    </NavBtnLink>
                  )}
                </NavItemBtn>
              </>
            ) : (
              <>
                {window.innerWidth <= 960 ? (
                  <>
                    <NavItem>
                      <NavLink to="/account" onClick={closeMobileMenu}>
                        Konto
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="/chat" onClick={closeMobileMenu}>
                        Wiadomości
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="/" onClick={handleLogout}>
                        Wyloguj
                      </NavLink>
                    </NavItem>
                  </>
                ) : (
                  <NavItemBtn>
                    <NavBtnLink to="/account" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                      <Button onClick={closeMobileMenu} fontBig primary>
                        Konto <DownPointerIcon />
                      </Button>
                      {dropdown && <Dropdown />}
                    </NavBtnLink>
                  </NavItemBtn>
                )}
              </>
            )}
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
}

export default Navbar;

/*
state = { clicked: false}
 
handleClick = () => {
    this.setState({clicked: !this.state.clicked})
}*/
