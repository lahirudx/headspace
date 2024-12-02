import { Meditation } from "@/types";

// data.ts
export const meditations: Meditation[] = [
  {
    id: 1,
    title: "60 Seconds of Mindfulness",
    duration: 1,
    type: "audio",
    pro: false,
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav",
  },
  {
    id: 2,
    title: "5 Minute Breathing Exercise",
    duration: 5,
    type: "audio",
    pro: true,
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav",
  },
  {
    id: 3,
    title: "Body Scan Meditation",
    duration: 10,
    type: "audio",
    pro: true,
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav",
  },
  {
    id: 4,
    title: "Loving-Kindness Practice",
    duration: 15,
    type: "audio",
    pro: true,
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther60.wav",
  },
  {
    id: 5,
    title: "Stress Relief Meditation",
    duration: 8,
    type: "audio",
    pro: true,
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
  },
  {
    id: 6,
    title: "Morning Energy Boost",
    duration: 3,
    type: "audio",
    pro: true,
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/tada.wav",
  },
];
