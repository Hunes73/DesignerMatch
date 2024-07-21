import React, { useState, useEffect } from 'react'
import { AppText, RegularText } from './styles'
import { Image, StyleSheet, View } from 'react-native'
import { Colors } from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { default as baseURL } from './AxiosAuth'
import axios from 'axios'
import Awatar from './Avatar'

const { secondary1, darkLight, gray1, grey } = Colors

function CardItem(props) {
  const [entries, setEntries] = useState('')
  const [isLoaded, setIsLoaded] = useState(true)
  const username = props.username

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioEntriesResponse = await axios.request(
          baseURL + '/public/api/artist/getPortfolioEntries/' + props.username,
          {
            params: { page: 0, size: 2 },
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

    async function fetchImage() {
      try {
        const response = await fetch(
          baseURL + '/public/api/artist/getProfileImageByUsername/' + props.username + '?date' + new Date()
        )
        if (response.status === 200) {
          setIsLoaded(true)
        } else {
          setIsLoaded(false)
        }
      } catch (error) {
        setIsLoaded(false)
        console.log(error)
      }
    }

    fetchImage()
    fetchData()
  }, [username])

  if (isLoaded) {
    if (entries.length !== 0) {
      return (
        <View style={styles.PostStyle}>
          <View style={styles.SimpleInfoContainer}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ArtistScreen', {
                  username: props.username,
                  firstname: props.name,
                  lastname: props.surname
                })
              }}
            >
              <Image
                style={styles.Avatar}
                resizeMode='cover'
                source={{
                  uri: baseURL + '/public/api/artist/getProfileImageByUsername/' + props.username + '?date' + new Date()
                }}
              />
            </TouchableOpacity>
            <AppText style={{ color: gray1 }}>{props.level}</AppText>

            <RegularText style={{ fontSize: 20, marginTop: 10 }}>
              {props.name} {props.surname}
            </RegularText>
          </View>
          <Image
            style={styles.Photo}
            source={{
              uri:
                baseURL +
                '/public/api/artist/getPortfolioImage/' +
                props.username +
                '/' +
                entries[0].id +
                '?date' +
                new Date()
            }}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.PostStyle}>
          <View style={styles.SimpleInfoContainer}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ArtistScreen', {
                  username: props.username,
                  firstname: props.name,
                  lastname: props.surname
                })
              }}
            >
              <Image
                style={styles.Avatar}
                resizeMode='cover'
                source={{
                  uri: baseURL + '/public/api/artist/getProfileImageByUsername/' + props.username + '?date' + new Date()
                }}
              />
            </TouchableOpacity>
            <AppText style={{ color: gray1 }}>{props.level}</AppText>

            <RegularText style={{ fontSize: 20, marginTop: 10 }}>
              {props.name} {props.surname}
            </RegularText>
          </View>
          <Image style={styles.Photo} source={require('./../assets/img/background.png')} />
        </View>
      )
    }
  } else {
    if (entries.length !== 0) {
      return (
        <View style={styles.PostStyle}>
          <View style={styles.SimpleInfoContainer}>
            <Image style={styles.Avatar} resizeMode='cover' source={require('../assets/img/defaultavatar.png')} />
            <AppText style={{ color: gray1 }}>{props.level}</AppText>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ArtistScreen', {
                  username: props.username,
                  firstname: props.name,
                  lastname: props.surname
                })
              }}
            >
              <RegularText style={{ fontSize: 20, marginTop: 10 }}>
                {props.name} {props.surname}
              </RegularText>
            </TouchableOpacity>
          </View>
          <Image
            style={styles.Photo}
            source={{
              uri:
                baseURL +
                '/public/api/artist/getPortfolioImage/' +
                props.username +
                '/' +
                entries[0].id +
                '?date' +
                new Date()
            }}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.PostStyle}>
          <View style={styles.SimpleInfoContainer}>
            <Image style={styles.Avatar} resizeMode='cover' source={require('../assets/img/defaultavatar.png')} />
            <AppText style={{ color: gray1 }}>{props.level}</AppText>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ArtistScreen', {
                  username: props.username,
                  firstname: props.name,
                  lastname: props.surname
                })
              }}
            >
              <RegularText style={{ fontSize: 20, marginTop: 10 }}>
                {props.name} {props.surname}
              </RegularText>
            </TouchableOpacity>
          </View>
          <Image style={styles.Photo} source={require('./../assets/img/background.png')} />
        </View>
      )
    }
  }
}

export default CardItem

const styles = StyleSheet.create({
  PostStyle: {
    flexDirection: 'row',
    backgroundColor: secondary1,
    width: '95%',
    marginBottom: 30,
    borderRadius: 5
  },
  SimpleInfoContainer: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  Photo: {
    height: '100%',
    width: '50%'
  },
  Avatar: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  Star: {
    color: '#ffe234',
    fontSize: 20,
    textShadowColor: grey,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  }
})
