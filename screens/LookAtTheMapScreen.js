import React from "react";
import { View, TouchableOpacity, TextInput, ImageBackground } from "react-native";
import { theme } from "../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LookAtTheMapScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ImageBackground source={require("../src/assets/Bp_map.png")} style={{ flex: 1, height: 760 }} />
      <View style={{ flexDirection: "row", padding: 10, marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-3 rounded-tr-2xl rounded-bl-2xl ml-2 mr-4 mt-1 mb-6"
          style={{ backgroundColor: theme.button }}>
          <ArrowLeftIcon size="20" strokeWidth={2} color="white" />
        </TouchableOpacity>
        <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 mb-4">
          <TextInput placeholder="Search your destination"
                     className="p-3 flex-1 font-semibold text-gray-700 mr-52" />
          <TouchableOpacity className="rounded-full p-2 mr-8"
                            style={{ backgroundColor: theme.background }}>
            <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"></MagnifyingGlassIcon>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
