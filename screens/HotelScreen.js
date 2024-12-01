import React, { useContext, useEffect, useState } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text, Button } from "react-native";
import { ArrowLeftIcon, MapPinIcon, StarIcon } from "react-native-heroicons/solid";
import { HomeModernIcon as HomeModernIconOutline } from "react-native-heroicons/outline";
import { HomeModernIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
import { favoriteHotel, unFavoriteHotel } from "../contollers/accommodationContoller";
import { UserContext } from "../App";

export default function HotelScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [favorite, setFavorite] = useState(false);
  const { user } = useContext(UserContext);
  const [appKey, setAppKey] = useState(0);

  const reloadApp = () => {
    setAppKey(prev => prev + 1);
  };

  useEffect(() => {
    setFavorite(item.favoritedBy.findIndex(u => u.userId === user.userId) !== -1);
    reloadApp();
  }, []);

  const saveFavoriteHotel = async (itemId) => {
    try {
      await favoriteHotel(itemId, user.userId);
      setFavorite(true);
      item.favoritedBy.push(user);
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "You can check in your favorite hotel list.",
        visibilityTime: 5000,
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error saving accommodation to favorites!",
        visibilityTime: 5000,
      });
    }
  };

  const removeFavoriteHotel = async (itemId) => {
    try {
      await unFavoriteHotel(itemId, user.userId);
      setFavorite(false);
      const userIndex = item.favoritedBy.findIndex(u => u.userId === user.userId);
      item.favoritedBy = item.favoritedBy.splice(userIndex, 1);
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "You can removed the hotel from the favorite list!",
        visibilityTime: 5000,
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "You can't delete this item from your favorite hotel list!",
        visibilityTime: 5000,
      });
    }
  };

  return (
    <View className="flex-1" key={appKey}>
      <Image source={{ uri: `http://10.0.2.2:3000/accommodationImg/${item.accommodationId}.jpg` }}
             style={{ height: 310 }}
             className="w-full absolute"
      />
      <SafeAreaView>
        <View className="flex-row justify-between items-center mr-2 mt-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            style={{ backgroundColor: theme.button }}>
            <ArrowLeftIcon size="25" color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8"
            style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 210 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ shadowOpacity: 1 }}
                            onPress={() => favorite ? removeFavoriteHotel(item.accommodationId) : saveFavoriteHotel(item.accommodationId)}
          >
            <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                             style={{
                               marginTop: -35,
                               backgroundColor: theme.button,
                               borderRadius: 50,
                               padding: 10,
                               start: 250,
                             }}
            >
              {favorite ?
                <HomeModernIcon size={40} strokeWidth={1} color={theme.iconOn} /> :
                <HomeModernIconOutline size={40} strokeWidth={1} color={theme.iconOn} />
              }
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{
            backgroundColor: theme.button, flexDirection: "row", alignItems: "center", borderRadius: 20,
            width: 60, padding: 10, marginVertical: 10,
          }}>
            <StarIcon style={{ alignItems: "center", padding: 8, marginLeft: 2 }} size="19" color="white" />
            <Text style={{ fontSize: 17, color: "white", fontWeight: "bold", marginLeft: 6 }}>{item.star}</Text>
          </View>
          <View className="ml-2 space-y-3">
            <Text style={{ fontSize: 24, marginTop: 5, color: "black", fontWeight: "bold" }}>
              {item.name}
            </Text>
            <View style={{ flexDirection: "row", marginLeft: -4 }}>
              <MapPinIcon style={{ marginLeft: 20 }} size="25" color="black" />
              <Text style={{ fontSize: 18, marginTop: 2, color: "black" }}>
                {item.cityCountryName}
              </Text>
            </View>
            <View style={{ marginTop: 8, alignItems: "flex-end" }}>
              <Text style={{ fontSize: 24, color: theme.iconOff, fontWeight: "bold" }}>{item.nightPrice} €/night</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 20, marginTop: 5, color: theme.text, fontWeight: "bold" }}>About Hotel and
                around</Text>
              <Text style={{ fontSize: 15, marginTop: 5, color: "black", paddingBottom: 20 }}>{item.description}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
