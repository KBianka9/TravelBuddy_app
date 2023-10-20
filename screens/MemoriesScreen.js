import React from "react";
import { TouchableOpacity, View, ScrollView, Text, TextInput } from "react-native";
import { ArrowLeftIcon, PlusIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { SliderBox } from "react-native-image-slider-box";

export default function MemoriesScreen() {
  const navigation = useNavigation();

  const memoriesPic = [
    require("../src/assets/indonesia-cover-1.jpg"),
    require("../src/assets/indonesia-cover-3.jpg"),
    require("../src/assets/bucket_list.jpg"),
  ];

  /*TODO:kép feltöltés*/
  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center mr-2 mt-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          style={{ backgroundColor: theme.button, zIndex: 1 }}>
          <ArrowLeftIcon size="20" color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: -50 }}>
        <SliderBox images={memoriesPic}
                   dotStyle={{ marginBottom: 20, height: 15, width: 15, borderRadius: 50 }}
                   sliderBoxHeight={360}
                   dotColor={theme.iconOnG}
                   imageLoadingColor={theme.iconOnG}
                   autoplay={true}
                   autoplayInterval={5000}
                   loop={true}
        />
      </View>
      <ScrollView className="flex-col flex-1 bg-white px-8 pt-6"
                  style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: -15 }}>
        {/*Review box*/}
        <Text style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 26, textAlign: "center", marginBottom: 10 }}>My
          memories</Text>
        <View className="p-1 bg-gray-200 mb-8" style={{ height: 200, borderRadius: 25 }}>
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
                        style={{ backgroundColor: theme.button, borderRadius: 20, padding: 20, marginLeft: 15 }} />
              <Text style={{ marginLeft: 65, marginTop: -30 }}>Add a picture (optional)</Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 38 }}>
          <TouchableOpacity className="py-3 rounded-xl"
                            style={{ backgroundColor: theme.button }}
                            onPress={() => {
                            }}>
            <Text className="font-xl font-bold text-center text-white">Save memories</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
