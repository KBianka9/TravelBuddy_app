import { View, Text, Image } from "react-native";
import React from "react";

/*TODO:Tobbi listanal is beallitani*/
export default function EmptyList({ message }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginVertical: 15 }}>
      <Image source={require("../src/assets/oops.png")}
             style={{ width: 250, height: 250 }} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{message || "data not found"}</Text>
    </View>
  );
}
