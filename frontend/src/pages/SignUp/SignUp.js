import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/Auth';
import { default as axios } from '../../api/axios';
import { useGoogleLogin } from '@react-oauth/google';
import {
  FacebookButton,
  ErrorLabel,
  ErrorLabel2,
  CenterInput,
  InputGroupSecond,
  CenterButton,
  Button,
  SignUpButton,
  GoogleButton,
  LineForm,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledAlert,
  StyledLabel,
  MainName,
  AllPage,
  LogoIcon,
  InputsWrapper,
  InfoText,
  RoleText,
  CheckBoxWrapper,
  RolesWrapper,
  CheckBox,
  CheckBoxLabel,
  SmallInfoText,
} from './Elements';
import InputText from '../../components/Input/InputText';
import PasswordInput from '../../components/Input/PasswordInput';
import FacebookLogin from '@greatsumini/react-facebook-login';
import ModalConfirm from '../../components/ModalConfirm';
import { useEffect } from 'react';
import {
  USERNAME_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  EMAIL_REGEX,
  NIP_REGEX,
  REGON_9_REGEX,
  REGON_14_REGEX,
  KRS_REGEX,
} from '../../components/Regex';
import sessionStoreCleaner from '../../components/sessionStoreCleaner';
import { COLORS } from '../../components/Colors';

const { darkLight, gray1 } = COLORS;

function LoginForm() {
  const [email, setEmail] = useState('');
  const [nick, setNick] = useState('');
  const [name, setName] = useState('');
  const [NIP, setNIP] = useState('');
  const [REGON, setREGON] = useState('');
  const [KRS, setKRS] = useState(null);
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false); //
  const [navigateGo, setNavigateGo] = useState(false); //po zamknięciu modala przekierowywuje na stronę główną
  const [submitting, setSubmitting] = useState(false);
  const [checkRegexEmail, setCheckRegexEmail] = useState(true);
  const [checkRegexNick, setCheckRegexNick] = useState(true);
  const [checkRegexName, setCheckRegexName] = useState(true);
  const [checkRegexNIP, setCheckRegexNIP] = useState(true);
  const [checkRegexREGON, setCheckRegexREGON] = useState(true);
  const [checkRegexKRS, setCheckRegexKRS] = useState(true);
  const [checkRegexSurname, setCheckRegexSurname] = useState(true);
  const [checkRegexPassword, setCheckRegexPassword] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [allInput, setAllInput] = useState(true);
  const [loading, setLoading] = useState(false);

  const authApi = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || '/';

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleCheckBlockButton = () => {
    if (name === '' || surname === '' || nick === '' || email === '' || password === '') {
      setAllInput(false);
      setSubmitting(false);
    } else if (checkRegexName && checkRegexEmail && checkRegexNick && checkRegexSurname && checkRegexPassword) {
      setLoading(true);
      handleRegistration();
    } else setSubmitting(false);
  };

  const handleCompanyCheckBlockButton = () => {
    if (name === '' || NIP === '' || REGON === '' || email === '' || nick === '' || password === '') {
      setAllInput(false);
      setSubmitting(false);
    } else if (
      checkRegexName &&
      checkRegexNIP &&
      checkRegexREGON &&
      checkRegexKRS &&
      checkRegexEmail &&
      checkRegexNick &&
      checkRegexPassword
    ) {
      setLoading(true);
      handleCompanyRegistration();
    } else setSubmitting(false);
  };

  const clear = () => {
    setEmail('');
    setNick('');
    setName('');
    setSurname('');
    setPassword('');
    setNIP('');
    setREGON('');
    setKRS('');
    setCheckRegexEmail(true);
    setCheckRegexName(true);
    setCheckRegexNick(true);
    setCheckRegexPassword(true);
    setCheckRegexPassword(true);
    setAllInput(true);
    setCheckRegexNIP(true);
    setCheckRegexREGON(true);
    setCheckRegexKRS(true);
  };

  const handleRegistration = async (e) => {
    try {
      setSubmitting(true);
      const response = await axios.post(
        '/auth/registerArtist',
        JSON.stringify({
          email: email,
          username: nick,
          password: password,
          firstname: name,
          lastname: surname,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      setSubmitting(false);
      console.log(response);
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      clear();
      setShowModal(true);
      setLoading(false);
    } catch (err) {
      setSubmitting(false);
      if (!err?.response) {
        console.log('No Server Response');
      } else if (err.response?.status === 409) {
        console.log('Username Taken');
      } else {
        console.log('Registration Failed');
        console.log(err);
      }
    }
  };

  const handleCompanyRegistration = async (e) => {
    try {
      setSubmitting(true);
      const response = await axios.post(
        '/auth/registerCompany',
        JSON.stringify({
          email: email,
          username: nick,
          password: password,
          name: name,
          nip: NIP,
          regon: REGON,
          krs: KRS,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      console.log(response.data);
      console.log(response.data.accessToken);
      console.log(response?.accessToken);
      setSubmitting(false);
      clear();
      setShowModal(true);
      setLoading(false);
      console.log(JSON.stringify(response));
    } catch (err) {
      setSubmitting(false);
      if (!err?.response) {
        console.log('No Server Response');
      } else if (err.response?.status === 409) {
        console.log('Username Taken');
      } else {
        console.log('Registration Failed');
        console.log(err);
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: (CodeResponse) => {
      console.log(CodeResponse);
      authApi.login('Michal', 'pssw');
      navigate(redirectPath, { replace: true });
    },
    flow: 'auth-code',
  });

  useEffect(() => {
    if (navigateGo) navigate('/sign-in');
  }, [navigateGo]);

  useEffect(() => {
    sessionStoreCleaner.checkAndRemoveSessionStorage();
  }, []);
  const handleName = (value) => {
    setName(value);
    if (value && namesPatternValidation(value)) setCheckRegexName(true);
    else setCheckRegexName(false);
  };

  const handleSurname = (value) => {
    setSurname(value);
    setAllInput(true);
    if (value && namesPatternValidation(value)) setCheckRegexSurname(true);
    else setCheckRegexSurname(false);
  };
  const handleNick = (value) => {
    setNick(value);
    setAllInput(true);
    if (value && usernamesPatternValidation(value)) setCheckRegexNick(true);
    else setCheckRegexNick(false);
  };
  const handleEmail = (value) => {
    setEmail(value);
    setAllInput(true);
    if (value && emailPatternValidation(value)) setCheckRegexEmail(true);
    else setCheckRegexEmail(false);
  };

  const handlePassword = (value) => {
    setPassword(value);
    setAllInput(true);
    if (value && passwordPatternValidation(value)) setCheckRegexPassword(true);
    else setCheckRegexPassword(false);
  };

  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
    setAllInput(true);
    if (value && passwordPatternValidation(value)) setCheckRegexPassword(true);
    else setCheckRegexPassword(false);
  };

  const handleNIP = (value) => {
    setNIP(value);
    if (value && nipPatternValidation(value) && isNipValid(value)) setCheckRegexNIP(true);
    else setCheckRegexNIP(false);
  };

  const handleREGON = (value) => {
    setREGON(value);
    if (value && regonPatternValidation(value) && isRegonValid(value)) setCheckRegexREGON(true);
    else setCheckRegexREGON(false);
  };

  const handleKRS = (value) => {
    setKRS(value);
    if (value && krsPatternValidation(value)) setCheckRegexKRS(true);
    else setCheckRegexKRS(false);
  };

  function passwordPatternValidation(password) {
    const regex = new RegExp(PASSWORD_REGEX);
    return regex.test(password);
  }

  function emailPatternValidation(email) {
    const regex = new RegExp(EMAIL_REGEX);
    return regex.test(email);
  }

  function namesPatternValidation(name) {
    const regex = new RegExp(NAME_REGEX);
    return regex.test(name);
  }

  function usernamesPatternValidation(username) {
    const regex = new RegExp(USERNAME_REGEX);
    return regex.test(username);
  }

  function nipPatternValidation(text) {
    const regex = new RegExp(NIP_REGEX);
    return regex.test(text);
  }

  function regonPatternValidation(name) {
    if (name.length === 9) {
      const regex = new RegExp(REGON_9_REGEX);
      return regex.test(name);
    } else if (name.length === 14) {
      const regex = new RegExp(REGON_14_REGEX);
      return regex.test(name);
    } else {
      return false;
    }
  }

  function krsPatternValidation(name) {
    if (name === '' || name === null) {
      return true;
    }
    const regex = new RegExp(KRS_REGEX);
    return regex.test(name);
  }

  function isNipValid(nip) {
    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];

    function getOnlyDigits(value) {
      return value.replace(/[^0-9]/gi, '');
    }

    nip = getOnlyDigits(nip);

    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i] * parseInt(nip[i]);
    }

    const checkSum = sum % 11;

    if (checkSum !== parseInt(nip[9])) {
      return false;
    }

    return true;
  }

  function isRegonValid(regon) {
    const weights9 = [8, 9, 2, 3, 4, 5, 6, 7];
    const weights14 = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];

    function getOnlyDigits(value) {
      return value.replace(/[^0-9]/gi, '');
    }

    regon = getOnlyDigits(regon);

    function isCorrect(value, weights) {
      let sum = 0;

      for (let i = 0; i < weights.length; i++) {
        sum += weights[i] * parseInt(value[i]);
      }

      const checkValue = parseInt(value[weights.length]);
      const checkSum = sum % 11;

      if (checkSum === 10) {
        return checkValue === 0;
      }

      return checkSum === checkValue;
    }

    let isValid;

    if (regon.length === 9) {
      isValid = isCorrect(regon, weights9);
    } else {
      isValid = isCorrect(regon, weights14);
    }

    if (!isValid) {
      return false;
    }

    return true;
  }

  const handleCompanyOption = () => {
    setUserRole('COMPANY');
  };

  const handleArtistOption = () => {
    setUserRole('ARTIST');
  };

  return (
    <>
      {showModal && <ModalConfirm showModal={showModal} setShowModal={setShowModal} />}
      <AllPage>
        <MainName>REJESTRACJA</MainName>
        <StyledForm>
          <LogoIcon />
          {!userRole ? (
            <>
              <InfoText>Zarejestruj się jako:</InfoText>
              <RolesWrapper>
                <CheckBoxWrapper>
                  <CheckBox type="checkbox" id={'artist'} onClick={handleArtistOption} />
                  <CheckBoxLabel htmlFor={'artist'} />
                  <RoleText>Osoba prywatna</RoleText>
                </CheckBoxWrapper>
                <CheckBoxWrapper>
                  <CheckBox type="checkbox" id={'company'} onClick={handleCompanyOption} />
                  <CheckBoxLabel htmlFor={'company'} />
                  <RoleText>Firma</RoleText>
                </CheckBoxWrapper>
              </RolesWrapper>
            </>
          ) : null}
          {userRole === 'ARTIST' && (
            <InputsWrapper>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <InputText label="imię:" id="nameId" value={name} onChange={handleName} checkRegex={checkRegexName} />
                <InputText label="nazwisko:" id="surnameId" onChange={handleSurname} checkRegex={checkRegexSurname} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {((!checkRegexName && name !== '') || (!checkRegexSurname && surname !== '')) && (
                  <ErrorLabel2>Imię i nazwisko powinny zaczynać się od wielkiej litery</ErrorLabel2>
                )}
              </div>
              <InputText label="email:" id="emailId" onChange={handleEmail} checkRegex={checkRegexEmail} />
              {!checkRegexEmail && email !== '' && <ErrorLabel>Wpisano email w nieprawidłowym formacie.</ErrorLabel>}
              <InputText label="login:" id="nickId" onChange={handleNick} checkRegex={checkRegexNick} />
              {!checkRegexNick && nick !== '' && (
                <ErrorLabel>Wpisano niedozwolone znaki w nazwie użytkownika</ErrorLabel>
              )}
              <PasswordInput
                label="hasło:"
                name="signUp"
                id="passwordId"
                onChange={handlePassword}
                checkRegex={checkRegexPassword}
              />
              {!checkRegexPassword && password !== '' && (
                <ErrorLabel>
                  Hasło musi zawierać wielkie i małe litery, liczby, oraz conajmiej jeden znak specjalny: !@#$%\nHasło
                  musi zawierać między 8 a 24 znaki.{' '}
                </ErrorLabel>
              )}
              {!allInput && <ErrorLabel>Wszystkie pola musza być wypełnione!</ErrorLabel>}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {!submitting ? (
                  <SignUpButton onClick={handleCheckBlockButton} type="submit" value="Submit">
                    Zarejestruj się jako artysta
                  </SignUpButton>
                ) : (
                  <SignUpButton type="submit" value="Submit">
                    Zarejestruj się jako artysta
                  </SignUpButton>
                )}
                {loading && <ErrorLabel style={{ color: gray1, marginTop: '0.5rem' }}>Rejestruję . . .</ErrorLabel>}
                {/*{ enabled ?<LoginButton to='/' type="submit" onClick = {e => handleSubmit(e)}>Zaloguj się</LoginButton> :<LoginButton to='' type="submit" onClick= {e => handleSubmit(e)}>Zaloguj się</LoginButton>}*/}
                <LineForm />
                {/* <GoogleButton to='' type="button" onClick={() => login()} >Kontynuuj z google</GoogleButton> */}
                <FacebookLogin
                  appId="739036054553215"
                  scope={email}
                  onSuccess={(response) => {
                    console.log('Login Success!', response);
                  }}
                  onFail={(error) => {
                    console.log('Login Failed!', error);
                  }}
                  onProfileSuccess={(response) => {
                    console.log('Get Profile Success!', response);
                    authApi.login(response.name, 'passwordini');
                    navigate(redirectPath, { replace: true });
                  }}
                  render={({ onClick }) => (
                    <></>
                    // <FacebookButton onClick={onClick}>Kontynuuj z Facebook</FacebookButton>
                  )}
                />
              </div>
            </InputsWrapper>
          )}
          {userRole === 'COMPANY' && (
            <InputsWrapper>
              <InputText label="nazwa firmy:" id="nameId" onChange={handleName} checkRegex={checkRegexName} />
              {!checkRegexName && name !== '' && (
                <ErrorLabel>Nazwa powinna zaczynać się od wielkiej litery.</ErrorLabel>
              )}
              <InputText label="NIP:" id="NIPId" onChange={handleNIP} checkRegex={checkRegexNIP} />
              {!checkRegexNIP && NIP !== '' && <ErrorLabel>Wprowadź poprawny NIP.</ErrorLabel>}
              <InputText label="REGON:" id="regonId" onChange={handleREGON} checkRegex={checkRegexREGON} />
              {!checkRegexREGON && REGON !== '' && <ErrorLabel>Wprowadź poprawny REGON.</ErrorLabel>}
              <InputText label="KRS:" id="krsId" onChange={handleKRS} checkRegex={checkRegexKRS} />
              {!checkRegexKRS && KRS !== '' && <ErrorLabel>Wprowadź poprawny KRS.</ErrorLabel>}
              <InputText label="email:" id="emailId" onChange={handleEmail} checkRegex={checkRegexEmail} />
              {!checkRegexEmail && email !== '' && <ErrorLabel>Wpisano email w nieprawidłowym formacie.</ErrorLabel>}
              <InputText label="login:" id="nickId" onChange={handleNick} checkRegex={checkRegexNick} />
              {!checkRegexNick && nick !== '' && (
                <ErrorLabel>Wpisano niedozwolone znaki w nazwie użytkownika</ErrorLabel>
              )}
              <PasswordInput
                label="hasło:"
                name="signUp"
                id="passwordId"
                onChange={handlePassword}
                checkRegex={checkRegexPassword}
              />
              {!checkRegexPassword && password !== '' && (
                <ErrorLabel>
                  Hasło musi zawierać wielkie i małe litery, liczby, oraz conajmiej jeden znak specjalny: !@#$%\nHasło
                  musi zawierać między 8 a 24 znaki.{' '}
                </ErrorLabel>
              )}
              {!allInput && <ErrorLabel>Wypełnij wszystkie wymagane pola!</ErrorLabel>}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {!submitting ? (
                  <SignUpButton onClick={handleCompanyCheckBlockButton} type="submit" value="Submit">
                    Zarejestruj się jako firma
                  </SignUpButton>
                ) : (
                  <SignUpButton type="submit" value="Submit">
                    Zarejestruj się jako firma
                  </SignUpButton>
                )}
                {loading && <ErrorLabel style={{ color: gray1, marginTop: '0.5rem' }}>Rejestruję . . .</ErrorLabel>}
                {/*{ enabled ?<LoginButton to='/' type="submit" onClick = {e => handleSubmit(e)}>Zaloguj się</LoginButton> :<LoginButton to='' type="submit" onClick= {e => handleSubmit(e)}>Zaloguj się</LoginButton>}*/}
                <LineForm />
                {/* <GoogleButton to='' type="button" onClick={() => login()} >Kontynuuj z google</GoogleButton> */}
                <FacebookLogin
                  appId="739036054553215"
                  scope={email}
                  onSuccess={(response) => {
                    console.log('Login Success!', response);
                  }}
                  onFail={(error) => {
                    console.log('Login Failed!', error);
                  }}
                  onProfileSuccess={(response) => {
                    console.log('Get Profile Success!', response);
                    authApi.login(response.name, 'passwordini');
                    navigate(redirectPath, { replace: true });
                  }}
                  render={({ onClick }) => (
                    <></>
                    // <FacebookButton onClick={onClick} >Kontynuuj z Facebook</FacebookButton>
                  )}
                />
              </div>
            </InputsWrapper>
          )}
          <div style={{ fontSize: 14 }}>
            <text>Masz już konto?</text>
            <Link to="/sign-in" type="button">
              Zaloguj się!
            </Link>
          </div>
        </StyledForm>
      </AllPage>
    </>
  );
}

export default LoginForm;
