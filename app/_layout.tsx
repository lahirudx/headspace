import { View, Text, Platform } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import Purchases from "react-native-purchases";
import "@/global.css";

const revenueCatApiKey = Platform.select({
  ios: process.env.EXPO_PUBLIC_REVANUECAT_APPLE_KEY,
  android: process.env.EXPO_PUBLIC_REVANUECAT_ANDROID_KEY,
});

const RootLayout = () => {
  useEffect(() => {
    const initializePurchases = () => {
      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
      Purchases.configure({ apiKey: revenueCatApiKey });
    };

    initializePurchases();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Meditations" }} />
      <Stack.Screen
        name="meditation/[id]"
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />
    </Stack>
  );
};

export default RootLayout;
