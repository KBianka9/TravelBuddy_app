import React, { useContext, useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text, TextInput } from "react-native";
import { ArrowLeftIcon, CameraIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import ImagePicker from "react-native-image-crop-picker";
import SearchableDropDown from "react-native-searchable-dropdown";
import { reviewItems } from "../constants";
import Toast from "react-native-toast-message";
import { addReview } from "../contollers/reviewController";
import { UserContext } from "../App";

export default function NewReviewScreen() {
  const navigation = useNavigation();
  const [reviewImage, setReviewImage] = useState("");
  const [cityCountry, setCityCountry] = useState(null);
  const [revText, setRevText] = useState("");
  const [cityCountryList, setCityCountryList] = useState(null);
  const { user } = useContext(UserContext);
  const [appKey, setAppKey] = useState(0);

  const reloadApp = () => {
    setAppKey(prev => prev + 1);
  };

  useEffect(() => {
    setCityCountryList(getDropDownCityCountryNames());
    reloadApp();
  }, []);

  const openGallery = async () => {
    try {
      await ImagePicker.openPicker({
        cropping: true,
      }).then(image => {
        setReviewImage(image);
        Toast.show({
          type: "success",
          text1: "Uploaded photo!",
          visibilityTime: 5000,
        });
      });
    } catch (error) {
      console.log(error, "error");
    }
  };

  const shareReview = async () => {
    if (cityCountry === null || revText === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "City or text is missing!",
        visibilityTime: 5000,
      });
    }
    try {
      await addReview(user.userId, cityCountry.name, revText, reviewImage);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your review has been successfully shared!",
        visibilityTime: 5000,
      });
      navigation.goBack();
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };
  const getDropDownCityCountryNames = () => {
    const values = [...new Set(reviewItems.map(review => review.cityCountry))].map((cityCountry, index) => ({
      id: index,
      name: cityCountry,
    }));
    console.log(values);
    return values;
  };

  return (
    <View className="flex-1" key={appKey} keyboardShouldPersistTaps={"handled"}>
      <SafeAreaView className="flex-row justify-between items-center mr-2 mt-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          style={{ backgroundColor: theme.button }}>
          <ArrowLeftIcon size="25" color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={{ marginBottom: 310, marginTop: -60, zIndex: -1 }}>
        <Image source={!reviewImage ? (require("../src/assets/reviewCoverImg.jpg")) : { uri: reviewImage?.path }}
               style={{ height: 300 }}
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
        <View className="flex-row justify-center items-center my-2">
          <SearchableDropDown
            onItemSelect={(item) => {
              setCityCountry(item);
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
            items={cityCountryList}
            resetValue={false}
            textInputProps={
              {
                underlineColorAndroid: "transparent",
                value: cityCountry ? cityCountry.name : "Enter the city",
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
        <View className="p-1 bg-gray-200 mx-6 mb-2 mt-3" style={{ height: 250, borderRadius: 25 }}>
          <TextInput placeholder="Write your expression about 1024 characters" multiline={true} numberoflines={10}
                     className="p-4 flex-1 font-semibold text-gray-700"
                     onChangeText={setRevText}
          />
        </View>
        <View style={{ marginVertical: 20, marginHorizontal: 50 }}>
          <TouchableOpacity className="py-3 rounded-xl"
                            style={{ backgroundColor: theme.button }}
                            onPress={shareReview}>
            <Text className="font-xl font-bold text-center text-white">Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
