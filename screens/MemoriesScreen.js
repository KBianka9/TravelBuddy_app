import React, { useState } from "react";
import { TouchableOpacity, View, ScrollView, Text, TextInput, Image } from "react-native";
import { ArrowLeftIcon, CameraIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { SliderBox } from "react-native-image-slider-box";
import ImagePicker from "react-native-image-crop-picker";
import Carousel from "react-native-snap-carousel";

export default function MemoriesScreen() {
  const navigation = useNavigation();
  const [memoryImages, setMemoryImages] = useState([]);
  const memoriesPic = [
    require("../src/assets/indonesia-cover-1.jpg"),
    require("../src/assets/indonesia-cover-3.jpg"),
    require("../src/assets/bucket_list.jpg"),
  ];
  const _renderItem = ({ item, index }) => {
    return (
      <View key={index}>
        <Image
          source={{ uri: item.path }}
          style={{
            width: 240,
            height: 150,
            borderRadius: 20,
          }}
        />
      </View>
    );
  };

  const openGallery = async () => {
    let imageList = [];
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 10,
      mediaType: "any",
      includeBase64: true,
    }).then(response => {
      console.log("Response: ", response);
      response.map(image => {
        imageList.push({
          filename: image.filename,
          path: image.path,
          data: image.data,
        });
      });
      setMemoryImages(imageList);
    }).catch(error => console.log("Error: ", error.message));
  };

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center mr-2 mt-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          style={{ backgroundColor: theme.button, zIndex: 1 }}>
          <ArrowLeftIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: -55 }}>
        <SliderBox images={memoriesPic}
                   dotStyle={{ marginBottom: 20, height: 10, width: 10, borderRadius: 50 }}
                   sliderBoxHeight={360}
                   dotColor={theme.iconOnG}
                   imageLoadingColor={theme.iconOnG}
                   autoplay={true}
                   autoplayInterval={5000}
                   loop={true}
        />
      </View>
      <View className="flex-col flex-1 bg-white"
            style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: -15 }}>
        <View className="flex-row px-8 pt-6">
          <TouchableOpacity style={{ shadowOpacity: 1 }}
                            onPress={openGallery}
          >
            <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                             style={{
                               marginTop: -60,
                               backgroundColor: theme.button,
                               borderRadius: 50,
                               padding: 10,
                               start: 260,
                             }}
            >
              <CameraIcon size={40} strokeWidth={1} color={theme.iconOn} />
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text
            style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 26, textAlign: "center" }}>My
            memories</Text>
          {/*Review box*/}
          <View className="p-1 bg-gray-200 m-6" style={{ height: 200, borderRadius: 25 }}>
            <TextInput placeholder="Write your expression about 250-300 word" multiline={true} numberoflines={10}
                       className="p-4 flex-1 font-semibold text-gray-700"
            />
          </View>
          <Text style={{ marginLeft: 15, fontStyle: "italic", fontSize: 18, marginBottom: 20 }}>Uploaded photos:</Text>
          <View>
            {memoryImages?.length > 0 ? (
              <Carousel
                data={memoryImages}
                renderItem={_renderItem}
                onSnapToItem={(index) => console.log(index)}
                slideStyle={{ display: "flex", alignItems: "center" }}
                inactiveSlideOpacity={0.75}
                inactiveSlideScale={0.77}
                containerCustomStyle={{ overflow: "visible", borderRadius: 50 }}
                loop={true}
                sliderWidth={380}
                itemWidth={240}
              />
            ) : (
              <Text style={{ color: theme.decrementButton, fontSize: 15, marginLeft: 65, fontWeight: "bold" }}>You
                didn't select pictures! Try it again!</Text>
            )}
          </View>
          <View style={{ marginVertical: 20, marginHorizontal: 50 }}>
            <TouchableOpacity className="py-3 rounded-xl"
                              style={{ backgroundColor: theme.button }}
                              onPress={() => {
                              }}>
              <Text className="font-xl font-bold text-center text-white">Save memories</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
