import { StyleSheet, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import axios from 'axios'
import { default as baseURL } from '../../components/AxiosAuth'
import Loading from '../../components/Loading'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { HeaderText, Colors, RegularText, Line } from '../../components/styles'
import * as SecureStore from 'expo-secure-store'

const { black, primary, gray, darkLight, white } = Colors

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key)
  if (!result) {
    alert('Nie uzyskano danych z klucza: ' + key)
  }
  return result
}

const Gallery = () => {
  const [entries, setEntries] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState([])
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState('')

  async function getAccessToken() {
    const t = await getValueFor('accessToken')
    setToken(t)
  }

  async function getUserInfo() {
    const u = await getValueFor('user')
    setUserInfo(JSON.parse(u))
  }

  useEffect(() => {
    getAccessToken()
    getUserInfo()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioEntriesResponse = await axios.request(
          baseURL + '/public/api/artist/getPortfolioEntries/' + userInfo.username,
          {
            params: { page: 0, size: 50 },
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        )
        setEntries(portfolioEntriesResponse.data.content)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [userInfo])

  useEffect(() => {
    console.log(entries)
  }, [entries])

  const ModalOpen = (data) => {
    console.log(data)
    setModalData(data)
    setShowModal(true)
  }

  const ModalClose = () => {
    setModalData([])
    setShowModal(false)
  }

  return (
    <View style={{ backgroundColor: primary }}>
      {entries ? (
        <View style={{ backgroundColor: primary }}>
          <ScrollView style={{ height: '100%', width: '100%' }} contentContainerStyle={{ padding: 30 }}>
            <View style={{ flex: 1 }}>
              {entries.map((entry, index) => (
                <View
                  style={{
                    maxWidth: '100%',
                    maxHeight: 200,
                    backgroundColor: white,
                    margin: 10,
                    borderRadius: 20,
                    justifyContent: 'center',
                    padding: 10
                  }}
                  key={index}
                >
                  <TouchableOpacity
                    onPress={() => {
                      ModalOpen(entry)
                    }}
                  >
                    <Image
                      resizeMode='contain'
                      source={{
                        uri: baseURL + '/public/api/artist/getPortfolioImage/' + userInfo.username + '/' + entry.id
                      }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
          {modalData && (
            <Modal
              isVisible={showModal}
              onBackdropPress={() => ModalClose()}
              onSwipeComplete={() => ModalClose()}
              swipeDirection='right'
              animationIn='fadeInUp'
              animationOut='fadeOutUp'
              animationInTiming={200}
              animationOutTiming={200}
              hideModalContentWhileAnimating={true}
            >
              <View style={[styles.centeredView]}>
                <View style={styles.modalView}>
                  <HeaderText style={{ color: darkLight }}>{modalData.name}</HeaderText>
                  <View style={styles.ModalDescription}>
                    <RegularText style={{ color: '#6e6968' }}>{modalData.description}</RegularText>
                  </View>
                  <Image
                    resizeMode='contain'
                    source={{
                      uri:
                        baseURL +
                        '/public/api/artist/getPortfolioImage/' +
                        userInfo.username +
                        '/' +
                        modalData.id +
                        '?' +
                        new Date()
                    }}
                    style={{ width: 350, height: 400 }}
                  />
                </View>
              </View>
            </Modal>
          )}
        </View>
      ) : (
        <Loading />
      )}
    </View>
  )
}

export default Gallery

const styles = StyleSheet.create({
  centeredView: {
    //justifyContent: 'center',
    //alignItems: 'center',
    marginTop: 22,
    width: '100%',
    height: '70%'
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: primary,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center'
  },
  ModalDescription: {
    paddingTop: 5,
    padding: 15
  }
})
