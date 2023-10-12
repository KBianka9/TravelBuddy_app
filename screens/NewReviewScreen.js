import React, { useEffect } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text, TextInput, Alert, Button } from "react-native";
import { ArrowLeftIcon, PlusIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";


export default function NewReviewScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
      <Image source={require("../src/assets/top-view-hands-holding-photos.jpg")}
             style={{ height: 310 }}
             className="w-full absolute"
      />
      <SafeAreaView className="flex-row justify-between items-center mr-2 mt-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          style={{ backgroundColor: theme.button }}>
          <ArrowLeftIcon size="20" color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView className="flex-col flex-1 bg-white px-8 pt-6"
                  style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 215 }}>
        <View className="rounded-full p-1 bg-gray-200 mb-2">
          <TextInput placeholder="city name" className="p-4 flex-1 font-semibold text-gray-700" />
        </View>
        {/*Review box*/}
        <View className="p-1 bg-gray-200 mt-4 mb-8" style={{ height: 200, borderRadius: 25 }}>
          <TextInput placeholder="Write your expression about 250-300 word" multiline={true} numberoflines={10}
                     className="p-4 flex-1 font-semibold text-gray-700"
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ shadowOpacity: 1 }}
                            onPress={() => {
                            }}>
            <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                             style={{ borderWidth: 0 }}>
              <PlusIcon size="5" strokeWidth={2} color={theme.iconOn}
                        style={{ backgroundColor: theme.button, borderRadius: 20, padding: 20, marginLeft: 10 }} />
              <Text style={{ marginLeft: 60, marginTop: -30 }}>Add a picture (optional)</Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 60 }}>
          <TouchableOpacity className="py-3 rounded-xl"
                            style={{ backgroundColor: theme.button }}
                            onPress={() => {
                            }}>
            <Text className="font-xl font-bold text-center text-white">Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
