import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { FACEBOOK_URL, OWN_WEBSITE_URL, INSTAGRAM_URL, TWITTER_URL, LINKEDIN_URL, PINTEREST_URL } from './Regex';
import PropTypes from 'prop-types';
import { COLORS } from './Colors';

const { black, darkLight, secondary, darkLight2, primary, white, gray, gray1 } = COLORS;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.6);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalWrapper = styled.div`
  width: 50rem;
  height: 25rem;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: ${primary};
  color: #000;
  z-index: 10;
  border-radius: 15px;
  @media screen and (max-width: 960px) {
    width: 100%;
  }
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
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.8;
  color: #141414;
  padding: 0 5rem;
  height: 100%;
`;

const Label = styled.a`
  outline: none;
  text-decoration: none;
  color: ${black};
`;

const DivLink = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const Input = styled.input`
  border: ${({ check }) => (check ? '2px' : '1px')} solid ${({ check }) => (check ? 'red' : darkLight)};
  height: 30px;
  margin: 0.5rem 0;
  border-radius: 10px;
  padding: 0 0.5rem;
  color: ${darkLight};
`;

const Button = styled.button`
  cursor: pointer;
  background: ${darkLight};
  color: ${primary};
  border: 0px;
  border-radius: 15px;
  font-size: 1.2rem;
  padding: 0.15rem 1rem;
  margin: 1rem 1rem;
  &:hover {
    background: ${darkLight2};
  }
`;

const InputWebsite = styled(Input)`
  margin-right: 0px;
`;
const ModalLinks = ({
  showModal,
  setShowModal,
  facebook,
  setFacebook,
  instagram,
  linkedin,
  pinterest,
  twitter,
  website,
  setInstagram,
  setLinkedin,
  setPinterest,
  setTwitter,
  setWebsite,
}) => {
  const modalRef = useRef();

  const [link1, setLink1] = useState(facebook);
  const [link2, setLink2] = useState(instagram);
  const [link3, setLink3] = useState(linkedin);
  const [link4, setLink4] = useState(pinterest);
  const [link5, setLink5] = useState(twitter);
  const [link, setLink] = useState(website);

  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  const checkValidFacebook = (e) => {
    setLink1(e.target.value);
    const regex = new RegExp(FACEBOOK_URL);
    if (e.target.value.match(regex) || e.target.value.length === '0') {
      setCheck1(false);
      setFacebook(e.target.value);
    } else {
      setCheck1(true);
      setFacebook('');
    }
  };

  const checkValidInstagram = (e) => {
    setLink2(e.target.value);
    const regex = new RegExp(INSTAGRAM_URL);
    if (e.target.value.match(regex) || e.target.value.length === '0') {
      setCheck2(false);
      setInstagram(e.target.value);
    } else {
      setCheck2(true);
      setInstagram('');
    }
  };

  const checkValidLinekedin = (e) => {
    setLink3(e.target.value);
    const regex = new RegExp(LINKEDIN_URL);
    if (e.target.value.match(regex) || e.target.value.length === '0') {
      setCheck3(false);
      setLinkedin(e.target.value);
    } else {
      setCheck3(true);
      setLinkedin('');
    }
  };

  const checkValidPinterest = (e) => {
    setLink4(e.target.value);
    const regex = new RegExp(PINTEREST_URL);
    if (e.target.value.match(regex) || e.target.value.length === '0') {
      setCheck4(false);
      setPinterest(e.target.value);
    } else {
      setCheck4(true);
      setPinterest('');
    }
  };

  const checkValidTwitter = (e) => {
    setLink5(e.target.value);
    const regex = new RegExp(TWITTER_URL);
    if (e.target.value.match(regex) || e.target.value.length === '0') {
      setCheck5(false);
      setTwitter(e.target.value);
    } else {
      setCheck5(true);
      setTwitter('');
    }
  };

  const checkValidWebsite = (e) => {
    setLink(e.target.value);
    const regex = new RegExp(OWN_WEBSITE_URL);
    if (e.target.value.length === '0' || e.target.value.match(regex)) {
      setCheck(false);
      setWebsite(e.target.value);
    } else {
      setCheck(true);
      setWebsite('');
    }
  };

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <ModalContent>
              <DivLink>
                <Label href="https://www.facebook.com/" target="_blank" rel="noopener">
                  Facebook:
                </Label>
                <Input
                  width="45%"
                  placeholder="facebook.com"
                  value={link1}
                  check={check1}
                  onChange={(e) => checkValidFacebook(e)}
                ></Input>
              </DivLink>
              <DivLink>
                <Label href="https://www.instagram.com/" target="_blank" rel="noopener">
                  Instagram:
                </Label>
                <Input
                  width="45%"
                  placeholder="instagram.com"
                  check={check2}
                  value={link2}
                  onChange={(e) => checkValidInstagram(e)}
                ></Input>
              </DivLink>
              <DivLink>
                <Label href="https://pl.linkedin.com/" target="_blank" rel="noopener">
                  Linkedin:
                </Label>
                <Input
                  width="45%"
                  placeholder="pl.linkedin.com"
                  check={check3}
                  value={link3}
                  onChange={(e) => checkValidLinekedin(e)}
                ></Input>
              </DivLink>
              <DivLink>
                <Label href="https://pl.pinterest.com/" target="_blank" rel="noopener">
                  Pinterest:
                </Label>
                <Input
                  width="45%"
                  placeholder="pl.pinterest.com"
                  check={check4}
                  value={link4}
                  onChange={(e) => checkValidPinterest(e)}
                ></Input>
              </DivLink>
              <DivLink>
                <Label href="https://twitter.com/" target="_blank" rel="noopener">
                  Twitter:
                </Label>
                <Input
                  width="45%"
                  placeholder="twitter.com"
                  check={check5}
                  value={link5}
                  onChange={(e) => checkValidTwitter(e)}
                ></Input>
              </DivLink>
              <DivLink>
                <Label>Własna strona:</Label>
                <Input
                  width="45%"
                  placeholder="www.example.com"
                  value={link}
                  check={check}
                  onChange={(e) => checkValidWebsite(e)}
                ></Input>
              </DivLink>
            </ModalContent>
          </ModalWrapper>
          <Button onClick={() => setShowModal((prev) => !prev)}>Zapisz</Button>
        </Background>
      ) : null}
    </>
  );
};
ModalLinks.propTypes = {
  facebook: PropTypes.string,
  instagram: PropTypes.string,
  linkedin: PropTypes.string,
  website: PropTypes.string,
  pinterest: PropTypes.string,

  setFacebook: PropTypes.func,
  setInstagram: PropTypes.func,
  setLinkedin: PropTypes.func,
  setWebsite: PropTypes.func,
  setPinterest: PropTypes.func,
};
export default ModalLinks;
