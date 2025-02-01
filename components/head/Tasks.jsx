import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { collection, getDocs, query } from 'firebase/firestore';
import {db} from '../../app/configs/firebaseConfigs';
import Bot from './Bot';

const { width } = Dimensions.get('window');

export default function Tasks() {
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const q = query(collection(db, 'Tasks'));
      const querySnapshot = await getDocs(q);

      const task = [];
      querySnapshot.forEach((doc) => {
        task.push(doc.data());
      });

      setTasksList(task);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verify</Text>
      </View>
      <FlatList
        horizontal
        pagingEnabled // Ensures one item per swipe
        showsHorizontalScrollIndicator={false}
        data={tasksList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Bot task={item} />}
        contentContainerStyle={styles.listContainer}
        snapToAlignment="start" 
        decelerationRate="fast" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  header: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
  },
  listContainer: {
    paddingHorizontal: (width - 200) / 2, 
    paddingVertical: 10,
  },
});

