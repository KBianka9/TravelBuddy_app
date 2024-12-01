import { View, Image } from "react-native";
import React from "react";

export default function EmptyList() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginVertical: 15 }}>
      <Image source={require("../src/assets/oops.jpg")}
             style={{ width: 250, height: 250 }} />
    </View>
  );
}
