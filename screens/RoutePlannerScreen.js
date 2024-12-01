import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import { theme } from "../theme";
import * as React from "react";
import EmptyList from "../components/emptyList";
import { useNavigation } from "@react-navigation/native";
import Video from "react-native-video";
import * as Animatable from "react-native-animatable";
import { PlusIcon } from "react-native-heroicons/solid";
import { useContext, useEffect, useState } from "react";
import { listWithFav, unFavoriteHotel } from "../contollers/accommodationContoller";
import Toast from "react-native-toast-message";
import { listTrip, removeTrip } from "../contollers/tripController";
import { UserContext } from "../App";

export default function RoutePlannerScreen() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [trips, setTrips] = useState([]);
  const [appKey, setAppKey] = useState(0);

  const reloadApp = () => {
    setAppKey(prev => prev + 1);
  };

  useEffect(() => {
    loadTrips();
    reloadApp();
  }, []);

  const loadTrips = async () => {
    try {
      const response = await listTrip();
      setTrips(response.data);
      console.log(trips);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };

  const showAlert = () =>
    Alert.alert(
      "Delete trip",
      "Are you sure you want to delete it?",
      [
        {
          text: "Yes",
          onPress: () => deleteTrip(),
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
    );
  /*TODO: delete trip*/
  const deleteTrip = async (itemId) => {
    try {
      await removeTrip(itemId, user.userId);
      await loadTrips();
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "You can removed the trip from the list!",
        visibilityTime: 5000,
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "You can't delete this item from the list!",
        visibilityTime: 5000,
      });
    }
  };

  return (
    <View className="flex-1 bg-white" keyboardShouldPersistTaps={"handled"} key={appKey}>
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
            <FlatList data={trips}
                      numColumns={2}
                      ListEmptyComponent={<EmptyList />}
                      keyExtractor={trip => trip.id}
                      showsVerticalScrollIndicator={false}
                      columnWrapperStyle={{
                        justifyContent: "space-between",
                      }}
                      className="mx-1"
                      renderItem={({ item }) => {
                        return (
                          <TouchableOpacity onPress={() => navigation.navigate("RecentTrip", { ...item })}
                                            onLongPress={showAlert}
                                            className="p-3 rotate-2xl mb-3 shadow-sm"
                                            style={{ borderRadius: 25, backgroundColor: theme.background }}>
                            <View>
                              <Image
                                source={{ uri: `http://10.0.2.2:3000/accommodationImg/${item.accommodationId}.jpg` }}
                                className="w-36 h-36 mb-2 rounded-3xl"
                              />
                              <Text style={{ color: "black", fontWeight: "bold" }}>{item.tripTitle}</Text>
                              <Text style={{ color: theme.text, fontSize: 12 }}>{item.from} - {item.to}</Text>
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
