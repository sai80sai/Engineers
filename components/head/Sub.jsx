import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Sub({ list }) {
  return (
    <View style={styles.container}>
      {/* <Image
        source={{ uri: list.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      /> */}
      <Text style={styles.text}>{list.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    marginRight: 20,
    alignItems: 'center',
  },
  // image: {
  //   width: '100%',
  //   height: 200,
  //   borderRadius: 10,
  //   marginBottom: 10,
  // },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});
