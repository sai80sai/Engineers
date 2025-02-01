import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Clist({ course, onCoursePress }) {
  return (
    <TouchableOpacity onPress={onCoursePress}>
      <View style={styles.container}>
        <Image source={{ uri: course.icon }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 100,

  },
});
