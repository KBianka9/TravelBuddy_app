import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../theme";
import { MapPinIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";


export default function ReviewCard({ item }) {
  const navigation = useNavigation();

  return (
    <View style={{ borderRadius: 50, backgroundColor: "white", margin: 20, padding: 15, height: 490 }}>
      <View style={{ flexDirection: "row" }}>
        <Image source={require("../src/assets/profile.png")}
               style={{ width: 90, height: 90, marginLeft: 10 }} />
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
      <Text style={{ paddingHorizontal: 15, paddingVertical: 5 }} numberOfLines={9}>{item.text}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Review", { ...item })}>
        <Text style={{ paddingHorizontal: 25, paddingVertical: 5, color: theme.iconOnG, marginBottom: 10 }}>Read
          more</Text>
      </TouchableOpacity>
      <View className="py-3 rounded-3xl mx-2 mb-2"
            style={{ backgroundColor: theme.iconOnG }}>
        <Text className="font-xl text-center text-white px-2">useful for {item.usefulSum}</Text>
      </View>
      <View className="py-3 rounded-3xl mx-2"
            style={{ backgroundColor: theme.iconOff }}>
        <Text className="font-l text-center text-white px-2">useless for {item.uselessSum}</Text>
      </View>
    </View>
  );
}
