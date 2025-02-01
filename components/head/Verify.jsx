import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { collection, getDocs, query } from 'firebase/firestore';
import {db} from '../../app/configs/firebaseConfigs';
import Sub from './Sub';

const { width } = Dimensions.get('window');

export default function Verify() {
  const [listsList, setListsList] = useState([]);

  useEffect(() => {
    getLists();
  }, []);

  const getLists = async () => {
    try {
      const q = query(collection(db, 'Lists'));
      const querySnapshot = await getDocs(q);

      const lists = [];
      querySnapshot.forEach((doc) => {
        lists.push(doc.data());
      });

      setListsList(lists);
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
        data={listsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Sub list={item} />}
        contentContainerStyle={styles.listContainer}
        snapToAlignment="start" // Ensures alignment to start of the list
        decelerationRate="fast" // Adjust scrolling speed
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

