import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../theme";
import { StarIcon, MapPinIcon, PlusIcon } from "react-native-heroicons/solid";
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
        <Image source={item.image} style={{ height: 220, width: 220, borderRadius: 40, marginTop: 10 }} />
      </View>
      <View className="px-3 space-y-3">
        <View style={{ flexDirection: "row" }}>
          <MapPinIcon style={{ marginTop: 10, marginLeft: 10 }} size="25" color="black" />
          <Text style={{ fontSize: 18, marginTop: 12, color: "black" }}>
            {item.city}
          </Text>
        </View>
        <Text style={{ fontSize: 18, marginTop: 5, marginHorizontal: 25, color: "black", fontWeight: "bold" }}
              numberOfLines={1}>
          {item.name}
        </Text>
        <View style={{
          backgroundColor: theme.button, flexDirection: "row", alignItems: "center", borderRadius: 20,
          marginTop: 10, marginLeft: 20, width: 60, padding: 5,
        }}>
          <StarIcon style={{ alignItems: "center", padding: 8, marginLeft: 2 }} size="15" color="white" />
          <Text style={{ color: "white", fontWeight: "bold", marginLeft: 6 }}>{item.stars}</Text>
        </View>
        <View style={{ marginLeft: 20, flexDirection: "row" }}>
          <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>$ {item.price}</Text>
          <View>
            <TouchableOpacity style={{ shadowOpacity: 1, end: -50 }}
                              onPress={() => navigation.navigate("Hotel", { ...item })}>
              <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                               style={{ borderWidth: 0 }}>
                <PlusIcon size="5" strokeWidth={2} color={theme.iconOn}
                          style={{ backgroundColor: theme.button, borderRadius: 20, padding: 20, marginTop: -20 }} />
              </Animatable.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
