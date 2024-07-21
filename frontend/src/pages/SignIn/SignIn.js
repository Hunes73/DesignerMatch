import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../components/Auth';
import { default as axios } from '../../api/axios';
import { useGoogleLogin } from '@react-oauth/google';
import {
  LogoIcon2,
  ErrorLabel,
  FacebookButton,
  CenterButton,
  Button,
  LoginButton,
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
} from './Elements';
import InputText from '../../components/Input/InputText';
import PasswordInput from '../../components/Input/PasswordInput';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { PASSWORD_REGEX, EMAIL_REGEX } from '../../components/Regex';

export const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authApi = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [checkRegexEmail, setCheckRegexEmail] = useState(true);
  const [checkRegexPassword, setCheckRegexPassword] = useState(true);
  const [allInput, setAllInput] = useState(true);

  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const minPassword = 8;
  const maxPassword = 24;
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || '/';
  const LOGIN_URL = '/auth/login';

  const handleCheckBlockButton = () => {
    if (email === '' || password === '') {
      setAllInput(false);
      setSubmitting(false);
    } else if (checkRegexEmail && checkRegexPassword) {
      handleSubmit();
    } else setSubmitting(false);
  };

  useEffect(() => {
    if (localStorage.length > 0) {
      let myKey = localStorage.getItem('storageLogin');
      console.log(myKey);
      authApi.login('Michal', 'pssw');
      navigate(redirectPath, { replace: true });
    } else console.log('pusty localStorage');
  }, []);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const response = await axios.post(LOGIN_URL, JSON.stringify({ email, password }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
      setSubmitting(false);
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      authApi.login(email, password);
      saveStorageData(response?.data.accessToken);
      navigate(redirectPath, { replace: true });
      // Wywołaj funkcję onSignIn po zalogowaniu
      if (onSignIn) {
        onSignIn();
      }
    } catch (err) {
      setSubmitting(false);
      if (!err?.response) {
        console.log('No Server Response');
      } else if (err.response?.status === 409) {
        console.log('Username Taken');
      } else {
        console.log('Registration Failed');
        console.log(err);
        setPasswordInvalid(true);
      }
    }
  };
  const login = useGoogleLogin({
    onSuccess: (CodeResponse) => {
      console.log(CodeResponse);
      authApi.login('Michal', 'pssw');
      saveStorageData('Goggle');
      navigate(redirectPath, { replace: true });
      // Wywołaj funkcję onSignIn po zalogowaniu
      if (onSignIn) {
        onSignIn();
      }
    },
    flow: 'auth-code',
  });

  const handleEmailChange = (value) => {
    setEmail(value);
    setAllInput(true);
    if (value && emailPatternValidation(value)) setCheckRegexEmail(true);
    else setCheckRegexEmail(false);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setAllInput(true);
    if (value && passwordPatternValidation(value)) setCheckRegexPassword(true);
    else setCheckRegexPassword(false);
  };

  function passwordPatternValidation(password) {
    const regex = new RegExp(PASSWORD_REGEX);
    return regex.test(password);
  }

  function emailPatternValidation(email) {
    const regex = new RegExp(EMAIL_REGEX);
    return regex.test(email);
  }

  //saveStorageData
  const saveStorageData = (AccesToken) => {
    let key = 'storageLogin';
    localStorage.setItem(key, AccesToken);
  };

  return (
    <AllPage>
      <MainName>LOGOWANIE</MainName>
      <StyledForm>
        <LogoIcon2 />
        <InputText label="email:" name="login" id="loginId" onChange={handleEmailChange} checkRegex={checkRegexEmail} />
        {!checkRegexEmail && email !== '' && <ErrorLabel>Wpisano email w nieprawidłowym formacie.</ErrorLabel>}
        <PasswordInput
          label="hasło:"
          name="login"
          id="passwordId"
          onChange={handlePasswordChange}
          checkRegex={checkRegexPassword}
        />
        {!checkRegexPassword && password !== '' && (
          <ErrorLabel>
            Hasło musi zawierać wielkie i małe litery, liczby, oraz conajmiej jeden znak specjalny: !@#$%\nHasło musi
            zawierać między 8 a 24 znaki.{' '}
          </ErrorLabel>
        )}
        {!allInput && <ErrorLabel>Wszystkie pola musza być zepełnione</ErrorLabel>}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {passwordInvalid ? <StyledAlert>Podane hasło jest nieprawidłowe.</StyledAlert> : <></>}
          {!submitting ? (
            <LoginButton to="##" type="submit" onClick={handleCheckBlockButton}>
              Zaloguj się
            </LoginButton>
          ) : (
            <LoginButton to="#" type="submit">
              Zaloguj się
            </LoginButton>
          )}
          <LineForm />
          {/* <GoogleButton to='#' type="button" onClick={() => login()} >Kontynuuj z Google{' '}</GoogleButton> */}
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
              saveStorageData('Facebook');
              navigate(redirectPath, { replace: true });
              // Wywołaj funkcję onSignIn po zalogowaniu
              if (onSignIn) {
                onSignIn();
              }
            }}
            render={({ onClick }) => (
              <></>
              // <FacebookButton onClick={onClick} >Kontynuuj z Facebook</FacebookButton>
            )}
          />
          <div style={{ fontSize: 12 }}>
            <small>Nie masz jeszcze konta? </small>
            <Link to="/sign-up" type="submit">
              Zarejestruj się!
            </Link>
          </div>
        </div>
      </StyledForm>
    </AllPage>
  );
};
