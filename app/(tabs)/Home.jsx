import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/head/Header'
import Slider from '../../components/head/Slider'
import Courses from '../../components/head/Courses'
import Events from '../../components/head/Events'
import Search from '../../components/head/Search'
import App from '../../components/head/App'
import Horizon from '../../components/head/Horizon'
import Buttons from '../../components/head/Buttons'

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Header/>
    <View style={styles.section}>
      <Search />
    </View>
    <View>
      <Slider/>
    </View>
    <View>
      <Events/>
    </View>
    <View>
      <Courses/>
    </View>
    {/* <View>
      <Horizon/>
    </View> */}
    {/* <View>
      <Verify/>
    </View> */}
    {/* <View>
      <Events/>
    </View> */}
    <View>
      <Buttons/>
    </View>
  </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flexGrow: 2,
  },
  section: {
    marginBottom: 20, // Adjust this value to set the spacing between Slider and Category
  },
});