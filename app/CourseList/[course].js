import React, { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../configs/firebaseConfigs";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const SPACING = 10;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function ListBy() {
  const navigation = useNavigation();
  const { course } = useLocalSearchParams();
  const [listsList, setListsList] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current; // Define scrollX

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: course,
    });
    getLists();
  }, []);

  const getLists = async () => {
    const q = query(collection(db, "Lists"), where("course", "==", course));
    const querySnapshot = await getDocs(q);

    const lists = [];
    querySnapshot.forEach((doc) => {
      lists.push({ id: doc.id, ...doc.data() });
    });
    setListsList(lists);
  };

  const animatedCardStyles = (index) => {
    const position = Animated.subtract(index * ITEM_WIDTH, scrollX);
    const scale = position.interpolate({
      inputRange: [-ITEM_WIDTH, 0, ITEM_WIDTH],
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp",
    });
    const opacity = position.interpolate({
      inputRange: [-ITEM_WIDTH, 0, ITEM_WIDTH],
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });
    return {
      transform: [{ scale }],
      opacity,
    };
  };

  const navigateToDetail = (user) => {
    // Navigate to another screen, passing user as a parameter
    navigation.navigate("Detail", { user });
  };

  return (
    <View style={styles.container}>
      {listsList.length > 0 ? (
        <AnimatedFlatList
          data={listsList}
          keyExtractor={(item) => item.id}
          horizontal
          snapToInterval={ITEM_WIDTH + SPACING * 2}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: SPACING }}
          renderItem={({ item, index }) => (
            <Animated.View
              style={[
                styles.card,
                {
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  marginLeft: index === 0 ? SPACING : 0,
                  ...animatedCardStyles(index),
                },
              ]}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <TouchableOpacity onPress={() => navigateToDetail(item.user)}>
                  <Text>{item.user}</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text>No lists available for {course}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 3,
    marginRight: SPACING,
    padding: SPACING,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "70%",
    borderRadius: 16,
    marginBottom: SPACING / 2,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});
