import * as React from 'react'
import { useState, useEffect } from 'react'
import { Avatar } from './styles'

const Awatar = (props) => {
  const { avatar, style } = props
  const [uri, setUri] = useState(avatar)
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(avatar)
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
  }, [])

  if (isLoaded) {
    return <Avatar style={[style]} source={{ uri: avatar }} />
  } else {
    return <Avatar style={[style]} source={require('../assets/img/defaultavatar.png')} />
  }

  // return (
  //   <Avatar
  //     style={[style]}
  //     onError={(e) => { e.target.onError=null; e.target.src="../assets/img/avatar1.png";}}
  //     source={{ uri: avatar}}
  //   />
  // )
  // };
}

export default Awatar
