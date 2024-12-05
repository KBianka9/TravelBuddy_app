import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../theme";
import { StarIcon, MapPinIcon, EyeIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";


export default function HotelCard({ item }) {
  const navigation = useNavigation();

  return (
    <View style={{ borderRadius: 50, backgroundColor: theme.background, height: 400, width: 250, marginBottom: 20 }}>
      <View style={{
        shadowColor: "black",
        shadowOffset: { width: 0, height: 40 },
        shadowOpacity: 0.8,
        position: "relative",
        alignItems: "center",
      }}
            className="flex-row justify-center">
        <Image source={{ uri: `http://10.0.2.2:3000/accommodationImg/${item.accommodationId}.jpg` }}
               style={{ height: 220, width: 220, borderRadius: 40, marginTop: 10 }} />
      </View>
      <View className="px-3 space-y-3">
        <View style={{ flexDirection: "row" }}>
          <MapPinIcon style={{ marginTop: 10, marginLeft: 10 }} size="25" color="black" />
          <Text style={{ fontSize: 18, marginTop: 12, color: "black" }}>
            {item.cityCountryName}
          </Text>
        </View>
        <Text style={{ fontSize: 18, marginTop: 5, marginHorizontal: 25, color: "black", fontWeight: "bold" }}
              numberOfLines={1}>
          {item.name}
        </Text>
        <View style={{
          backgroundColor: theme.button, flexDirection: "row", alignItems: "center", borderRadius: 20,
          marginTop: 10, marginLeft: 20, width: 50, padding: 5,
        }}>
          <StarIcon style={{ alignItems: "center", padding: 8, marginLeft: 2 }} size="15" color="white" />
          <Text style={{ color: "white", fontWeight: "bold", marginLeft: 6 }}>{item.star}</Text>
        </View>
        <View style={{ marginLeft: 20, flexDirection: "row" }}>
          <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>{item.nightPrice} €/night</Text>
          <View>
            <TouchableOpacity style={{ shadowOpacity: 1, end: -40 }}
                              onPress={() => navigation.navigate("Hotel", { ...item })}>
              <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                               style={{ marginTop: -30, backgroundColor: theme.button, borderRadius: 25, padding: 10 }}
              >
                <EyeIcon size={30} strokeWidth={1} color={theme.iconOn} />
              </Animatable.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
