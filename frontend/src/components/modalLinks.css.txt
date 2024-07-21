import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import { xIcon } from '../assets/img/svg/SvgIcons';


    const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
      overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0.5vw;
      }
    
      &::-webkit-scrollbar-track {
        background: grey;
      }
    
      &::-webkit-scrollbar-thumb {
        background: #888;
      }
    
      &::-webkit-scrollbar-thumb:hover {
        background: red;
      }
`;


const ModalContent = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 125px;
  margin-left: 100px;
  line-height: 1.8;
  color: #141414;
`;

const ButtonClose = styled.button`
cursor: pointer;
position: absolute;
top: 20px;
right: 20px;
width: 32px;
height: 32px;
padding: 0;
z-index: 10;
`;

const Label = styled.a`
margin-right: 10px;
outline: none;
text-decoration: none;
color: black;
`
const DivLink = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`
const Input = styled.input`
      width: ${({width}) => width};
      border: ${({check}) => check ? '2px' : '1px' } solid ${({check}) => check ? 'red' : 'black' };
      height: 30px;
      margin-bottom: 10px; 
      margin-right: 33%;
`

const InputWebsite = styled(Input)`
  margin-right: 0px;
`
const ModalLinks = ({showModal, setShowModal}) => {
    const modalRef = useRef();
    const [link1, setLink1] = useState("");
    const [link2, setLink2] = useState("");
    const [link3, setLink3] = useState("");
    const [link4, setLink4] = useState("");
    const [link5, setLink5] = useState("");
    const [link, setLink] = useState("");
    const [short, setShort] = useState("");
    const [check, setCheck] = useState(false);
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [check5, setCheck5] = useState(false);

    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression); 

const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );


  const checkValidLink1 = (e) => {
    setLink1(e.target.value);
    if(e.target.value.match(regex)  || e.target.value.length == "0")setCheck1(false);
    else setCheck1(true);
  }
    const checkValidLink2 = (e) => {
  setLink2(e.target.value);
      if(e.target.value.match(regex) || e.target.value.length == "0") setCheck2(false);
      else setCheck2(true);
    }
  const checkValidLink3 = (e) => {
  setLink3(e.target.value);
    if(e.target.value.match(regex) || e.target.value.length == "0") setCheck3(false);
    else setCheck3(true);
  }
const checkValidLink4 = (e) => {
   setLink4(e.target.value);
  if(e.target.value.match(regex) || e.target.value.length == "0") setCheck4(false);
  else setCheck4(true);
}
const checkValidLink5 = (e) => {
  setLink5(e.target.value);
  if(e.target.value.match(regex)  || e.target.value.length == "0") setCheck5(false);
  else setCheck5(true);
}

const checkValidLink = (e) => {
    setLink(e.target.value);
    if((e.target.value.length == "0" && short.length == "0" ) || (e.target.value.match(regex) && short.length >= 3 && e.target.value.length > "0")) setCheck(false);
    else setCheck(true);
}

const checkValidShort = (e) => {
    setShort(e.target.value);
  if((e.target.value.length == "0" && link.length == "0") || (e.target.value.length >= 3 && link.match(regex) && link.length > "0")) setCheck(false);
  else setCheck(true);
}
   

  return (
    <>
        {showModal ? ( 
            <Background onClick={closeModal} ref={modalRef}>
                <ModalWrapper showModal={showModal}>
                    <ModalContent>

                        <DivLink>

                           <Label href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook:</Label>
                            <Input width="45%" placeholder='facebook.com' value={link1} check = {check1} onChange = {(e) => checkValidLink1(e)}></Input>
                        </DivLink>
                        <DivLink>
                          <Label href="https://www.instagram.com/"target="_blank" rel="noopener" >Instagram:</Label>
                            <Input width="45%" placeholder='instagram.com'check = {check2}  value={link2} onChange = {(e) => checkValidLink2(e)} ></Input>
                        </DivLink>
                        <DivLink>
                        <Label href="https://pl.linkedin.com/" target="_blank" rel="noopener">Linekedin:</Label>
                            <Input width="45%" placeholder='pl.linkedin.com' check = {check3} value={link3} onChange = {(e) => checkValidLink3(e)}></Input>
                        </DivLink>
                        <DivLink>
                        <Label href="https://pl.pinterest.com/" target="_blank" rel="noopener">Pinterest:</Label>
                            <Input width="45%" placeholder='pl.pinterest.com' check = {check4}value={link4} onChange = {(e) => checkValidLink4(e)}></Input>
                        </DivLink>
                        <DivLink>
                        <Label href="https://twitter.com/" target="_blank" rel="noopener">Twitter:</Label>
                            <Input width="45%" placeholder='twitter.com' check = {check5} value={link5} onChange = {(e) => checkValidLink5(e)}></Input>
                        </DivLink>
                        <label>Own website:</label>
                        <div >
                            <InputWebsite width="20%" placeholder='Example >= 3' value={short} check = {check} onChange = {(e) => checkValidShort(e)}></InputWebsite>
                            <InputWebsite width="45%" placeholder='www.example.com' value={link} check = {check}  style={{marginLeft: "15px"}} onChange = {(e) => checkValidLink(e)}></InputWebsite>
                        </div>
                        <ButtonClose onClick={() => setShowModal(prev => !prev)}>X</ButtonClose>
                    </ModalContent>
                </ModalWrapper >
            </Background>
         ) : null}
    </>
  )
};

export default ModalLinks;