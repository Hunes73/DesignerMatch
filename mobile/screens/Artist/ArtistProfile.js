import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Linking, Pressable } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Colors, RegularText, AppText, Bubble, Line, HeaderText } from '../../components/styles'
//SecureStoring accessToken
import * as SecureStore from 'expo-secure-store'
import { default as baseURL } from '../../components/AxiosAuth'
import axios from 'axios'
import Loading from '../../components/Loading'
import { Fontisto } from '@expo/vector-icons'
import Awatar from '../../components/Avatar'
import Modal from 'react-native-modal'
import { CommissionElement } from '../../components/CommissionElement'

const { darkLight, link, black, primary, white } = Colors

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
  return result
}

const ArtistProfile = ({ route, navigation }) => {
  const [token, setToken] = useState('')
  const [artistProfile, setArtistProfile] = useState('')
  const [isExperienceShown, setIsExperienceShown] = useState(false)
  const [isEducationShown, setIsEducationShown] = useState(false)
  const username = route.params.username
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [commissionsData, setCommissionsData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [refresh, setRefresh] = useState(false)

  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33')

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  async function getAccessToken() {
    const t = await getValueFor('accessToken')
    setToken(t)
    console.log(t)
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
      setUserInfo(response.data)
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

  useEffect(() => {
    getAccessToken()
  }, [])

  useEffect(() => {
    getUserInfo(token)
  }, [token])

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

  async function addContractor(id, title, description, deadline, level, location, skills, tags, languages, rate) {
    const response = await axios
      .put(
        baseURL + '/api/commission/updateById/' + id.toString(),
        {
          client_username: userInfo.username,
          contractor_username: username,
          title: title,
          description: description,
          deadline: deadline,
          level: level,
          location: location,
          skills: skills,
          tags: tags,
          languages: languages,
          rate: rate
        },
        {
          params: { id: id },
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .catch((error) => {
        console.log(error)
        alert('Nie udało się wyznacznyć zlecenia')
      })
  }

  function getSelectedLevel(levels) {
    if (levels) {
      if (levels.length === 3) {
        return 'Junior+'
      } else if (levels.length === 2) {
        return 'Mid+'
      } else if (levels.length === 1) {
        return levels[0]
      }
    }
  }

  useEffect(() => {
    if (username) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + '/public/api/artist/getArtistProfileByUsername/' + username,
        headers: {}
      }

      const fetchData = async () => {
        try {
          const result = await axios.request(config)
          setArtistProfile(result.data)
        } catch (error) {
          console.log(error)
        }
      }

      fetchData()
    }
  }, [username])

  useEffect(() => {
    if (userInfo) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + '/public/api/commission/getAllCommissionFirmByUsername/' + userInfo.username,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }

      const fetchData = async () => {
        try {
          const result = await axios.request(config)
          console.log(result.data)
          setCommissionsData(result.data)
        } catch (error) {
          console.log(error)
        }
      }

      fetchData()
    }
  }, [userInfo, refresh])

  useEffect(() => {
    setLastname(artistProfile.lastname)
    setFirstname(artistProfile.firstname)
  }, [artistProfile])

  function ListEducation() {
    if (artistProfile.education) {
      const list = artistProfile.education.map((item, id) => (
        <View style={[styles.ListElement, { marginBottom: 7, marginLeft: 25 }]} key={id}>
          <AppText style={{ marginBottom: 2 }}>{'Kierunek: ' + item.faculty}</AppText>
          <AppText style={{ marginBottom: 2 }}>{'Uczelnia: ' + item.school_name}</AppText>
          <AppText style={{ marginBottom: 2 }}>{'Stopień: ' + item.degree}</AppText>
          {item.start_date && <AppText style={{ marginBottom: 2 }}>{'Od: ' + item.start_date}</AppText>}
          {item.end_date ? (
            <AppText style={{ marginBottom: 2 }}>{'Do: ' + item.end_date}</AppText>
          ) : (
            <AppText style={{ marginBottom: 2 }}>{'Do: Obecnie'}</AppText>
          )}
          {item.description && <AppText style={{ marginBottom: 2 }}>{'Opis: ' + item.description}</AppText>}
        </View>
      ))
      return <>{list}</>
    } else {
      return <View></View>
    }
  }

  function ListExperience() {
    if (artistProfile.experience) {
      const list = artistProfile.experience.map((item, id) => (
        <View style={[styles.ListElement, { marginBottom: 7, marginLeft: 25 }]} key={id}>
          {item.comapny && <AppText style={{ marginBottom: 2 }}>{'Nazwa firmy: ' + item.company}</AppText>}
          {item.city && <AppText style={{ marginBottom: 2 }}>{'Miasto: ' + item.city}</AppText>}
          {item.position && <AppText style={{ marginBottom: 2 }}>{'Stanowsko: ' + item.position}</AppText>}
          {item.description && <AppText style={{ marginBottom: 2 }}>{'Opis obowiązków: ' + item.description}</AppText>}
          {item.start_date && <AppText style={{ marginBottom: 2 }}>{'Od: ' + item.start_date}</AppText>}
          {item.end_date ? (
            <AppText style={{ marginBottom: 2 }}>{'Do: ' + item.end_date}</AppText>
          ) : (
            <AppText style={{ marginBottom: 2 }}>{'Do: Obecnie'}</AppText>
          )}
        </View>
      ))
      return <>{list}</>
    } else {
      return <View></View>
    }
  }

  function ListSkills() {
    if (artistProfile.skills) {
      const list = artistProfile.skills.map((item, id) => (
        <Bubble style={[{ width: item.size, marginRight: 5 }, styles.boxShadow]} key={id}>
          <AppText>{item}</AppText>
        </Bubble>
      ))
      return <>{list}</>
    } else {
      return <View></View>
    }
  }

  function ListLanguages() {
    if (artistProfile.languages) {
      const list = artistProfile.languages.map((item, id) => (
        <Bubble style={[{ width: item.size, marginRight: 5 }, styles.boxShadow]} key={id}>
          <AppText>{item}</AppText>
        </Bubble>
      ))
      return <>{list}</>
    } else {
      return <View></View>
    }
  }

  function ListTags() {
    if (artistProfile.tags) {
      const list = artistProfile.tags.map((item, id) => (
        <Bubble style={[{ width: item.size, marginRight: 5 }, styles.boxShadow]} key={id}>
          <AppText>{item}</AppText>
        </Bubble>
      ))
      return <>{list}</>
    } else {
      return <View></View>
    }
  }

  function ListLinks() {
    if (artistProfile) {
      const links = [
        { id: 0, data: artistProfile.facebook },
        { id: 1, data: artistProfile.instagram },
        { id: 2, data: artistProfile.linkedin },
        { id: 3, data: artistProfile.pinterest },
        { id: 4, data: artistProfile.twitter },
        { id: 5, data: artistProfile.website }
      ]
      const names = [
        { enum: 'facebook', name: 'Facebook', color: '#4267B2' },
        { enum: 'instagram', name: 'Instagram', color: '#C13584' },
        { enum: 'linkedin', name: 'LinkedIn', color: '#0072b1' },
        { enum: 'pinterest', name: 'Pinterest', color: '#E60023' },
        { enum: 'twitter', name: 'Twitter', color: '#00acee' },
        { enum: 'earth', name: 'Własna strona', color: darkLight }
      ]
      const available = links.filter((item) => {
        if (item.data !== 'string' && item.data !== null && item.data !== '' && typeof item.data !== 'undefined') {
          return item
        }
      })
      const list = available.map((item) => (
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

  const changeEducationState = () => {
    if (isEducationShown) {
      setIsEducationShown(false)
    } else {
      setIsEducationShown(true)
    }
  }

  const changeExperienceState = () => {
    if (isExperienceShown) {
      setIsExperienceShown(false)
    } else {
      setIsExperienceShown(true)
    }
  }

  return (
    <>
      {artistProfile ? (
        <ScrollView nestedScrollEnabled={true} style={{ flex: 1, backgroundColor: primary }} height={300}>
          <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'flex-start', alignItems: 'center' }}>
            <Awatar
              avatar={baseURL + '/public/api/artist/getProfileImageByUsername/' + username + '?date' + new Date()}
            ></Awatar>
            <HeaderText style={{ color: darkLight, fontSize: 28 }}>{firstname + ' ' + lastname}</HeaderText>
          </View>
          {userInfo.role === 'COMPANY' ? (
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <Pressable
                onPress={() => {
                  setIsModalVisible(true)
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'lightgrey' : darkLight,
                    padding: 5,
                    paddingHorizontal: 7,
                    borderRadius: 15,
                    fontSize: 16,
                    marginBottom: 10,
                    alignItems: 'center',
                    flexDirection: 'row'
                  }
                ]}
              >
                <AppText style={{ color: 'white' }}>Wyznacz zlecenie</AppText>
              </Pressable>
            </View>
          ) : (
            <></>
          )}
          <AppText style={styles.About}>O mnie:</AppText>
          <RegularText numberOfLines={5} style={{ marginHorizontal: 15, color: black, fontSize: 15 }}>
            {artistProfile.bio}
          </RegularText>
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText style={styles.ListHeader}>Wykształcenie:</AppText>
              <TouchableOpacity onPress={() => changeEducationState()} style={{ marginHorizontal: 10 }}>
                <Bubble style={styles.boxShadow}>
                  {isEducationShown ? (
                    <AppText style={{ color: '#C0C0C0' }}>Ukryj</AppText>
                  ) : (
                    <AppText style={{ color: '#C0C0C0' }}>Pokaż</AppText>
                  )}
                </Bubble>
              </TouchableOpacity>
            </View>
            {isEducationShown ? ListEducation() : <></>}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText style={styles.ListHeader}>Doświadczenie zawodowe:</AppText>
              <TouchableOpacity onPress={() => changeExperienceState()} style={{ marginHorizontal: 10 }}>
                <Bubble style={styles.boxShadow}>
                  {isExperienceShown ? (
                    <AppText style={{ color: '#C0C0C0' }}>Ukryj</AppText>
                  ) : (
                    <AppText style={{ color: '#C0C0C0' }}>Pokaż</AppText>
                  )}
                </Bubble>
              </TouchableOpacity>
            </View>
            {isExperienceShown ? ListExperience() : <></>}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
          </View>
          <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-around', margin: 10 }}>
            <AppText style={{ fontSize: 19, color: black }}>Umiejętności:</AppText>
            <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap', marginLeft: 15 }}>{ListSkills()}</View>
            <AppText style={{ fontSize: 19, color: black }}>Języki:</AppText>
            <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap', marginLeft: 15 }}>
              {ListLanguages()}
            </View>
            <AppText style={{ fontSize: 19, color: black }}>Tagi:</AppText>
            <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap', marginLeft: 15 }}>{ListTags()}</View>
            <AppText style={{ fontSize: 19, color: black }}>Media Społecznościowe: </AppText>
            {ListLinks()}
          </View>
          {commissionsData && (
            <Modal
              isVisible={isModalVisible}
              onBackdropPress={() => setIsModalVisible(false)}
              onSwipeComplete={() => setIsModalVisible(false)}
              swipeDirection='right'
              animationIn='fadeInUp'
              animationOut='fadeOutUp'
              animationInTiming={500}
              animationOutTiming={500}
              hideModalContentWhileAnimating={true}
            >
              <ScrollView style={{ maxHeight: '90%' }}>
                <View style={[styles.centeredView]}>
                  <View style={styles.modalView}>
                    <View style={{ backgroundColor: primary }}>
                      {commissionsData.map(
                        (cms, indexC) =>
                          !cms.contractor_username && (
                            <Pressable
                              onPress={() => {
                                addContractor(
                                  cms.id,
                                  cms.title,
                                  cms.description,
                                  cms.deadline,
                                  cms.level,
                                  cms.location,
                                  cms.skills,
                                  cms.tags,
                                  cms.languages,
                                  cms.rate
                                )
                                setIsModalVisible(false)
                                setRefresh(!refresh)
                              }}
                              key={indexC}
                            >
                              <CommissionElement
                                name={cms.company_name}
                                key={indexC}
                                title={cms.title}
                                description={cms.description}
                                rate={cms.rate}
                                deadline={cms.deadline}
                                level={getSelectedLevel(cms.level)}
                                location={cms.location}
                                tags={cms.tags}
                              />
                            </Pressable>
                          )
                      )}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </Modal>
          )}
        </ScrollView>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default ArtistProfile

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
  ModalButton1: {
    padding: 7,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    marginRight: 5,
    flexDirection: 'row'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%'
  },
  modalView: {
    width: '100%',
    margin: 10,
    backgroundColor: primary,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
  },
  ModalDescription: {
    paddingTop: 5,
    padding: 15
  },
  ModalCommissionDetails: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start'
  },
  ModalDetail: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  ModalMapping: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 17,
    paddingRight: 12
  },
  ModalTagBubble: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 0,
    marginBottom: 5,
    marginHorizontal: 2,
    backgroundColor: white
    //borderColor: darkLight,
    //borderWidth: 1,
  }
})
