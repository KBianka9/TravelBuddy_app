import React from "react";
import { Image, TouchableOpacity, View, ScrollView, Text } from "react-native";
import { ArrowLeftIcon, MapPinIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { SliderBox } from "react-native-image-slider-box";

export default function ReviewScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();

  /*TODO: useful countert megcsinalni*/
  const usefulCounter = (item) => {
    if (onclick(item.usefulSum)) {
      item.usefulSum += 1;
    }
    if (onclick(item.uselessSum)) {
      item.uselessSum += 1;
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center mr-2 mt-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          style={{ backgroundColor: theme.button, zIndex: 1 }}>
          <ArrowLeftIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: -55 }}>
        <SliderBox images={item.images}
                   dotStyle={{ marginBottom: 25, height: 10, width: 10, borderRadius: 50 }}
                   sliderBoxHeight={380}
                   dotColor={theme.iconOnG}
                   imageLoadingColor={theme.iconOnG}
                   autoplay={true}
                   autoplayInterval={5000}
                   loop={true}
        />
      </View>
      <ScrollView className="flex-1 bg-white px-2"
                  style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: -22 }}>
        <View style={{
          borderRadius: 50,
          backgroundColor: "white",
          marginHorizontal: 20,
          marginVertical: 10,
          padding: 15,
          height: 490,
        }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={item.profilePic}
                   style={{ width: 90, height: 90, marginLeft: 10, borderRadius: 50 }} />
            <Text style={{ paddingTop: 10, paddingLeft: 90 }}>{item.postDate}</Text>
          </View>
          <Text style={{
            paddingVertical: 10,
            paddingLeft: 15,
            fontSize: 15,
            fontWeight: "bold",
            marginBottom: 10,
          }}>{item.user}</Text>
          <View style={{ flexDirection: "row", marginLeft: -4 }}>
            <MapPinIcon style={{ marginLeft: 20, color: theme.text }} size="22" />
            <Text style={{ fontSize: 16, marginTop: 2, color: theme.text }}>
              Raha, Indonesia
            </Text>
          </View>
          <Text style={{ padding: 5 }}>{item.text}</Text>
          <View>
            <Text className="pt-3 mr-2 font-bold">It was useful for you?</Text>
            <View className="flex-row pb-2 my-4">
              <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                style={{ backgroundColor: theme.iconOnG }}
                                onPress={() => usefulCounter(item.usefulSum)}>
                <Text className="font-xl font-bold text-center text-white px-4">Yes - {item.usefulSum}</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                style={{ backgroundColor: theme.iconOff }}
                                onPress={() => usefulCounter(item.uselessSum)}>
                <Text className="font-l font-bold text-center text-white px-4">No - {item.uselessSum}</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-3 px-4 rounded-3xl mx-2"
                                style={{ backgroundColor: theme.decrementButton }}
                                onPress={() => {
                                }}>
                <Text className="font-xl font-bold text-center text-white px-2">Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
