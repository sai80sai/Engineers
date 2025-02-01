import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Elist({ event, onEventPress }) {
  return (
    <TouchableOpacity onPress={()=>onEventPress(event)}>
    <View style={styles.container}>
    <Image
        source={{ uri: event.poster }}
        style={styles.image}
      />
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: -15,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 100,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});
