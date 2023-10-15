import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { theme } from "../theme";

export default props => (
  <TouchableOpacity onPress={props.onPress} style={props.style}>
    <View
      style={{
        backgroundColor: theme.button,
        width: 55,
        height: 55,
        borderRadius: 45,
      }}
    />
    <Text
      style={{ position: "absolute", bottom: -10, right: 10, fontSize: 60, color: "white", fontWeight: "200" }}>+</Text>
  </TouchableOpacity>
);
