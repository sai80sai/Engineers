import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import LoginScreen from '../components/LoginScreen';
import IntroScreen from '../app/IntroScreen';
import { Stack } from "expo-router";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Simulating some loading process before showing the sign-in page
    setTimeout(() => {
      setIsLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Fade in duration
        useNativeDriver: true,
      }).start();
    }, 2000); // Adjust the delay time as needed
  }, [fadeAnim]);

  useFonts({
    'open': require('../assets/fonts/OpenSans-Medium.ttf'),
    'open-bl': require('../assets/fonts/OpenSans_Condensed-Bold.ttf'),
    'open-bol': require('../assets/fonts/OpenSans_Condensed-ExtraBold.ttf'),
    'int-bol': require('../assets/fonts/Inter-ExtraBold.ttf'),
    'not-bol': require('../assets/fonts/NotoSans_Condensed-ExtraBold.ttf'),
    'open-b': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <IntroScreen fadeAnim={fadeAnim} />
      </View>
    );
  }

  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Add your screen components here */}
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
