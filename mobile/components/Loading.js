import React from 'react'
import { Colors } from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'

const { primary } = Colors

const Loading = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: primary }}>
      <Image style={{ height: 200, width: 200 }} resizeMode='contain' source={require('./../assets/img/logo.png')} />
    </SafeAreaView>
  )
}

export default Loading
