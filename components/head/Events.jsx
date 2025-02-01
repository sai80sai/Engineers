import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import {db} from '../../app/configs/firebaseConfigs';
import Elist from './Elist';
import { useRouter } from 'expo-router';

export default function Events() {
  const [eventsList, setEventsList] = useState([]);
  const router=useRouter();
  useEffect(() => {
    GetEventsList();
  }, []);

  const GetEventsList = async () => {
    setEventsList([]);
    const q = query(collection(db, 'events'));
    const querySnapshot = await getDocs(q);

    const event = [];
    querySnapshot.forEach((doc) => {
      event.push(doc.data());
    });
    setEventsList(event);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 25,fontWeight:'bold', }}>Google Icons</Text>
      </View>
      <FlatList
        data={eventsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Elist event={item}
        onEventPress={(event)=>router.push('/EventList/'+item.name)}
        />}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
}
