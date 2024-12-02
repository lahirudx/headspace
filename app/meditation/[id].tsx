import { View, Text } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { meditations } from "@/data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";

const details = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const meditation = meditations.find((m) => m.id === Number(id));

  if (!meditation) {
    return <Text>Meditation Not Found</Text>;
  }

  return (
    <View
      className="bg-orange-400 h-full"
      style={{ paddingTop: insets.top + 10, paddingBottom: insets.bottom + 10 }}
    >
      <View className="flex-row justify-between items-center p-5">
        <AntDesign name="infocirlceo" size={26} color="black" />
        <Text className="text-xl font-semibold bg-zinc-800 rounded-xl text-white p-2 text-center">
          Today's Meditation
        </Text>

        <AntDesign
          onPress={() => router.back()}
          name="close"
          size={26}
          color="black"
        />
      </View>

      <Text className="text-3xl mt-10 text-center font-semibold text-zinc-800">
        {meditation.title}
      </Text>
      <View className="flex-1 items-center justify-center">
        <View className="self-center items-center w-24 rounded-full aspect-square justify-center bg-zinc-800">
          <FontAwesome6 name="play" size={24} color="snow" />
        </View>
      </View>
      <View className="p-5">
        <View className="flex-row justify-between">
          <MaterialIcons name="airplay" size={24} color="#3A3937" />
          <MaterialCommunityIcons
            name="cog-outline"
            size={24}
            color="#3A3937"
          />
        </View>
        <Slider
          className="w-full"
          minimumValue={0}
          maximumValue={1}
          maximumTrackTintColor="#3A393755"
          minimumTrackTintColor="#3A3937"
          thumbTintColor="#3A3937"
        />
      </View>
    </View>
  );
};

export default details;
