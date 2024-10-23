import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text } from "react-native";
import { ArrowLeftIcon, MapPinIcon, StarIcon } from "react-native-heroicons/solid";
import { HomeModernIcon as HomeModernIconOutline } from "react-native-heroicons/outline";
import { HomeModernIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { Rating } from "react-native-ratings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function HotelScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [favorite, setFavorite] = useState(false);
  /*TODO: kedvencek jelölve maradnak
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    if(!isLoading){
      renderFavorite(item?.id);
    }
  }, [isLoading]);

  const getItem = () => {
    const result = hotelItems.find((item) => item.id === id);
    setIsLoading(false);
  };*/

  const saveFavoriteHotel = async (itemId) => {
    setFavorite(true);
    await AsyncStorage.getItem("favorite").then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((val) => val === itemId);
        if (data == null) {
          res.push(itemId);
          AsyncStorage.setItem("favorite", JSON.stringify(res));
          Toast.show({
            type: "success",
            text1: "Hotel saved!",
            text2: "You can check in your favorite hotel list.",
            visibilityTime: 5000,
          });
        }
      } else {
        let favorite = [];
        favorite.push(itemId);
        AsyncStorage.setItem("favorite", JSON.stringify(favorite));
        Toast.show({
          type: "success",
          text1: "Hotel saved!",
          text2: "You can check in your favorite hotel list.",
          visibilityTime: 5000,
        });
      }
    });
  };

  const removeFavoriteHotel = async (itemId) => {
    setFavorite(false);
    const favorite = await AsyncStorage.getItem("favorite").then((token) => {
      const res = JSON.parse(token);
      return res.filter((id) => id !== itemId);
    });
    await AsyncStorage.setItem("favorite", JSON.stringify(favorite));
    Toast.show({
      type: "error",
      text1: "Hotel unsaved!",
      text2: "You can't find this item in your favorite hotel list.",
      visibilityTime: 5000,
    });
  };

  const renderFavorite = async (itemId) => {
    await AsyncStorage.getItem("favorite").then((token) => {
      const res = JSON.parse(token);
      if (res != null) {
        let data = res.find((val) => val === itemId);
        data == null ? setFavorite(false) : setFavorite(true);
      }
    });
  };

  return (
      <View className="flex-1">
        <Image source={item.image}
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
                              onPress={() => favorite ? removeFavoriteHotel(item.id) : saveFavoriteHotel(item.id)}
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
              width: 80, padding: 10, marginVertical: 10,
            }}>
              <StarIcon style={{ alignItems: "center", padding: 8, marginLeft: 2 }} size="19" color="white" />
              <Text style={{ fontSize: 17, color: "white", fontWeight: "bold", marginLeft: 6 }}>{item.stars}</Text>
            </View>
            <View className="ml-2 space-y-3">
              <Text style={{ fontSize: 24, marginTop: 5, color: "black", fontWeight: "bold" }}>
                {item.name}
              </Text>
              <View style={{ flexDirection: "row", marginLeft: -4 }}>
                <MapPinIcon style={{ marginLeft: 20 }} size="25" color="black" />
                <Text style={{ fontSize: 18, marginTop: 2, color: "black" }}>
                  {item.city}, {item.country}
                </Text>
              </View>
              <View style={{ marginTop: 8, alignItems: "flex-end" }}>
                <Text style={{ fontSize: 24, color: theme.iconOff, fontWeight: "bold" }}>{item.price}</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 20, marginTop: 5, color: theme.text, fontWeight: "bold" }}>About Hotel and
                  around</Text>
                <Text style={{ fontSize: 15, marginTop: 5, color: "black" }}>{item.description}</Text>
              </View>
              <View style={{ marginTop: 10, paddingBottom: 20 }}>
                <Text
                  style={{ fontSize: 20, marginVertical: 10, color: theme.text, fontWeight: "bold" }}>Location</Text>
                <Image source={item.map}
                       style={{ width: 320, height: 160, borderRadius: 10 }} />
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ color: theme.text, fontSize: 20, fontWeight: "bold" }}>Ratings for the accommodation</Text>
              <Text style={{ marginVertical: 15, fontSize: 16 }}>Value for money</Text>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                onFinishRating={this.ratingCompleted}
              />
              <Text style={{ marginTop: 15, fontSize: 16 }}>Staff</Text>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                onFinishRating={this.ratingCompleted}
              />
              <Text style={{ marginTop: 15, fontSize: 16 }}>Comfort</Text>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                onFinishRating={this.ratingCompleted}
              />
              <Text style={{ marginTop: 15, fontSize: 16 }}>Location</Text>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                onFinishRating={this.ratingCompleted}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
}
