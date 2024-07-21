import * as React from 'react'
import { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as SecureStore from 'expo-secure-store'
//import { useContext } from 'react';

//Screens
import HomePage from './navigation_screens/HomePage'
import ProfileScreen from './User/UserProfileScreen'
import UserCompanyScreen from './User/UserCompanyScreen'

import { SafeAreaView } from 'react-native'

import { ChatLabel, Colors } from '../components/styles'

const { secondary, darkLight } = Colors

//Screen names
const homeName = 'Strona główna'
const artistProfileName = 'Profil Artysty'
const companyProfileName = 'Profil firmy'

const Tab = createBottomTabNavigator()

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key)
  if (!result) {
    alert('Nie uzyskano danych z klucza: ' + key)
  }
  return result
}

export default function MainNavigation({ navigation }) {
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [isArtist, setIsArtist] = useState(true)

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
    if (userInfo.role === 'ARTIST') {
      setIsArtist(true)
    } else {
      setIsArtist(false)
    }
  }, [userInfo])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName={homeName}
        backBehavior='history'
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            let rn = route.name

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline'
            } else if (rn === artistProfileName) {
              iconName = focused ? 'person' : 'person-outline'
            } else if (rn === companyProfileName) {
              iconName = focused ? 'people' : 'people-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: darkLight,
          tabBarInactiveTintColor: secondary,
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 10
          },

          tabBarStyle: [
            {
              display: 'flex'
            },
            null
          ],
          gestureEnabled: false
        })}
        //Chowanie paska nawigacji po wysunięciu klawiatury
        /*tabBarOptions={{
                keyboardHidesTabBar: true
            }}
            /*tabBarOptions={{
                 activeTintColor: '#4A4E69',
                 inactiveTintColor: 'grey',
                 labelStyle: { paddingBottom: 10, fontSize: 10},
                 style: {padding: 10, height: 70}
            }}*/
      >
        <Tab.Screen
          name={isArtist ? artistProfileName : companyProfileName}
          component={isArtist ? ProfileScreen : UserCompanyScreen}
        />
        <Tab.Screen name={homeName} component={HomePage} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}
