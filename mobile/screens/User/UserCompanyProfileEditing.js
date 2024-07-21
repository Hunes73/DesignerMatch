import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Pressable, Linking, Alert } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {
  Colors,
  RegularTextInput,
  AppTextInput,
  LinkTextInput,
  AppText,
  Avatar,
  Bubble,
  Line,
  HeaderTextInput,
  MsgBox
} from '../../components/styles'
//SecureStoring accessToken
import * as SecureStore from 'expo-secure-store'
import { default as baseURL } from '../../components/AxiosAuth'
import axios from 'axios'
import Loading from '../../components/Loading'
import { Fontisto } from '@expo/vector-icons'
import Awatar from '../../components/Avatar'
import * as ImagePicker from 'expo-image-picker'
import EditableAwatar from '../../components/EditableAvatar'

const { darkLight, link, black, primary } = Colors

const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid
) => {
  if (Platform.OS === 'ios') {
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOpacity,
      shadowRadius,
      shadowOffset: { width: xOffset, height: yOffset }
    }
  } else if (Platform.OS === 'android') {
    styles.boxShadow = { elevation, shadowColor: shadowColorAndroid }
  }
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key)
  if (!result) {
    alert('Nie uzyskano danych z klucza: ' + key)
  }
  return result
}

const CompanyProfileEditing = ({ route, navigation }) => {
  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [companyProfile, setcompanyProfile] = useState('')
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')
  const [adress, setAdress] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [photo, setPhoto] = useState('')
  const [uri, setUri] = useState()
  const [localUri, setLocalUri] = useState('')

  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33')

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  async function getAccessToken() {
    const t = await getValueFor('accessToken')
    setToken(t)
  }

  async function getUserInfo() {
    const u = await getValueFor('user')
    setUserInfo(JSON.parse(u))
  }

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message)
    setMessageType(type)
  }

  function facebookPatternValidation(name) {
    if (name === '' || name === null) {
      return true
    }
    const regex = new RegExp(
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([\w\-\.]{5,})/
    )
    return regex.test(name)
  }
  function instagramPatternValidation(name) {
    if (name === '' || name === null) {
      return true
    }
    const regex = new RegExp(/(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.]{1,30}\/?/)
    return regex.test(name)
  }
  function twitterPatternValidation(name) {
    if (name === '' || name === null) {
      return true
    }
    const regex = new RegExp(/(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]{5,15}(\?(\w+=\w+&?)*)?/)
    return regex.test(name)
  }
  function linkedinPatternValidation(name) {
    if (name === '' || name === null) {
      return true
    }
    const regex = new RegExp(/(https?:\/\/)?(www\.)?linkedin\.com\/[A-Za-z0-9_.]{1,30}/)
    return regex.test(name)
  }
  function websitePatternValidation(name) {
    if (name === '' || name === null) {
      return true
    }
    const regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/)
    return regex.test(name)
  }

  const OpenLinkElement = ({ link, children1, children2, color }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL('https://' + link)

      if (supported) {
        await Linking.openURL('https://' + link)
      } else {
        Alert.alert(`Nie można otworzyć takiego URL'a: https://${link}`)
      }
    }, [link])

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft: 0 }}>
        <AppText style={{ fontSize: 18, marginRight: 15 }}>{children1}</AppText>
        <TouchableOpacity onPress={handlePress}>
          <Fontisto name={children2} color={color} size={22} />
        </TouchableOpacity>
      </View>
    )
  }

  useEffect(() => {
    getAccessToken()
    getUserInfo()
  }, [])

  useEffect(() => {
    if (userInfo) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + '/public/api/company/getProfileByUsername/' + userInfo.username,
        headers: {}
      }

      setUri(baseURL + '/public/api/company/getProfileImageByUsername/' + userInfo.username + '?date' + new Date())

      const fetchData = async () => {
        try {
          const result = await axios.request(config)
          console.log(result.data)
          setcompanyProfile(result.data)
        } catch (error) {
          console.log(error)
        }
      }

      fetchData()
    }
  }, [userInfo])

  useEffect(() => {
    setCompanyName(companyProfile.name)
    setAdress(companyProfile.address)
    setDescription(companyProfile.description)
    setFacebook(companyProfile.facebook)
    setInstagram(companyProfile.instagram)
    setLinkedin(companyProfile.linkedin)
    setTwitter(companyProfile.twitter)
    setWebsite(companyProfile.website)
  }, [companyProfile])

  async function updateCompanyProfile() {
    handleMessage('')
    if (
      !facebookPatternValidation(facebook) ||
      !twitterPatternValidation(twitter) ||
      !instagramPatternValidation(instagram) ||
      !websitePatternValidation(website) ||
      !linkedinPatternValidation(linkedin)
    ) {
      handleMessage('Źle wpisano link', 'FAILED')
      return
    }
    const response = await axios
      .put(
        baseURL + '/api/company/updateProfileByUsername/' + userInfo.username,
        {
          name: companyName,
          description: description,
          website: website,
          facebook: facebook,
          linkedin: linkedin,
          twitter: twitter,
          instagram: instagram,
          address: adress
        },
        {
          params: { username: userInfo.username },
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .catch((error) => {
        handleMessage('Wystąpił błąd', 'FAILED')
        console.log(error)
      })
    if ((response.status = 200)) {
      handleMessage('Zapisano zmiany!', 'SUCCESS')
    }
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    })

    delete result.cancelled

    if (!result.canceled) {
      console.log(result)
      //setPhoto(result);
      let localUri = result.assets[0].uri
      setLocalUri(localUri)
      let filename = localUri.split('/').pop()

      let match = /\.(\w+)$/.exec(filename)
      let type = match ? `image/${match[1]}` : `image`

      let formData = new FormData()
      formData.append('file', { uri: localUri, name: filename, type })

      setPhoto(formData)
    } else {
      alert('Nie wybrano zdjęcia')
    }
  }

  async function uploadProfileImage() {
    const response = await axios
      .post(baseURL + '/api/company/uploadProfileImage/' + userInfo.username, photo, {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .catch((err) => {
        handleMessage('Wystąpił błąd przy zmianie zdjęcia!', 'FAILED')
        console.log(err.response)
      })
  }

  function ListLinks() {
    if (companyProfile) {
      function setValid(text, id) {
        if (id === 1) {
          return facebookPatternValidation(text)
        }
        if (id === 2) {
          return instagramPatternValidation(text)
        }
        if (id === 3) {
          return linkedinPatternValidation(text)
        }
        if (id === 5) {
          return twitterPatternValidation(text)
        }
        if (id === 6) {
          return websitePatternValidation(text)
        }
      }
      function changeLink(text, id) {
        if (id === 1) {
          setFacebook(text)
        }
        if (id === 2) {
          setInstagram(text)
        }
        if (id === 3) {
          setLinkedin(text)
        }
        if (id === 5) {
          setTwitter(text)
        }
        if (id === 6) {
          setWebsite(text)
        }
      }
      const links = [
        { id: 1, name: 'Facebook:', data: facebook },
        { id: 2, name: 'Instagram:', data: instagram },
        { id: 3, name: 'LinkedIn:', data: linkedin },
        { id: 5, name: 'Twitter:', data: twitter },
        { id: 6, name: 'Twoja strona:', data: website }
      ]
      const list = links.map((item) => (
        <View flexDirection='row' alignItems='center' style={{ marginBottom: 10 }} key={item.id}>
          <AppText style={{ width: '25%', alignContent: 'flex-start', alignItems: 'flex-start' }}>{item.name}</AppText>
          <LinkTextInput
            maxLength={100}
            style={{ flexWrap: 'wrap', width: '70%' }}
            defaultValue={item.data}
            onChangeText={(newText) => {
              changeLink(newText, item.id)
            }}
            placeholder='Wpisz adres'
            autoComplete='off'
            autoCorrect={false}
            checkRegex={setValid(item.data, item.id)}
          />
        </View>
      ))
      return <View style={styles.ListElement}>{list}</View>
    } else {
      return <View></View>
    }
  }

  return (
    <>
      {companyProfile ? (
        <ScrollView nestedScrollEnabled={true} style={{ flex: 1, backgroundColor: primary }} height={300}>
          <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'space-between' }}>
            {localUri ? <EditableAwatar avatar={localUri}></EditableAwatar> : <Awatar avatar={uri}></Awatar>}
            <View style={{ width: '65%', alignItems: 'center', justifyContent: 'space-around' }}>
              <HeaderTextInput
                multiline={true}
                maxLength={100}
                style={{ width: '100%', marginLeft: 10, marginRight: 10, color: black, fontSize: 22 }}
                value={companyName}
                onChangeText={setCompanyName}
                placeholder='Wpisz nazwę firmy'
              />
            </View>
          </View>
          <Pressable
            onPress={() => {
              pickImageAsync()
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'lightgrey' : darkLight,
                marginTop: 0,
                padding: 7,
                borderRadius: 15,
                fontSize: 16,
                marginBottom: 10,
                alignItems: 'center',
                marginRight: 5,
                width: '50%',
                alignSelf: 'center'
              }
            ]}
          >
            <AppText style={{ color: primary }}>Zmień zdjęcie profilowe</AppText>
          </Pressable>
          <AppText style={styles.About}>O firmie:</AppText>
          <RegularTextInput
            maxLength={255}
            multiline={true}
            style={{ marginHorizontal: 15, color: black, fontSize: 15, flexWrap: 'wrap' }}
            value={description}
            onChangeText={setDescription}
          ></RegularTextInput>
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <AppText style={styles.ListHeader}>Adres:</AppText>
              <AppTextInput
                maxLength={100}
                multiline={true}
                style={{ flexWrap: 'wrap', width: '75%' }}
                defaultValue={adress}
                onChangeText={(newText) => {
                  setAdress(newText)
                }}
                placeholder='Wpisz adres'
              />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
          </View>
          <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-around', margin: 10 }}>
            <AppText style={{ fontSize: 19, color: black, marginBottom: 15 }}>Media Społecznościowe: </AppText>
            {ListLinks()}
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              alignContent: 'center',
              marginBottom: 15
            }}
          >
            <MsgBox type={messageType}>{message}</MsgBox>
            <Pressable
              onPress={() => {
                updateCompanyProfile()
                if (photo) {
                  uploadProfileImage()
                }
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'lightgrey' : darkLight
                },
                styles.ModalButton
              ]}
            >
              <AppText style={{ color: primary, fontSize: 16 }}>Zapisz</AppText>
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default CompanyProfileEditing

const styles = StyleSheet.create({
  HeaderViewStyle: {
    justifyContent: 'flex-end'
  },
  ContentLabelStyle: {
    flexDirection: 'row',
    width: '100%',
    height: 35
  },
  IconStyle: {
    height: 30,
    width: 30,
    tintColor: darkLight
  },
  ListHeader: {
    fontSize: 19,
    color: black,
    marginHorizontal: 10
  },
  ListElement: {
    color: black,
    marginHorizontal: 15
  },
  About: {
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 22,
    marginHorizontal: 10,
    color: black
  },
  ModalButton: {
    padding: 7,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    marginRight: 5,
    flexDirection: 'row'
  }
})
