import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text, TextInput } from "react-native";
import { ArrowLeftIcon, CameraIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import ImagePicker from "react-native-image-crop-picker";
import Carousel from "react-native-snap-carousel";
import SearchableDropDown from "react-native-searchable-dropdown";
import { hotelItems, reviewItems } from "../constants";
import Toast from "react-native-toast-message";
import { search } from "../contollers/accommodationContoller";
import { addReview } from "../contollers/reviewController";

export default function NewReviewScreen() {
  const navigation = useNavigation();
  const [reviewImages, setReviewImages] = useState([]);
  const [cityCountryName, setCityCountryName] = useState(null);
  const [cityCountryNameList, setCityCountryNameList] = useState(null);

  useEffect(() => {
    setCityCountryNameList(getDropDownCityCountryNames());
  }, []);
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
      setReviewImages(imageList);
    }).catch(error => console.log("Error: ", error.message));
  };
  /*TODO: megosztás fgv*/
  const shareReview = async () => {
    if (cityCountryName === null || revText === null) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "City or text is missing!",
        visibilityTime: 5000,
      });
    }
    try {
      console.log(cityCountryName.name, revText);
      await addReview(cityCountryName.name, revText);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your review has been successfully shared!",
        visibilityTime: 5000,
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };
  /*TODO: ne a reviewItems, hanem az review adatbázisból jöjjön --- keresés után a szem ikon nem nyitja meg a hotelt*/
  const getDropDownCityCountryNames = () => {
    const values = [...new Set(reviewItems.map(review => review.cityCountry))].map((cityCountryName, index) => ({
      id: index,
      name: cityCountryName,
    }));
    console.log(values);
    return values;
  };

  return (
    <View className="flex-1">
      <SafeAreaView className="flex-row justify-between items-center mr-2 mt-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          style={{ backgroundColor: theme.button }}>
          <ArrowLeftIcon size="25" color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={{ marginBottom: 310, marginTop: -60, zIndex: -1 }}>
        <Image source={require("../src/assets/top-view-hands-holding-photos.jpg")}
               style={{ height: 310 }}
               className="w-full absolute" />
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
          {/*TODO: kereső, listázza ki a városokat és a kereső ikonra kattintva keressen*/}
          <View className="flex-row justify-center items-center my-2">
            <SearchableDropDown
              onItemSelect={(item) => {
                setCityCountryName(item);
              }}
              containerStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: "#e3e5e9",
                borderRadius: 30,
                width: 335,
              }}
              itemStyle={{
                padding: 10,
                marginTop: 10,
                backgroundColor: "#f8f9fa",
                borderRadius: 30,
              }}
              itemTextStyle={{ color: "#222" }}
              itemsContainerStyle={{ maxHeight: 150 }}
              items={cityCountryNameList}
              resetValue={false}
              textInputProps={
                {
                  underlineColorAndroid: "transparent",
                  value: cityCountryName ? cityCountryName.name : "Enter the city",
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
            />
          </View>
          {/*Review box*/}
          <View className="p-1 bg-gray-200 mx-6 mb-6 mt-2" style={{ height: 200, borderRadius: 25 }}>
            <TextInput placeholder="Write your expression about 1024 characters" multiline={true} numberoflines={10}
                       className="p-4 flex-1 font-semibold text-gray-700"
            />
          </View>
          <Text style={{ marginLeft: 15, fontStyle: "italic", fontSize: 18, marginBottom: 20 }}>Uploaded photos:</Text>
          <View>
            {reviewImages?.length > 0 ? (
              <Carousel
                data={reviewImages}
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
                              onPress={shareReview}>
              <Text className="font-xl font-bold text-center text-white">Share</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
