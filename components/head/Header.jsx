import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import newsIcon from '../../assets/images/megaphone.png';

const { width } = Dimensions.get('window');

export default function Header() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image 
          source={{ uri: user?.imageUrl }}
          style={styles.image}
        />
        <TouchableOpacity onPress={() => router.push('/news')} style={styles.newsButton}>
          <Image 
            source={newsIcon} 
            style={styles.news}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Engineers</Text>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hi {user?.fullName}, what will you learn today?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 180,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderColor: 'black',
    borderWidth: 3,
  },
  row: {
    position: 'absolute',
    top: 40,
    right: 18,
    alignItems: 'center', // Center elements in the row
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  newsButton: {
    marginTop: 20,
  },
  news: {
    width: 0.1 * width, // Make news icon size relative to screen width
    height: 0.1 * width,
    borderRadius: 0.09 * width,
  },
  title: {
    fontSize: 0.12 * width, // Make title size relative to screen width
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  greetingContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
    bottom: 15,
  },
  greetingText: {
    fontSize: 13,
    color: 'black',
  },
});
