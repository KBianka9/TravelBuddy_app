import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../theme";
import { MapPinIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";


export default function ReviewCard({ item }) {
  const navigation = useNavigation();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Az "YYYY-MM-DD" rész kivétele
  };

  return (
    <View style={{ borderRadius: 50, backgroundColor: "white", margin: 20, padding: 15, height: 490 }}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: `http://10.0.2.2:3000/userImg/profile/${item.authorId}.jpg` }}
               style={{ width: 90, height: 90, marginLeft: 10, borderRadius: 50 }} />
        <Text style={{ paddingTop: 10, paddingLeft: 90 }}>{formatDate(item.createdAt)}</Text>
      </View>
      <Text style={{
        paddingVertical: 10,
        paddingLeft: 15,
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
      }}>{item.author?.name}</Text>
      <View style={{ flexDirection: "row", marginLeft: -4 }}>
        <MapPinIcon style={{ marginLeft: 20, color: theme.text }} size="22" />
        <Text style={{ fontSize: 16, marginTop: 2, color: theme.text }}>
          {item.cityCountryName}
        </Text>
      </View>
      <Text style={{ paddingHorizontal: 15, paddingVertical: 5 }} numberOfLines={9}>{item.revText}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Review", { ...item })}>
        <Text style={{
          paddingHorizontal: 25,
          paddingVertical: 5,
          color: theme.iconOnG,
          marginBottom: 10,
          fontWeight: "bold",
          fontSize: 16,
        }}>Read more</Text>
      </TouchableOpacity>
      <View className="py-3 rounded-3xl mx-2 mb-2"
            style={{ backgroundColor: theme.iconOnG }}>
        <Text className="font-xl text-center text-white px-2 font-bold">useful for {item.usefulnessCount} user(s)</Text>
      </View>
      <View className="py-3 rounded-3xl mx-2"
            style={{ backgroundColor: theme.iconOff }}>
        <Text className="font-l text-center text-white px-2 font-bold">useless
          for {item.uselessnessCount} user(s)</Text>
      </View>
    </View>
  );
}
