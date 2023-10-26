import React from "react";
import { Image, TouchableOpacity, View, ScrollView, Text, TextInput } from "react-native";
import { ArrowLeftIcon, CameraIcon } from "react-native-heroicons/solid";
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
          <ArrowLeftIcon size="25" color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <View className="flex-col flex-1 bg-white px-8 pt-6"
            style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 215 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ shadowOpacity: 1 }}>
            <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                             style={{
                               marginTop: -60,
                               backgroundColor: theme.button,
                               borderRadius: 50,
                               padding: 10,
                               start: 250,
                             }}
            >
              <CameraIcon size={40} strokeWidth={1} color={theme.iconOn} />
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View className="rounded-full p-1 bg-gray-200 mb-2 mt-4">
            <TextInput placeholder="city name" className="p-4 flex-1 font-semibold text-gray-700" />
          </View>
          {/*Review box*/}
          <View className="p-1 bg-gray-200 mt-4 mb-8" style={{ height: 200, borderRadius: 25 }}>
            <TextInput placeholder="Write your expression about 250-300 word" multiline={true} numberoflines={10}
                       className="p-4 flex-1 font-semibold text-gray-700"
            />
          </View>
          <Text style={{ marginLeft: 15, fontStyle: "italic", fontSize: 15 }}>Uploaded photos:</Text>
          <View style={{ marginVertical: 30, flexDirection: "row" }}>
            <Image source={require("../src/assets/hawaii.jpg")} style={{ width: 280, height: 150, borderRadius: 25 }} />
            <TouchableOpacity>
              <Image source={require("../src/assets/bin.png")}
                     style={{ height: 20, width: 20, marginTop: 70, marginLeft: 20 }} />
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 20 }}>
            <TouchableOpacity className="py-3 rounded-xl"
                              style={{ backgroundColor: theme.button }}
                              onPress={() => {
                              }}>
              <Text className="font-xl font-bold text-center text-white">Share</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
