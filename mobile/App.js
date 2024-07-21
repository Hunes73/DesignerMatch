import React from 'react'
import { useFonts } from 'expo-font'
import Loading from './components/Loading'

import LoginNavigation from './screens/LoginNavigation'

//SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontLoaded] = useFonts({
    'LexendDeca-Regular': require('./assets/fonts/LexendDeca-Regular.ttf'),
    'LexendDeca-SemiBold': require('./assets/fonts/LexendDeca-SemiBold.ttf'),
    'LexendDeca-Black': require('./assets/fonts/LexendDeca-Black.ttf'),
    'LexendDeca-VariableFont_wght': require('./assets/fonts/LexendDeca-VariableFont_wght.ttf'),
    arial: require('./assets/fonts/arial.ttf')
  })

  if (!fontLoaded) {
    return (
      //loading screen
      <Loading />
    )
  }

  return <LoginNavigation />
}

export default App
