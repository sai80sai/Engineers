import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db,storage } from '../../app/configs/firebaseConfigs';

export default function Sub() {
  const [name, setName] = useState('');
  const [video, setVideo] = useState(null);

  const pickVideo = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const videoUri = result.assets[0].uri;
      setVideo(videoUri);
      
      // Upload the video to Firebase Storage
      const response = await fetch(videoUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `videos/${Date.now()}-${name}.mp4`);
      
      await uploadBytes(storageRef, blob).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Save the video URL to Firestore
        await addDoc(collection(db, "videos"), {
          name: name,
          videoUrl: downloadURL,
          createdAt: new Date(),
        });
        
        Alert.alert("Video uploaded successfully!");
      }).catch((error) => {
        console.error("Error uploading video: ", error);
        Alert.alert("Failed to upload video!");
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Write your name</Text>
      <TextInput
        placeholder='Name'
        onChangeText={(v) => setName(v)}
        value={name}
        style={styles.textInput}
      />
      
      <Button title="Pick a video" onPress={pickVideo} style={styles.button} />
      
      {video && (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: video }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            style={styles.video}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 15,
    backgroundColor: 'white',
    marginTop: 10,
    fontFamily: 'open',
  },
  button: {
    marginTop: 20,
  },
  videoContainer: {
    marginTop: 100,
    width: '100%',
    aspectRatio: 4 / 3,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
