import React from 'react';
import { View, StyleSheet } from 'react-native';
import Courses from './Courses'; // Adjust path as per your project structure

export default function App() {
  return (
    <View style={styles.container}>
      <Courses />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
});
