import * as React from 'react'
import { useState, useEffect } from 'react'
import { View, SafeAreaView, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ChatLabel, Colors, HeaderText } from '../../components/styles'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ArtistProfile from './ArtistProfile'
import ArtistGallery from './ArtistGallery'
import Ionicons from 'react-native-vector-icons/Ionicons'
//SecureStoring accessToken
import * as SecureStore from 'expo-secure-store'
import Loading from '../../components/Loading'

const Tab = createMaterialTopTabNavigator()
const { primary, secondary, darkLight, link, black } = Colors

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key)
  if (!result) {
    alert('Nie uzyskano danych z klucza: ' + key)
  }
  return result
}

export default function ArtistScreen({ route, navigation }) {
  return (
    <>
      {route.params ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: primary }}>
          <ChatLabel
            style={{
              height: '8%',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
            >
              <Ionicons name='arrow-back' size={38} style={{ color: primary, marginLeft: 5 }} />
            </TouchableOpacity>
          </ChatLabel>
          <Tab.Navigator
            initialRouteName='ArtistProfile'
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
              name='ArtistProfile'
              component={ArtistProfile}
              initialParams={{
                username: route.params.username
              }}
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
              name='ArtistGallery'
              component={ArtistGallery}
              initialParams={{ username: route.params.username }}
            />
          </Tab.Navigator>
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
    backgroundColor: '#EFEFEF',
    width: 150
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
    width: 150
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left'
  }
})
