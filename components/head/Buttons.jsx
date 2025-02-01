import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function B1() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Course</Text>
      <View style={[styles.buttonContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <TouchableOpacity style={[styles.button]} onPress={() => router.push('/CoursesH')}>
          <Text style={styles.buttonText}>C Course</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={() => router.push('/CoursesJava')}>
          <Text style={styles.buttonText}>Java Course</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <TouchableOpacity style={[styles.button]} onPress={() => router.push('/CoursesPython')}>
          <Text style={styles.buttonText}>Python Course</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={() => router.push('/CoursesPython')}>
          <Text style={styles.buttonText}>Python Course</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: '40%', // Adjust width as needed
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
