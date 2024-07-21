import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Pressable, Linking } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Colors, RegularText, StatsText, AppText, Avatar, Bubble, Line, HeaderText } from '../../components/styles'
//SecureStoring accessToken
import * as SecureStore from 'expo-secure-store'
import { default as baseURL } from '../../components/AxiosAuth'
import axios from 'axios'
import Loading from '../../components/Loading'
import { Fontisto } from '@expo/vector-icons'
import Awatar from '../../components/Avatar'

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

const CompanyProfile = ({ route, navigation }) => {
  const [token, setToken] = useState('')
  const [companyProfile, setcompanyProfile] = useState('')
  const username = route.params.username

  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33')

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const OpenLinkElement = ({ link, children1, children2, color }) => {
    const handlePress = useCallback(async () => {
      if (!link.startsWith('https://')) {
        link = 'https://' + link
      }
      const supported = await Linking.canOpenURL(link)

      if (supported) {
        await Linking.openURL(link)
      } else {
        Alert.alert(`Nie można otworzyć takiego URL'a: ${link}`)
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
    if (username) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + '/public/api/company/getProfileByUsername/' + username,
        params: {},
        headers: {}
      }

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
  }, [username])

  function ListLinks() {
    if (companyProfile) {
      const links = [
        { id: 0, data: companyProfile.facebook },
        { id: 1, data: companyProfile.instagram },
        { id: 2, data: companyProfile.linkedin },
        { id: 3, data: companyProfile.twitter },
        { id: 4, data: companyProfile.website }
      ]
      const names = [
        { enum: 'facebook', name: 'Facebook', color: '#4267B2' },
        { enum: 'instagram', name: 'Instagram', color: '#C13584' },
        { enum: 'linkedin', name: 'LinkedIn', color: '#0072b1' },
        { enum: 'twitter', name: 'Twitter', color: '#00acee' },
        { enum: 'earth', name: 'Własna strona', color: darkLight }
      ]
      const avaiable = links.filter((item) => {
        if (item.data !== 'string' && item.data !== null && item.data !== '' && typeof item.data !== 'undefined') {
          return item
        }
      })
      const list = avaiable.map((item) => (
        <OpenLinkElement
          key={item.id}
          link={item.data}
          color={names[item.id].color}
          children2={names[item.id].enum}
          children1={names[item.id].name}
        />
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
            <Awatar
              avatar={baseURL + '/public/api/company/getProfileImageByUsername/' + username + '?date' + new Date()}
            ></Awatar>
            <View style={{ width: '65%', alignItems: 'flex-start', justifyContent: 'center' }}>
              <HeaderText
                style={{ width: '100%', marginLeft: 10, color: darkLight }}
                isLong={companyProfile.name.length > 30}
              >
                {companyProfile.name}
              </HeaderText>
            </View>
          </View>
          <AppText style={styles.About}>O firmie:</AppText>
          <RegularText numberOfLines={5} style={{ marginHorizontal: 15, color: black, fontSize: 15 }}>
            {companyProfile.description}
          </RegularText>
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText style={styles.ListHeader}>Adres:</AppText>
              <AppText style={[styles.ListHeader, { color: darkLight }]}>{companyProfile.address}</AppText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText style={styles.ListHeader}>NIP:</AppText>
              <AppText style={[styles.ListHeader, { color: darkLight }]}>{companyProfile.nip}</AppText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText style={styles.ListHeader}>REGON:</AppText>
              <AppText style={[styles.ListHeader, { color: darkLight }]}>{companyProfile.regon}</AppText>
            </View>
            {companyProfile.krs ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppText style={styles.ListHeader}>KRS:</AppText>
                <AppText style={[styles.ListHeader, { color: darkLight }]}>{companyProfile.krs}</AppText>
              </View>
            ) : (
              <></>
            )}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
          </View>
          <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-around', margin: 10 }}>
            <AppText style={{ fontSize: 19, color: black }}>Media Społecznościowe: </AppText>
            {ListLinks()}
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default CompanyProfile

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
