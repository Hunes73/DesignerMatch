import { StyleSheet, View, ScrollView, Image, Pressable, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import axios from 'axios'
import { default as baseURL } from '../../components/AxiosAuth'
import Loading from '../../components/Loading'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  HeaderText,
  Colors,
  RegularText,
  Line,
  AppText,
  HeaderTextInput,
  RegularTextInput
} from '../../components/styles'
import * as SecureStore from 'expo-secure-store'
import * as ImagePicker from 'expo-image-picker'

const { black, primary, gray, darkLight, white } = Colors

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key)
  if (!result) {
    alert('Nie uzyskano danych z klucza: ' + key)
  }
  return result
}

const GalleryEditing = () => {
  const [entries, setEntries] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [modalData, setModalData] = useState([])
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [photo, setPhoto] = useState('')
  const [uri, setUri] = useState()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [refresh, setRefresh] = useState(false)

  async function getAccessToken() {
    const t = await getValueFor('accessToken')
    setToken(t)
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
  }, [userInfo, refresh])

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

  const addModalOpen = () => {
    setShowAddModal(true)
  }

  const addModalClose = () => {
    setTitle('')
    setDescription('')
    setPhoto('')
    setUri()
    setShowAddModal(false)
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    })

    delete result.cancelled

    if (!result.canceled) {
      console.log(result)
      let localUri = result.assets[0].uri
      setUri(localUri)
      let filename = localUri.split('/').pop()

      let match = /\.(\w+)$/.exec(filename)
      let type = match ? `image/${match[1]}` : `image`

      let formData = new FormData()
      formData.append('image', { uri: localUri, name: filename, type })

      setPhoto(formData)
    } else {
      alert('Nie wybrano zdjęcia')
    }
  }

  async function uploadImage() {
    const response = await axios
      .post(baseURL + '/api/artist/createPortfolioEntry/' + userInfo.username, photo, {
        params: {
          username: userInfo.username,
          name: title,
          description: description
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .catch((err) => {
        alert('Nie udało się wstawić zdjęcia, proszę spróbować ponownie')
        console.log(err)
      })
    setRefresh(!refresh)
  }

  async function deleteImage(id) {
    const response = await axios
      .delete(baseURL + '/api/artist/deletePortfolioEntry/' + userInfo.username + '/' + id.toString(), {
        params: { username: userInfo.username, id: id },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      .catch((error) => {
        //alert("Nie udało się usunąć zdjęcia");
        console.log(error)
      })
    setRefresh(!refresh)
  }

  return (
    <View style={{ backgroundColor: primary }}>
      {entries ? (
        <View style={{ backgroundColor: primary, height: '100%', width: '100%' }}>
          <Pressable
            onPress={() => {
              addModalOpen()
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'lightgrey' : darkLight
              },
              styles.Button
            ]}
          >
            <AppText style={{ color: primary, fontSize: 18 }}>Dodaj</AppText>
          </Pressable>
          <ScrollView style={{ height: '100%', width: '100%' }} contentContainerStyle={{ padding: 30, paddingTop: 10 }}>
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
                  <Line style={{ width: '100%', height: 1 }} />
                  <View style={styles.ModalDescription}>
                    <RegularText style={{ color: '#6e6968' }}>{modalData.description}</RegularText>
                  </View>
                  <Line style={{ width: '100%', height: 1 }} />
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
                  <Pressable
                    onPress={() => {
                      deleteImage(modalData.id)
                      ModalClose()
                    }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? 'lightgrey' : darkLight
                      },
                      styles.ModalButton
                    ]}
                  >
                    <AppText style={{ color: primary, fontSize: 18 }}>Usuń</AppText>
                  </Pressable>
                </View>
              </View>
            </Modal>
          )}
          <Modal
            isVisible={showAddModal}
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
                <HeaderTextInput
                  textAlign='center'
                  maxLength={100}
                  placeholder='Tytuł'
                  value={title}
                  onChangeText={setTitle}
                  style={{ color: darkLight, width: '100%' }}
                />
                <Line style={{ width: '100%', height: 1 }} />
                <View style={styles.ModalDescription}>
                  <RegularTextInput
                    maxLength={255}
                    multiline={true}
                    placeholder='Opis'
                    style={{
                      marginHorizontal: 15,
                      color: '#6e6968',
                      fontSize: 15,
                      flexWrap: 'wrap',
                      maxWidth: '100%',
                      minWidth: '100%'
                    }}
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>
                <Line style={{ width: '100%', height: 1 }} />
                <View>
                  <Pressable
                    onPress={() => {
                      pickImageAsync()
                    }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? 'lightgrey' : darkLight,
                        width: '48%',
                        alignSelf: 'center'
                      },
                      styles.ModalButton
                    ]}
                  >
                    <AppText style={{ color: primary, fontSize: 18 }}>Wybierz zdjęcie</AppText>
                  </Pressable>
                  <Image
                    resizeMode='contain'
                    source={{
                      uri: uri
                    }}
                    style={{ width: 300, height: 300 }}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Pressable
                    onPress={() => {
                      uploadImage(), addModalClose()
                    }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? 'lightgrey' : darkLight
                      },
                      styles.ModalButton
                    ]}
                  >
                    <AppText style={{ color: primary, fontSize: 18 }}>Zapisz</AppText>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      addModalClose()
                    }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? 'lightgrey' : darkLight
                      },
                      styles.ModalButton
                    ]}
                  >
                    <AppText style={{ color: primary, fontSize: 18 }}>Anuluj</AppText>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  )
}

export default GalleryEditing

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    marginTop: 22,
    minWidth: '50%',
    maxwidth: '100%',
    minheight: '40%',
    maxHeight: '80%'
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
  },
  Button: {
    padding: 7,
    borderRadius: 20,
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    marginRight: 5,
    width: '25%',
    height: 40,
    alignSelf: 'center'
  },
  ModalButton: {
    padding: 7,
    paddingTop: 5,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    marginRight: 5,
    flexDirection: 'row'
  }
})
