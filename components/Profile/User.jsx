import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function User() {
    const {user} =useUser();

  return (
    <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    }}>
      <Image source={{uri:user?.imageUrl}}
            style={{
                width:100,
                height:100,
                borderRadius:99
            }}
      /> 
      <Text style={{fontWeight:'bold',fontSize:20}}>{user?.fullName}</Text>
      <Text>{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  )
}