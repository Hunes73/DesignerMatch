import * as React from 'react'
import { Avatar } from './styles'

const EditableAwatar = (props) => {
  const { avatar, style } = props

  return (
    <Avatar
      style={[style]}
      onError={(e) => {
        e.target.onError = null
        e.target.src = '../assets/img/avatar1.png'
      }}
      source={{ uri: avatar }}
    />
  )
}

export default EditableAwatar
