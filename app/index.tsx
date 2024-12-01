import { FlatList } from "react-native";
import { meditations } from "@/data";
import MeditationListItem from "@/components/MeditationListItem";

const meditation = meditations[0];

export default function Page() {
  return (
    <>
      <FlatList
        data={meditations}
        renderItem={({ item }) => <MeditationListItem meditation={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="gap-5 p-3"
        className="bg-white"
      />
    </>
  );
}
