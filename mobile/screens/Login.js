import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
//Google auth
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
//Facebook auth
import * as Facebook from 'expo-auth-session/providers/facebook'
//axios API
//import axios from "axios";
import { default as baseURL } from '../components/AxiosAuth'
import axios from 'axios'
//formik
import { Formik } from 'formik'
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
//SecureStoring accessToken
import * as SecureStore from 'expo-secure-store'

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  StyledFormArea,
  LeftIcon,
  StyledButton,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  MsgBox,
  Colors,
  ExtraView,
  TextLink,
  HeaderText,
  StatsText,
  SmallText,
  LinearGradientStyle
} from '../components/styles'
import { View, ActivityIndicator } from 'react-native'
//import AsyncStorage from "@react-native-async-storage/async-storage";

//Colors
const { darkLight, primary, link, darkLight2, green, green2, facebook1, facebook2 } = Colors

//dismising the popup after successful auth
WebBrowser.maybeCompleteAuthSession()

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [googleSubmiting, setGoogleSubmiting] = useState(false)
  const [facebookSubmiting, setFacebookSubmiting] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function passwordPatternValidation(password) {
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$')
    return regex.test(password)
  }

  function emailPatternValidation(email) {
    const regex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
    return regex.test(email)
  }

  const [requestG, responseG, promptAsyncG] = Google.useAuthRequest({
    androidClientId: '37019238552-c6q0hq4kn55o6e1ahobtuvconehs243h.apps.googleusercontent.com',
    iosClientId: '37019238552-bvqremi6rf14qlgbg8iqagg1mjndo5h0.apps.googleusercontent.com',
    expoClientId: '37019238552-7n7e9jrdi9gcliagtqhalfq34afibh9c.apps.googleusercontent.com'
  })

  const [requestF, responseF, promptAsyncF] = Facebook.useAuthRequest({
    clientId: '739036054553215'
  })

  if (requestF) {
    console.log(
      'You need to add this url to your authorized redirect urls on your Facebook app: ' + requestF.redirectUri
    )
  }

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value).catch((error) => {
      console.log(error)
    })
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  useEffect(() => {
    if (responseG?.type === 'success') {
      setGoogleSubmiting(false)
      console.log(responseG)
      save('accessToken', JSON.stringify(responseG.authentication.accessToken))
      navigation.replace('MainNavigation')
    }
  }, [responseG])

  useEffect(() => {
    if (responseF && responseF.type === 'success' && responseF.authentication) {
      setFacebookSubmiting(false)
      save('accessToken', JSON.stringify(responseF.authentication.accessToken))
      navigation.replace('MainNavigation')
    }
  }, [responseF])

  //   const handleGoogleLogin = async () => {
  //     setGoogleSubmiting(true);
  //     const result = await promptAsyncG();
  //     handleMessage("Google login successful", 'SUCCESS');
  //     setGoogleSubmiting(false);
  //     navigation.navigate('MainNavigation', userInfo);
  //   }

  const handleFacebookLogin = async () => {
    setFacebookSubmiting(true)
    const result = await promptAsyncF()
    if (result.type !== 'success') {
      alert('Uh oh, something went wrong')
      return
    }
  }

  async function getUserInfo(token) {
    const url = baseURL + '/auth/decodeToken'
    try {
      const response = await axios.get(url, {
        params: {
          Authorization: token
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      console.log('user: ' + JSON.stringify(response.data))
      return JSON.stringify(response.data)
    } catch (err) {
      if (!err?.response) {
        console.log(err)
      } else if (err.response?.status === 409) {
        console.log(err)
      } else {
        console.log(err)
      }
    }
  }

  async function login() {
    const response = await handleLogin()
    setSubmitting(false)
    if (response) {
      save('accessToken', response)
      const user = await getUserInfo(response)
      save('user', user)
      navigation.replace('MainNavigation')
      setEmail('')
      setPassword('')
      handleMessage('')
    }
  }

  const handleLogin = async () => {
    handleMessage(null)
    const url = baseURL + '/auth/login'
    try {
      const response = await axios.post(url, JSON.stringify({ email, password }), {
        headers: { 'Content-Type': 'application/json' }
      })
      if (response.status === 200) {
        handleMessage('Zalogowano pomyślnie', 'SUCCESS')
        return response.data.accessToken
      }
    } catch (err) {
      handleMessage('Nie udało się zalogować, spróbuj ponownie.', 'FAILED')
      setEmail('')
      setPassword('')
      setSubmitting(false)
      if (!err?.response) {
        console.log('Brak odpowiedzi serwera')
        console.log(err)
      } else if (err.response?.status === 409) {
        console.log(err)
      } else {
        console.log('Login Failed')
        console.log(err)
      }
    }
  }

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message)
    setMessageType(type)
  }

  return (
    <KeyboardAvoidingWrapper style={{ backgroundColor: { primary } }}>
      <StyledContainer>
        <InnerContainer>
          <PageLogo resizeMode='contain' source={require('./../assets/img/logo.png')} />
          <HeaderText bold={true} style={{ color: darkLight, marginVertical: 10 }}>
            Logowanie
          </HeaderText>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={() => {
              if (email === '' || password === '') {
                handleMessage('Proszę wypełnić oba pola', 'FAILED')
                setSubmitting(false)
              } else if (!passwordPatternValidation(password)) {
                handleMessage("Hasło musi zawierać wielkie i małe litery, liczby, oraz conajmiej jeden znak specjalny: !@#$% Hasło musi zawierać między 8 a 24 znaki.", 'FAILED')
                setSubmitting(false)
              } else if (!emailPatternValidation(email)) {
                handleMessage('Wpisano email w nieprawidłowym formacie', 'FAILED')
                setSubmitting(false)
              } else {
                setSubmitting(true)
                login()
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label='Adres Email'
                  icon='mail'
                  placeholder='email@example.com'
                  placeholderTextColor={'#00000088'}
                  onChangeText={setEmail}
                  onBlur={handleBlur('email')}
                  value={email}
                  keyboardType='email-address'
                  checkRegex={email.length !== 0 ? emailPatternValidation(email) : true}
                />
                <MyTextInput
                  label='Hasło'
                  icon='lock'
                  placeholder='************'
                  placeholderTextColor={'#00000088'}
                  onChangeText={setPassword}
                  onBlur={handleBlur('password')}
                  value={password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                  checkRegex={password.length !== 0 ? passwordPatternValidation(password) : true}
                />
                <MsgBox type={messageType}>{message}</MsgBox>
                {!submitting && (
                  <LinearGradientStyle colors={[darkLight2, darkLight]}>
                    <StyledButton onPress={handleSubmit}>
                      <StatsText style={{ color: primary }}>Zaloguj się</StatsText>
                    </StyledButton>
                  </LinearGradientStyle>
                )}
                {submitting && (
                  <LinearGradientStyle colors={[darkLight2, darkLight]}>
                    <StyledButton disabled={true}>
                      <ActivityIndicator size='large' color={primary} />
                    </StyledButton>
                  </LinearGradientStyle>
                )}
                <LinearGradientStyle colors={[darkLight2, darkLight]}>
                  <StyledButton
                    onPress={() => {
                      save('accessToken', '')
                      save('user', '')
                      navigation.replace('HomePage')
                    }}
                  >
                    <StatsText style={{ color: primary }}>Kontynuuj bez logowania</StatsText>
                  </StyledButton>
                </LinearGradientStyle>
                {/* {!googleSubmiting && (
                  <LinearGradientStyle colors={[green, green2]}>
                    <StyledButton
                      google={true}
                      disabled={!requestG}
                      onPress={() => {
                        promptAsyncG();
                        setGoogleSubmiting(true);
                      }}
                    >
                      <Fontisto name="google" color={primary} size={25} />
                      <StatsText style={{ color: primary }}>Kontynuuj z Google</StatsText>
                    </StyledButton>
                  </LinearGradientStyle>
                )}
                {googleSubmiting && (
                  <LinearGradientStyle colors={[green, green2]}>
                    <StyledButton google={true} disabled={true}>
                      <ActivityIndicator size="large" color={primary} />
                    </StyledButton>
                  </LinearGradientStyle>
                )}
                {!facebookSubmiting && (
                  <LinearGradientStyle colors={[facebook2, facebook1]}>
                    <StyledButton
                      facebook={true}
                      disabled={!requestF}
                      onPress={() => {
                        handleFacebookLogin();
                      }}
                    >
                      <Fontisto name="facebook" color={primary} size={25} />
                      <StatsText style={{ color: primary }}>Kontynuuj z Facebook</StatsText>
                    </StyledButton>
                  </LinearGradientStyle>
                )}
                {facebookSubmiting && (
                  <LinearGradientStyle colors={[facebook2, facebook1]}>
                    <StyledButton facebook={true} disabled={true}>
                      <ActivityIndicator size="large" color={primary} />
                    </StyledButton>
                  </LinearGradientStyle>
                )} */}
                <ExtraView>
                  <SmallText>Nie masz jeszcze konta? </SmallText>
                  <TextLink onPress={() => navigation.navigate('ArtistSignup')}>
                    <SmallText style={{ color: link }}>Zarejestruj się!</SmallText>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  )
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={darkLight} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  )
}

export default Login
