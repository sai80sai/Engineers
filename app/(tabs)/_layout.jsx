import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown:false,
        tabBarActiveTintColor:Colors.PRIMARY
      }}>
          <Tabs.Screen name = 'Home'
          options={{tabBarLabel:'Home',
          tabBarIcon:({color})=><AntDesign name="home" size={24} color='black' />
          }}/>
          <Tabs.Screen name = 'Profile'
          options={{tabBarLabel:'Profile',
          tabBarIcon:({color})=><AntDesign name="profile" size={24} color='black'/>
          }}/>
          <Tabs.Screen name = 'Explore'
          options={{tabBarLabel:'Search',
          tabBarIcon:({color})=><AntDesign name="search1" size={24} color='black' />
          }}/>
           <Tabs.Screen name = 'News'
          options={{tabBarLabel:'News',
          tabBarIcon:({color})=><Ionicons name="newspaper-outline" size={24} color="black" />
          }}/>
      </Tabs>
  )
}