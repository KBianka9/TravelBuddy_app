import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { theme } from "../theme";
import * as React from "react";
import EmptyList from "../components/emptyList";
import { useNavigation } from "@react-navigation/native";
import Video from "react-native-video";
import * as Animatable from "react-native-animatable";
import { PlusIcon } from "react-native-heroicons/solid";

const trip = [
  {
    id: 1,
    tripName: "Indonesian dream",
    name: "Hotel Mutiara",
    img: require("../src/assets/indonesia-cover-2.jpg"),
    city: "Raha",
    country: "Indonesia",
    date: "09.09.2021 - 12.09.2021",
  },
  {
    id: 2,
    tripName: "Eden in Honolulu",
    name: "Moana Surfrider Resort",
    img: require("../src/assets/hawaii.jpg"),
    city: "Honolulu",
    country: "Hawaii",
    date: "09.08.2020 - 20.08.2020",
  },
  {
    id: 3,
    tripName: "The jewel of Italy",
    name: "San Teodoro Hotel",
    img: require("../src/assets/sardinia.jpg"),
    city: "Cagliari",
    country: "Italy",
    date: "02.02.2019 - 10.02.2019",
  },
  {
    id: 4,
    tripName: "Indonesia autumn",
    name: "Solea Mactan Resort",
    img: require("../src/assets/hunterrice.jpg"),
    city: "Cebu",
    country: "Indonesia",
    date: "20.12.2018 - 24.12.2018",
  },
];
export default function RoutePlannerScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
      <Video
        source={require("../src/assets/video/video.mp4")}
        paused={false}
        style={{ height: 300, width: "100%" }}
        repeat={true}
      />
      <View className="flex-1 bg-white pt-6"
            style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: -78, paddingBottom: 120 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ shadowOpacity: 1 }}
                            onPress={() => navigation.navigate("AddTrip")}
          >
            <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                             style={{
                               marginTop: -55,
                               backgroundColor: theme.button,
                               borderRadius: 50,
                               padding: 10,
                               start: 280,
                             }}
            >
              <PlusIcon size={40} strokeWidth={1} color={theme.iconOn} />
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <View className="px-4 space-y-4">
          <View className="flex-row justify-between items-center px-4">
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 24 }}>Recent Trips</Text>
          </View>
          <ScrollView style={{ height: 400 }}>
            <FlatList data={trip}
                      numColumns={2}
                      ListEmptyComponent={<EmptyList message={"You haven't recorded any trips yet"} />}
                      keyExtractor={trip => trip.id}
                      showsVerticalScrollIndicator={false}
                      columnWrapperStyle={{
                        justifyContent: "space-between",
                      }}
                      className="mx-1"
                      renderItem={({ item }) => {
                        return (
                          <TouchableOpacity onPress={() => navigation.navigate("RecentTrip", { ...item })}
                                            className="p-3 rotate-2xl mb-3 shadow-sm"
                                            style={{ borderRadius: 25, backgroundColor: theme.background }}>
                            <View>
                              <Image source={item.img}
                                     className="w-36 h-36 mb-2 rounded-3xl"
                              />
                              <Text style={{ color: "black", fontWeight: "bold" }}>{item.tripName}</Text>
                              <Text style={{ color: theme.text, fontSize: 12 }}>{item.date}</Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
