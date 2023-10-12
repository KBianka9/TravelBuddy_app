import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { theme } from "../theme";
import * as React from "react";
import EmptyList from "../components/emptyList";
import { useNavigation } from "@react-navigation/native";
import Video from "react-native-video";
import * as Animatable from "react-native-animatable";

const trip = [
  {
    id: 1,
    tripName: "Indonesian dream",
    img: require("../src/assets/indonesia-cover-2.jpg"),
    city: "Raha",
    country: "Indonesia",
    date: "09.09.2021 - 09.15.2021",
    destinationF: "Uluwatu Temple",
    destinationS: "Pura Ulun Danu Beratan",
    destinationT: "Tanah Lot",
  },
  {
    id: 2,
    tripName: "Eden in Honolulu",
    img: require("../src/assets/hawaii.jpg"),
    city: "Honolulu",
    country: "Hawaii",
    date: "09.09.2020 - 09.15.2020",
    destinationF: "Uluwatu Temple",
    destinationS: "Pura Ulun Danu Beratan",
    destinationT: "Tanah Lot",
  },
  {
    id: 3,
    tripName: "The jewel of Italy",
    img: require("../src/assets/sardinia.jpg"),
    city: "Cagliari",
    country: "Italy",
    date: "09.09.2019 - 09.15.2019",
    destinationF: "Uluwatu Temple",
    destinationS: "Pura Ulun Danu Beratan",
    destinationT: "Tanah Lot",
  },
  {
    id: 4,
    tripName: "Indonesia autumn",
    img: require("../src/assets/hunterrice.jpg"),
    city: "Cebu",
    country: "Indonesia",
    date: "09.09.2018 - 09.15.2018",
    destinationF: "Uluwatu Temple",
    destinationS: "Pura Ulun Danu Beratan",
    destinationT: "Tanah Lot",
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
        <View className="px-4 space-y-4">
          <View className="flex-row justify-between items-center px-4 pb-4">
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 24 }}>Recent Trips</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AddTrip")}>
              <Animatable.Text animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                               style={{
                                 backgroundColor: theme.background,
                                 borderRadius: 50,
                                 padding: 5,
                                 fontWeight: "bold",
                                 borderWidth: 0,
                               }}>+ Add trip</Animatable.Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ height: 390 }}>
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
