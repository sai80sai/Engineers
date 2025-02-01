import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Menu() {
  const menu = [
    {
      id: 1,
      name: 'Add',
      icon: require('../../assets/images/react-logo.png'),
      path: '/Adding/Add'
    },
    {
        id: 2,
        name: 'Mine',
        icon: require('../../assets/images/image.png'),
        path: '/Adding/Mine'
    },
    
  ];
  const route=useRouter();
  const onMenuClick=(item)=>{
    route.push(item.path)
  }

  return (
    <View>
      <FlatList
        data={menu}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={()=>onMenuClick(item)}
                style={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    gap:10,
                    flex:1,
                    padding:10,
                    borderRadius:15,
                    borderWidth:1,
                    margin:10,

                }}
            >
            <Image 
              source={item.icon}
              style={{
                width: 50,
                height: 50
              }}
            />
            <Text>{item.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  );
}
