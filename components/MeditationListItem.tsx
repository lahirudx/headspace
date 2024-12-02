import { View, Text, Pressable } from "react-native";
import React from "react";
import { Meditation } from "@/types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router } from "expo-router";
import Paywall, { PAYWALL_RESULT } from "react-native-purchases-ui";

export default function MeditationListItem({
  meditation,
}: {
  meditation: Meditation;
}) {
  const handlePress = async () => {
    if (meditation.pro) {
      const paywallResult = await Paywall.presentPaywallIfNeeded({
        requiredEntitlementIdentifier: "Pro",
      });

      console.log("Paywall result", paywallResult);

      switch (paywallResult) {
        case PAYWALL_RESULT.ERROR:
        case PAYWALL_RESULT.CANCELLED:
          return false;
        case PAYWALL_RESULT.NOT_PRESENTED:
        case PAYWALL_RESULT.PURCHASED:
        case PAYWALL_RESULT.RESTORED:
          return router.push(`/meditation/${meditation.id}`);
        default:
          return false;
      }
    } else {
      router.push(`/meditation/${meditation.id}`);
    }
  };

  return (
    <Pressable onPress={handlePress} className="flex-row items-center gap-5">
      <View className="justify-center items-center bg-green-700 h-8 w-8 rounded-full">
        <FontAwesome6 name="check" size={16} color="white" />
      </View>
      <View className="flex-1 p-5 py-8 border-2 border-gray-300 rounded-2xl">
        <Text className="font-semibold text-2xl">{meditation.title}</Text>
        <View className="flex-row items-center gap-1">
          <FontAwesome6 name="clock" size={16} color="#6b7280" />

          <Text className="text-gray-500">
            {meditation.duration} minute{meditation.duration > 1 && "s"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
