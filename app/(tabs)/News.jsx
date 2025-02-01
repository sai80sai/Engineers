import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
const { width } = Dimensions.get('screen');
const DATA = [
  // Event data array
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated }) => {
  // OverflowItems component code
  return (
    <View>
      {data.map((item, index) => (
        <View key={index}>
          <Text>{item.title}</Text>
          {/* Additional overflow item content */}
        </View>
      ))}
    </View>
  );
};

export default function App() {
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // fetch more data logic
    }
  }, [index]);

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  }, [scrollXIndex]);

  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
        <FlatList
          data={data}
          keyExtractor={(_, index) => String(index)}
          horizontal
          inverted
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            padding: SPACING * 2,
            marginTop: 50,
          }}
          scrollEnabled={false}
          removeClippedSubviews={false}
          CellRendererComponent={({ item, index, children, style, ...props }) => {
            const newStyle = [style, { zIndex: data.length - index }];
            return (
              <View style={newStyle} index={index} {...props}>
                {children}
              </View>
            );
          }}
          renderItem={({ item, index }) => {
            const inputRange = [index - 1, index, index + 1];
            const translateX = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [50, 0, -100],
            });
            const scale = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [0.8, 1, 1.3],
            });
            const opacity = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
            });

            return (
              <Animated.View
                style={{
                  position: 'absolute',
                  left: -ITEM_WIDTH / 2,
                  opacity,
                  transform: [{ translateX }, { scale }],
                }}
              >
                <Image
                  source={{ uri: item.poster }}
                  style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT, borderRadius: 14 }}
                />
              </Animated.View>
            );
          }}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});