import * as React from 'react'
import { useState, useEffect } from 'react'
import { View, SafeAreaView, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ChatLabel, Colors, HeaderText } from '../../components/styles'
import Gallery from './UserGallery'
import GalleryEditing from './UserGalleryEditing'
import Profile from './UserProfile'
import ProfileEditing from './UserProfileEditing'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
//SecureStoring accessToken
import * as SecureStore from 'expo-secure-store'
import Loading from '../../components/Loading'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Tab = createMaterialTopTabNavigator()
const { primary, secondary, darkLight, link, black } = Colors

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key)
  if (!result) {
    alert('Nie uzyskano danych z klucza: ' + key)
  }
  return result
}

export default function ProfileScreen({ navigation }) {
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [editing, setEditing] = useState(false)

  const changeEditingState = (state) => {
    setEditing(state)
  }

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

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value).catch((error) => {
      console.log(error)
    })
  }

  async function logout() {
    save('accessToken', '')
    save('user', '')
    console.log('potwierdzono wylogowanie')
    navigation.navigate('Login')
  }

  return (
    <>
      {userInfo ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: primary }}>
          <ChatLabel
            style={{
              height: '8%',
              justifyContent: 'flex-end'
            }}
          >
            <View style={[styles.HeaderViewStyle]}>
              {editing ? (
                <SelectDropdown
                  data={['Opuść']}
                  onSelect={(selectedItem, index) => {
                    if (selectedItem === 'Opuść') {
                      setEditing(false)
                    }
                  }}
                  defaultButtonText=' '
                  buttonStyle={{ backgroundColor: darkLight }}
                  renderDropdownIcon={(isOpened) => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={primary} size={18} />
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return ''
                  }}
                ></SelectDropdown>
              ) : (
                <SelectDropdown
                  data={['Wyloguj', 'Edytuj']}
                  onSelect={(selectedItem, index) => {
                    if (selectedItem === 'Wyloguj') {
                      logout()
                    } else if (selectedItem === 'Edytuj') {
                      setEditing(true)
                    }
                  }}
                  defaultButtonText=' '
                  buttonStyle={{ backgroundColor: darkLight }}
                  renderDropdownIcon={(isOpened) => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={primary} size={18} />
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return ''
                  }}
                ></SelectDropdown>
              )}
            </View>
          </ChatLabel>
          {editing ? (
            <Tab.Navigator
              initialRouteName='ProfileEditing'
              screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: darkLight },
                tabBarStyle: { backgroundColor: primary, marginTop: 0 }
              }}
            >
              <Tab.Screen
                options={{
                  title: ({ color, focused }) => {
                    return (
                      <Ionicons
                        size={25}
                        name={focused ? 'person' : 'person-outline'}
                        color={focused ? darkLight : secondary}
                      />
                    )
                  }
                }}
                name='ProfileEditing'
                component={ProfileEditing}
              />
              <Tab.Screen
                options={{
                  title: ({ color, focused }) => {
                    return (
                      <Ionicons
                        size={25}
                        name={focused ? 'images' : 'images-outline'}
                        color={focused ? darkLight : secondary}
                      />
                    )
                  }
                }}
                name='GalleryEditing'
                component={GalleryEditing}
              />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator
              initialRouteName='Profile'
              screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: darkLight },
                tabBarStyle: { backgroundColor: primary, marginTop: 0 }
              }}
            >
              <Tab.Screen
                options={{
                  title: ({ color, focused }) => {
                    return (
                      <Ionicons
                        size={25}
                        name={focused ? 'person' : 'person-outline'}
                        color={focused ? darkLight : secondary}
                      />
                    )
                  }
                }}
                name='Profile'
                component={Profile}
              />
              <Tab.Screen
                options={{
                  title: ({ color, focused }) => {
                    return (
                      <Ionicons
                        size={25}
                        name={focused ? 'images' : 'images-outline'}
                        color={focused ? darkLight : secondary}
                      />
                    )
                  }
                }}
                name='Gallery'
                component={Gallery}
              />
            </Tab.Navigator>
          )}
        </SafeAreaView>
      ) : (
        <Loading />
      )}
    </>
  )
}
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
  GalleryLabelStyle: {
    width: '50%',
    alignItems: 'center',
    borderBottomWidth: 3
  },
  ReviewsLabelStyle: {
    width: '50%',
    alignItems: 'center',
    borderBottomWidth: 3
  },
  ListHeader: {
    fontSize: 19,
    color: black,
    marginHorizontal: 10
  },
  ListElement: {
    color: black,
    marginHorizontal: 10
  },
  About: {
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 22,
    marginHorizontal: 10,
    color: black
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF'
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5'
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left'
  }
})
