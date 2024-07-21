import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  useWindowDimensions,
  Platform
} from 'react-native'
import { HeaderText, Colors, AppText, StatsText, RegularText, Bubble, Line } from '../../components/styles'
import { ScrollView } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import { CommissionElement } from '../../components/CommissionElement'
import * as SecureStore from 'expo-secure-store'
import { default as baseURL } from '../../components/AxiosAuth'
import axios from 'axios'

const { black, primary, gray, darkLight, white } = Colors

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key)
  if (!result) {
    alert('Nie uzyskano danych z klucza: ' + key)
  }
  return result
}

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

const UserCompanyCommissions = ({ route, navigation }) => {
  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33')

  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [commissionsData, setCommissionsData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalCommission, setModalCommission] = useState('')

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

  async function getAccessToken() {
    const t = await getValueFor('accessToken')
    setToken(t)
    console.log(t)
  }

  async function getUserInfo() {
    const u = await getValueFor('user')
    setUserInfo(JSON.parse(u))
    console.log(u)
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
  }, [userInfo])

  return (
    <SafeAreaView style={{ backgroundColor: primary, alignItems: 'center' }}>
      <ScrollView style={{ height: '100%', width: '100%' }}>
        <View>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <HeaderText numberOfLines={1} style={{ color: black }}>
              Zlecenia
            </HeaderText>
          </View>

          <View style={{ backgroundColor: primary }}>
            {commissionsData.map((cms, indexC) => (
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(true)
                  setModalCommission(cms)
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
              </TouchableOpacity>
            ))}
          </View>
          {modalCommission && (
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
                    <HeaderText style={{ color: darkLight }}>{modalCommission.title}</HeaderText>
                    <Line style={{ width: '90%', height: 2 }} />
                    <View style={styles.ModalDescription}>
                      <RegularText style={{ color: '#6e6968' }}>{modalCommission.description}</RegularText>
                    </View>
                    <Line style={{ width: '90%', height: 1 }} />
                    <View style={styles.ModalCommissionDetails}>
                      <View style={styles.ModalDetail}>
                        <RegularText style={{ width: '60%' }}>Stawka:</RegularText>
                        <RegularText style={{ color: '#6e6968', width: '30%', textAlign: 'right' }}>
                          {modalCommission.rate + ' PLN'}
                        </RegularText>
                      </View>
                      <View style={styles.ModalDetail}>
                        <RegularText style={{ width: '60%' }}>Czas wykonania:</RegularText>
                        <RegularText style={{ color: '#6e6968', width: '30%', textAlign: 'right' }}>
                          {modalCommission.deadline}
                        </RegularText>
                      </View>
                      <View style={styles.ModalDetail}>
                        <RegularText style={{ width: '60%' }}>Poziom zaawansowania:</RegularText>
                        <RegularText style={{ color: '#6e6968', width: '30%', textAlign: 'right' }}>
                          {getSelectedLevel(modalCommission.level)}
                        </RegularText>
                      </View>
                    </View>
                    <Line style={{ width: '90%', height: 1 }} />
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        marginLeft: 15
                      }}
                    >
                      <RegularText style={{ width: '40%' }}>Zleceniodawca:</RegularText>
                      <RegularText style={{ color: '#6e6968', width: '55%', textAlign: 'right' }}>
                        {modalCommission.company_name}
                      </RegularText>
                    </View>
                    {modalCommission.contractor_username && <Line style={{ width: '90%', height: 1 }} />}
                    {modalCommission.contractor_username && (
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignSelf: 'flex-start',
                          alignItems: 'center',
                          marginLeft: 15
                        }}
                      >
                        <RegularText style={{ width: '40%' }}>Zleceniobiorca:</RegularText>
                        <RegularText
                          onPress={() => {
                            navigation.navigate('ArtistScreen', { username: modalCommission.contractor_username })
                            setIsModalVisible(false)
                          }}
                          style={{ color: '#6e6968', width: '55%', textAlign: 'right' }}
                        >
                          {modalCommission.contractor_username}
                        </RegularText>
                      </View>
                    )}
                    <Line style={{ width: '90%', height: 1 }} />
                    <View style={styles.ModalMapping}>
                      <RegularText style={{ marginRight: 5 }}>Lokalizacja:</RegularText>
                      {modalCommission.location.map((tag, indexT) => (
                        <Bubble style={[styles.ModalTagBubble, styles.boxShadow]} key={indexT}>
                          <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                        </Bubble>
                      ))}
                    </View>
                    <Line style={{ width: '90%', height: 1 }} />
                    <View style={styles.ModalMapping}>
                      <RegularText style={{ marginRight: 5 }}>Tagi:</RegularText>
                      {modalCommission.tags.map((tag, indexT) => (
                        <Bubble style={[styles.ModalTagBubble, styles.boxShadow]} key={indexT}>
                          <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                        </Bubble>
                      ))}
                    </View>
                    <Line style={{ width: '90%', height: 1 }} />
                    <View style={styles.ModalMapping}>
                      <RegularText style={{ marginRight: 5 }}>Wymagane Umiejętności:</RegularText>
                      {modalCommission.skills.map((tag, indexT) => (
                        <Bubble style={[styles.ModalTagBubble, styles.boxShadow]} key={indexT}>
                          <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                        </Bubble>
                      ))}
                    </View>
                    <Line style={{ width: '90%', height: 1 }} />
                    <View style={[styles.ModalMapping, { marginBottom: 10 }]}>
                      <RegularText style={{ marginRight: 5 }}>Wymagane Języki:</RegularText>
                      {modalCommission.languages.map((tag, indexT) => (
                        <Bubble style={[styles.ModalTagBubble, styles.boxShadow]} key={indexT}>
                          <AppText style={{ fontSize: 10, color: darkLight }}>{tag}</AppText>
                        </Bubble>
                      ))}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </Modal>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserCompanyCommissions

const styles = StyleSheet.create({
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
