import React, { useState } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text, Alert } from "react-native";
import { ArrowLeftIcon, MapPinIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function ReviewScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [yesActive, setYesActive] = useState(false);
  const [noActive, setNoActive] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Az "YYYY-MM-DD" rész kivétele
  };

  /*TODO: useful countert megcsinalni*/
  const usefulCounter = (item) => {
    setYesActive(!yesActive);
    setNoActive(noActive);
    /*if (onclick(item.usefulSum)) {
      item.usefulSum += 1;
    }
    if (onclick(item.uselessSum)) {
      item.uselessSum += 1;
    }*/
  };

  const showAlert = () =>
    Alert.alert(
      "Report review",
      "Are you sure you want to report it?",
      [
        {
          text: "Yes",
          onPress: () => reportReview(),
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
    );

  /*TODO: report review*/
  const reportReview = () => {

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
        {/*TODO: sémába reviewImaget létre kell hozni?
        source={!item.reviewImage ? (require("../src/assets/reviewCoverImg.jpg")) : { uri: `http://10.0.2.2:3000/reviewImg/${item.reviewId}.jpg`}}
        */}
        <Image source={{ uri: `http://10.0.2.2:3000/reviewImg/${item.reviewId}.jpg` }}
               style={{ height: 300 }}
        />
      </View>
      <ScrollView className="flex-1 bg-white px-2"
                  style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: -22 }}>
        <View style={{
          borderRadius: 50,
          backgroundColor: "white",
          marginHorizontal: 20,
          marginBottom: 20,
          padding: 15,
          height: 490,
        }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={{ uri: `http://10.0.2.2:3000/userImg/profile/${item.authorId}.jpg` }}
                   style={{ width: 90, height: 90, marginLeft: 10, borderRadius: 50 }} />
            <Text style={{ paddingTop: 10, paddingLeft: 90 }}>{formatDate(item.createdAt)}</Text>
          </View>
          {/*TODO: nevet nem jeleníti meg (item.author.name)*/}
          <Text style={{
            paddingVertical: 10,
            paddingLeft: 15,
            fontSize: 15,
            fontWeight: "bold",
            marginBottom: 10,
          }}>{item.author}Hiányzik Név</Text>
          <View style={{ flexDirection: "row", marginLeft: -4 }}>
            <MapPinIcon style={{ marginLeft: 20, color: theme.text }} size="22" />
            <Text style={{ fontSize: 16, marginTop: 2, color: theme.text }}>
              {item.cityCountryName}
            </Text>
          </View>
          <Text style={{ padding: 5 }}>{item.revText}</Text>
          <View>
            <Text className="pt-3 mr-2 font-bold">It was useful for you?</Text>
            <View className="flex-row pb-2 my-4">
              <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                activeOpacity={0.7}
                                style={{ backgroundColor: theme.iconOnG }}
                                onPress={() => usefulCounter(item.usefulnessCount)}
              >
                <Text className="font-xl font-bold text-center text-white px-4">Yes - {item.usefulnessCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                activeOpacity={0.7}
                                style={[styles.button, noActive && styles.iconOff]}
                                onPress={() => usefulCounter(item.uselessnessCount)}>
                <Text className="font-l font-bold text-center text-white px-4">No - {item.uselessnessCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-3 px-4 rounded-3xl mx-2"
                                style={{ backgroundColor: theme.decrementButton }}
                                onPress={showAlert}>
                <Text className="font-xl font-bold text-center text-white px-2">Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
