// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
// import { db } from '../../app/configs/firebaseConfigs';
// import { collection, query, getDocs } from 'firebase/firestore';

// const SLIDER_ITEM_WIDTH = 300; // Adjust the width of each slider item as needed

// export default function Horizon() {
//     const [horizonList, setHorizonList] = useState([]);

//     useEffect(() => {
//         GetHorizon();
//     }, []);

//     const GetHorizon = async () => {
//         setHorizonList([]);
//         const q = query(collection(db, 'Horizon'));
//         const querySnapshot = await getDocs(q);
//         const hori = [];
//         querySnapshot.forEach((doc) => {
//             hori.push({ id: doc.id, ...doc.data() });
//         });
//         setHorizonList(hori);
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Horizon</Text>
//             <FlatList
//                 data={horizonList}
//                 horizontal
//                 pagingEnabled
//                 snapToAlignment="center"
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.sliderContainer}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <Image
//                         source={{ uri: item.imageUrl }}
//                         style={[styles.image]}
//                     />
//                 )}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         paddingVertical: 20,
//         paddingHorizontal: 12,
//     },
//     title: {
//         fontWeight:'bold',
//         fontSize: 25,
//         marginBottom: 10,
//     },
//     sliderContainer: {
//         paddingRight: 10,
//     },
//     image: {
//         width:400,
//         height:200,
//         marginRight:20,
//         borderRadius:20,
//     },
// });
