import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'

//formik
import { Formik } from 'formik'

//icons
import { Octicons, Ionicons } from '@expo/vector-icons'

import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  LeftIcon,
  StyledButton,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  ButtonText,
  MsgBox,
  Colors,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
  HeaderText,
  LinearGradientStyle
} from '../components/styles'
import { View, ActivityIndicator } from 'react-native'

//Colors
const { darkLight, darkLight2, primary } = Colors

//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'

//API client
import axios from 'axios'
import { default as baseURL } from '../components/AxiosAuth'

const CompanySignup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [nip, setNip] = useState('')
  const [regon, setRegon] = useState('')
  const [krs, setKrs] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isPassword2Valid, setIsPassword2Valid] = useState(true)

  function passwordPatternValidation(password) {
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$')
    return regex.test(password)
  }

  function emailPatternValidation(email) {
    const regex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
    return regex.test(email)
  }

  function namesPatternValidation(name) {
    const regex = new RegExp("^([A-ZÀ-ÿŻŹĆĄŚĘŁÓŃ]+[-,a-zżźćńółęąś. ']*[ ]*)+$")
    return regex.test(name)
  }

  function nipPatternValidation(name) {
    const regex = new RegExp('^(PL[0-9]{10})+$')
    return regex.test(name)
  }

  function regonPatternValidation(name) {
    if (name.length === 9) {
      const regex = new RegExp('^([0-9]{9})+$')
      return regex.test(name)
    } else if (name.length === 14) {
      const regex = new RegExp('^([0-9]{14})+$')
      return regex.test(name)
    } else {
      return false
    }
  }

  function krsPatternValidation(name) {
    if (name === '' || krs === null) {
      return true
    }
    const regex = new RegExp('^([0-9]{10})+$')
    return regex.test(name)
  }

  function usernamesPatternValidation(name) {
    const regex = new RegExp('^([-_a-zA-ZÀ-ÿ0-9.]){4,20}$')
    return regex.test(name)
  }

  function isNipValid(nip) {
    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7]

    function getOnlyDigits(value) {
      return value.replace(/[^0-9]/gi, '')
    }

    nip = getOnlyDigits(nip)

    let sum = 0
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i] * parseInt(nip[i])
    }

    const checkSum = sum % 11

    if (checkSum !== parseInt(nip[9])) {
      return false
    }

    return true
  }

  function isRegonValid(regon) {
    const weights9 = [8, 9, 2, 3, 4, 5, 6, 7]
    const weights14 = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8]

    function getOnlyDigits(value) {
      return value.replace(/[^0-9]/gi, '')
    }

    regon = getOnlyDigits(regon)

    function isCorrect(value, weights) {
      let sum = 0

      for (let i = 0; i < weights.length; i++) {
        sum += weights[i] * parseInt(value[i])
      }

      const checkValue = parseInt(value[weights.length])
      const checkSum = sum % 11

      if (checkSum === 10) {
        return checkValue === 0
      }

      return checkSum === checkValue
    }

    let isValid

    if (regon.length === 9) {
      isValid = isCorrect(regon, weights9)
    } else {
      isValid = isCorrect(regon, weights14)
    }

    if (!isValid) {
      return false
    }

    return true
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const handleSignup = async () => {
    if (krs === '') {
      setKrs(null)
    }
    handleMessage(null)
    const url = baseURL + '/auth/registerCompany'
    try {
      setSubmitting(true)
      const response = await axios.post(
        url,
        {
          email: email,
          username: username,
          password: password,
          name: name,
          nip: nip,
          regon: regon,
          krs: krs
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      if (response.status === 200) {
        setSubmitting(false)
        handleMessage('Zarejestrowano użytkownika, proszę potwierdź email przed zalogowaniem', 'SUCCESS')
        await sleep(1500)
        navigation.navigate('Login')
      }
    } catch (err) {
      setSubmitting(false)
      handleMessage('Błąd podczas rejestracji: kod ' + err.response.status, 'FAILED')
      if (!err?.response) {
        console.log('No Server Response')
      } else if (err.response?.status === 409) {
        console.log('Username Taken')
      } else {
        console.log('Registration Failed')
        console.log(err)
      }
    }
  }

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message)
    setMessageType(type)
  }
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style='dark'></StatusBar>
        <InnerContainer>
          <HeaderText style={{ fontSize: 30, color: darkLight, marginBottom: 30 }}>Rejestracja firmy</HeaderText>
          <Formik
            initialValues={{ email: '', username: '', password: '', name: '', nip: '', regon: '', krs: '' }}
            onSubmit={() => {
              if (email === '' || password === '' || username === '' || name === '' || nip === '' || regon === '') {
                handleMessage('Proszę wypełnić wszystkie pola')
                setSubmitting(false)
              } else if (!namesPatternValidation(name)) {
                handleMessage('Wpisano niedozwolone znaki w nazwie firmy', 'FAILED')
                setSubmitting(false)
              } else if (!nipPatternValidation(nip)) {
                handleMessage('Wpisano NIP w złym formacie, firma musi być zarejestrowana w Polsce', 'FAILED')
                setSubmitting(false)
              } else if (!isNipValid(nip)) {
                handleMessage('Wpisano nieprawidłowy NIP', 'FAILED')
                setSubmitting(false)
              } else if (!regonPatternValidation(regon)) {
                handleMessage('Wpisano REGON w złym formacie, firma musi być zarejestrowana w Polsce', 'FAILED')
                setSubmitting(false)
              } else if (!isRegonValid(regon)) {
                handleMessage('Wpisano nieprawidłowy REGON', 'FAILED')
                setSubmitting(false)
              } else if (!krsPatternValidation(krs)) {
                console.log(krs)
                handleMessage('Wpisano KRS w zlym formacie', 'FAILED')
                setSubmitting(false)
              } else if (!usernamesPatternValidation(username)) {
                handleMessage('Wpisano niedozwolone znaki w nazwie użytkownika', 'FAILED')
                setSubmitting(false)
              } else if (!emailPatternValidation(email)) {
                handleMessage('Wpisano email w nieprawidłowym formacie', 'FAILED')
                setSubmitting(false)
              } else if (!passwordPatternValidation(password)) {
                handleMessage(
                  'Hasło musi zawierać wielkie i małe litery, liczby, oraz conajmiej jeden znak specjalny: !@#$%\nHasło musi zawierać między 8 a 24 znaki.',
                  'FAILED'
                )
                setSubmitting(false)
              } else {
                handleSignup()
              }
            }}
          >
            {({ handleBlur, handleSubmit }) => (
              <StyledFormArea>
                <MyTextInput
                  label='Nazwa firmy'
                  icon='organization'
                  placeholder='MyCompany'
                  placeholderTextColor={'#00000088'}
                  onChangeText={setName}
                  onBlur={handleBlur('name')}
                  value={name}
                  checkRegex={name.length !== 0 ? namesPatternValidation(name) : true}
                />
                <MyTextInput
                  label='NIP'
                  icon='info'
                  placeholder='PL1234567890'
                  placeholderTextColor={'#00000088'}
                  onChangeText={setNip}
                  onBlur={handleBlur('nip')}
                  value={nip}
                  checkRegex={nip.length !== 0 ? nipPatternValidation(nip) : true}
                />
                <MyTextInput
                  label='REGON'
                  icon='info'
                  placeholder='123456789'
                  placeholderTextColor={'#00000088'}
                  onChangeText={setRegon}
                  onBlur={handleBlur('regon')}
                  value={regon}
                  keyboardType='numeric'
                  checkRegex={regon.length !== 0 ? regonPatternValidation(regon) : true}
                />
                <MyTextInput
                  label='KRS'
                  icon='info'
                  placeholder='1234567890'
                  placeholderTextColor={'#00000088'}
                  onChangeText={setKrs}
                  onBlur={handleBlur('krs')}
                  value={krs}
                  keyboardType='numeric'
                  checkRegex={krs !== null ? (krs.length !== 0 ? krsPatternValidation(krs) : true) : true}
                />
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
                  label='Nazwa użytkownika'
                  icon='person'
                  placeholder='JanArt'
                  placeholderTextColor={'#00000088'}
                  onChangeText={setUsername}
                  onBlur={handleBlur('username')}
                  value={username}
                  checkRegex={username.length !== 0 ? usernamesPatternValidation(username) : true}
                />
                <MyTextInput
                  label='Hasło'
                  icon='lock'
                  placeholder='************'
                  placeholderTextColor={'#00000088'}
                  onChangeText={(newText) => {
                    setPassword(newText)
                    setIsPasswordValid(passwordPatternValidation(newText))
                  }}
                  onBlur={handleBlur('password')}
                  value={password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                  checkRegex={password.length !== 0 ? passwordPatternValidation(password) : true}
                />
                {/* <MyTextInput
                  label="Potwierdź hasło"
                  icon="lock"
                  placeholder="************"
                  placeholderTextColor={'#00000088'}
                  onChangeText={(newText) => {setConfirmPassword(newText); setIsPassword2Valid(passwordPatternValidation(newText))}}
                  onBlur={handleBlur('confirmPassword')}
                  value={confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                  checkRegex={confirmPassword.length !== 0 ? passwordPatternValidation(confirmPassword) : true}
                /> */}
                <MsgBox type={messageType}> {message} </MsgBox>
                {!isPasswordValid && (
                  <MsgBox type={'FAILED'}>
                    Hasło musi zawierać wielkie i małe litery, liczby, oraz conajmiej jeden znak specjalny: !@#$%\nHasło
                    musi zawierać między 8 a 24 znaki.{' '}
                  </MsgBox>
                )}
                {!submitting && (
                  <LinearGradientStyle colors={[darkLight2, darkLight]}>
                    <StyledButton onPress={handleSubmit}>
                      <ButtonText>Zarejestruj się</ButtonText>
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
                <ExtraView style={{ flexDirection: 'column' }}>
                  <ExtraText>Chcesz zarejestrować się jako artysta? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('ArtistSignup')}>
                    <TextLinkContent>Kliknij tutaj!</TextLinkContent>
                  </TextLink>
                </ExtraView>
                <ExtraView>
                  <ExtraText>Masz już konto? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Login')}>
                    <TextLinkContent>Zaloguj się!</TextLinkContent>
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

export default CompanySignup
