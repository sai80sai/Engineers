import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../configs/firebaseConfigs'; // Ensure you are importing db and storage from the correct path
import { useUser } from '@clerk/clerk-expo'; // Updated import

export default function Add() {
  const navigation = useNavigation();
  const { user } = useUser(); // Access the user object directly
  const [image, setImage] = useState(null);
  const [listsList, setListsList] = useState([]);
  const [name, setName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add new',
      headerShown: true,
    });
    GetLists();
  }, []);

  const onImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }

      console.log(result);
    } catch (error) {
      console.error('Error picking image: ', error);
    }
  };

  const GetLists = async () => {
    try {
      setListsList([]);
      const q = collection(db, 'Course');
      const snapShot = await getDocs(q);

      const courses = [];
      snapShot.forEach((doc) => {
        console.log(doc.data());
        courses.push({
          label: doc.data().name,
          value: doc.data().name,
        });
      });
      setListsList(courses);
    } catch (error) {
      console.error('Error getting course list: ', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!name || !selectedCourse) {
        alert('Please fill in all fields');
        return;
      }

      if (!image) {
        alert('Please select an image');
        return;
      }

      // Upload the image to Firebase Storage
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, `images/${Date.now()}-${name}.jpg`);

      await uploadBytes(storageRef, blob)
        .then(async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);

          // Save the document to Firestore with the image URL
          const newDoc = {
            name: name,
            course: selectedCourse,
            imageUrl: downloadURL, // Save the image download URL
            user:user?.fullName,
            username: user?.primaryEmailAddress?.emailAddress || 'No Email', // Safe access to email address
          };

          await addDoc(collection(db, 'Lists'), newDoc);
          alert('Data saved successfully');
          setName('');
          setSelectedCourse('');
          setImage(null);
        })
        .catch((error) => {
          console.error('Error uploading image: ', error);
          alert('Failed to upload image!');
        });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add</Text>
      <TouchableOpacity onPress={onImagePick}>
        {!image ? (
          <Image source={require('../../assets/images/react-logo.png')} />
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(v) => setName(v)}
          value={name}
          style={styles.textInput}
        />
      </View>
      <View style={styles.picker}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedCourse(value)}
          items={listsList}
          value={selectedCourse}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontFamily: 'open-bl',
  },
  image: {
    width: 200,
    height: 200,
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
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 10,
    fontFamily: 'open',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
