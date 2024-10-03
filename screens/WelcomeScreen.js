import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex justify-around my-8">
        <Text className="text-white font-bold text-4xl text-center ">
          Are you ready to plan your trip?
        </Text>
        <View className="flex-1 justify-center">
          <Image source={require("../src/assets/view-travel-adventure-essentials.jpg")}
                 style={{ width: 400, height: 770, zIndex: -1 }} />
        </View>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            className="py-3 mx-7 rounded-xl"
            style={{ backgroundColor: theme.button }}>
            <Text className="text-xl font-bold text-center text-white">Sign up</Text>
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text className="text-white font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-semibold text-gray-400"> Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
