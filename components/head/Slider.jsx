import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import {db} from '../../app/configs/firebaseConfigs'
import { collection, query, getDocs } from 'firebase/firestore';

export default function Slider() {
    const [sliderList, setSliderList] = useState([]);

    useEffect(() => {
        GetSliderList();
    }, []);

    const GetSliderList = async () => {
        setSliderList([]);
        try {
            const q = query(collection(db, 'Slider'));
            const querySnapshot = await getDocs(q);
            const sliders = [];
            querySnapshot.forEach((doc) => {
                sliders.push({ id: doc.id, ...doc.data() });
            });
            console.log('Fetched sliders:', sliders);
            setSliderList(sliders);
        } catch (error) {
            console.error('Error fetching sliders:', error.message);
            console.error('Error details:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Slider</Text>
            <FlatList
                data={sliderList}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sliderContainer}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={[styles.image]}
                        onError={(e) => console.error('Error loading image:', e.nativeEvent.error)}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 12,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
    },
    sliderContainer: {
        paddingRight: 10,
    },
    image: {
        width: 400,
        height: 200,
        marginRight: 20,
        borderRadius: 20,
    },
});
