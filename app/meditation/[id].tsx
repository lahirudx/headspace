import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { meditations } from "@/data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";

const Details = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const meditation = meditations.find((m) => m.id === Number(id));

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  async function loadAudio() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/meditations/audio1.mp3")
    );
    setSound(sound);
  }

  async function handlePlayPause() {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  }

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (sound) {
      sound.getStatusAsync().then((status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis || 0);
        }
      });

      const interval = setInterval(async () => {
        if (isPlaying) {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setPosition(status.positionMillis);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sound, isPlaying]);

  const handleSliderChange = (value: number) => {
    setPosition(value); // Update UI only while sliding
  };

  const handleSliderComplete = async (value: number) => {
    if (!sound) return;
    await sound.setPositionAsync(value);
    setPosition(value);
  };

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
          {isPlaying ? (
            <FontAwesome6
              onPress={handlePlayPause}
              name="pause"
              size={24}
              color="snow"
            />
          ) : (
            <FontAwesome6
              onPress={handlePlayPause}
              name="play"
              size={24}
              color="snow"
            />
          )}
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
          maximumValue={duration}
          value={position}
          onValueChange={handleSliderChange}
          onSlidingComplete={handleSliderComplete}
          maximumTrackTintColor="#3A393755"
          minimumTrackTintColor="#3A3937"
          thumbTintColor="#3A3937"
        />
        <View className="flex-row justify-between px-2 mt-2">
          <Text className="text-zinc-800">{formatTime(position)}</Text>
          <Text className="text-zinc-800">{formatTime(duration)}</Text>
        </View>
      </View>
    </View>
  );
};

export default Details;
