import React from "react";
import { View, TouchableOpacity, TextInput, Image } from "react-native";
import { theme } from "../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

export default function EditingOnTheMapScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1">
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-6 mt-8"
          style={{ backgroundColor: theme.button, marginRight: 330 }}>
          <ArrowLeftIcon size="20" color="white" />
        </TouchableOpacity>
        <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 mb-2 ml-20 mr-4"
              style={{ marginTop: -50 }}
        >
          <TextInput placeholder="Search a city" className="p-4 flex-1 font-semibold text-gray-700" />
          <TouchableOpacity className="rounded-full p-2 mr-2"
                            style={{ backgroundColor: theme.background }}>
            <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"></MagnifyingGlassIcon>
          </TouchableOpacity>
        </View>
      </View>
      <Image source={require("../src/assets/Bp_map.png")}
             style={{ zIndex: -1, marginTop: -160 }} />
    </View>
  );
}
