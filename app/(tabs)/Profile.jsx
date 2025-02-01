import { View, Text } from 'react-native'
import React from 'react'
import User from '../../components/Profile/User'
import Menu from '../../components/Profile/Menu'

export default function Profile() {
  return (
    <View>
      <Text style={{fontWeight:'bold',fontSize:50,padding:20}}>Profile</Text>
      <User/>
      <Menu/>
    </View>
  )
}