import * as React from 'react'
import { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ChatLabel, Colors } from '../../components/styles'
import CompanyProfile from './UserCompanyProfile'
import UserCompanyCommissions from './UserCompanyCommissions'
import CompanyCommissionsEditing from './UserCompanyCommissionsEditing'
import CompanyProfileEditing from './UserCompanyProfileEditing'
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

export default function UserCompanyScreen({ navigation }) {
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState('jakis tam cos ')
  const [editing, setEditing] = useState(false)

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
          {!editing ? (
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
                        name={focused ? 'people' : 'people-outline'}
                        color={focused ? darkLight : secondary}
                      />
                    )
                  }
                }}
                name='Profile'
                component={CompanyProfile}
              />
              <Tab.Screen
                options={{
                  title: ({ color, focused }) => {
                    return (
                      <Ionicons
                        size={25}
                        name={focused ? 'reader' : 'reader-outline'}
                        color={focused ? darkLight : secondary}
                      />
                    )
                  }
                }}
                name='UserCommissions'
                component={UserCompanyCommissions}
              />
            </Tab.Navigator>
          ) : (
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
                        name={focused ? 'people' : 'people-outline'}
                        color={focused ? darkLight : secondary}
                      />
                    )
                  }
                }}
                name='ProfileEditing'
                component={CompanyProfileEditing}
              />
              <Tab.Screen
                options={{
                  title: ({ color, focused }) => {
                    return (
                      <Ionicons
                        size={25}
                        name={focused ? 'reader' : 'reader-outline'}
                        color={focused ? darkLight : secondary}
                      />
                    )
                  }
                }}
                name="CommissionsEditing"
                component={CompanyCommissionsEditing}
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

const styles = StyleSheet.create({})
