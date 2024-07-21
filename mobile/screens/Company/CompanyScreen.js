import * as React from 'react'
import { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { ChatLabel, Colors } from '../../components/styles'
import CompanyProfile from './CompanyProfile'
import CompanyCommissions from './CompanyCommissions'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
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

export default function CompanyScreen({ route, navigation }) {
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
            initialRouteName='CompanyProfile'
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
              name='CompanyProfile'
              component={CompanyProfile}
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
                      name={focused ? 'reader' : 'reader-outline'}
                      color={focused ? darkLight : secondary}
                    />
                  )
                }
              }}
              name="Commissions"
              component={CompanyCommissions}
              initialParams={{
                username: route.params.username
              }}
            />
          </Tab.Navigator>
        </SafeAreaView>
      ) : (
        <Loading />
      )}
    </>
  )
}

const styles = StyleSheet.create({})
