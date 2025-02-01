import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Sub() {
  const [name, setName] = useState('');
  const [video, setVideo] = useState(null);

  const pickVideo = async () => {
    // Ask for permission to access the camera roll
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

    if (!result.cancelled) {
      setVideo(result.uri);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Write your name</Text>
      <TextInput
        placeholder='Name'
        onChangeText={(v) => setName(v)}
        value={name}
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
          fontSize: 15,
          backgroundColor: 'white',
          marginTop: 10,
          fontFamily: 'open',
        }}
      />
      
      <Button title="Pick a video" onPress={pickVideo} style={{ marginTop: 20 }} />
      
      {video && (
        <View style={{ marginTop: 20 }}>
          <Text>Video selected:</Text>
          <Text>{video}</Text>
        </View>
      )}
    </View>
  );
}
