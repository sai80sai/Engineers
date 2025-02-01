import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Type here to search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Image 
          source={require('../../assets/images/icon1.png')} 
          style={styles.searchIcon} 
        />
      </View>
      {/* <Text style={styles.results}>Search Query: {searchQuery}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom:-20,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  results: {
    marginTop: 16,
    fontSize: 16,
  },
});
