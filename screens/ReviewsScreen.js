import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import ReviewCard from "../components/reviewCard";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import Carousel from "react-native-snap-carousel";
import { reviewItems } from "../constants";
import { PlusIcon } from "react-native-heroicons/solid";
import SearchableDropDown from "react-native-searchable-dropdown";
import { list, search } from "../contollers/reviewController";
import Toast from "react-native-toast-message";
import ReportedReviewCard from "../components/reportedReviewCard";

export default function ReviewsScreen() {
  const navigation = useNavigation();
  const [cityCountryName, setCityCountryName] = useState(null);
  const [cityCountryNameList, setCityCountryNameList] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [appKey, setAppKey] = useState(0);

  const reloadApp = () => {
    setAppKey(prev => prev + 1);
  };

  useEffect(() => {
    setCityCountryNameList(getDropDownCityCountryNames());
    loadReviews();
    reloadApp();
  }, []);
  const loadReviews = async () => {
    try {
      const response = await list();
      setReviews(response.data);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };

  const handleSubmit = async () => {
    if (cityCountryName === null) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Destination is missing!",
        visibilityTime: 5000,
      });
    }
    try {
      console.log(cityCountryName.cityCountryName);
      const response = await search(cityCountryName.name);
      const reviewList = response.data;
      console.log(reviewList);
      if (reviewList.length === 0) {
        Toast.show({
          type: "error",
          text1: "Sorry",
          text2: "But we couldn't find review for the specified city!",
          visibilityTime: 5000,
        });
      } else {
        setReviews(reviewList);
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };
  /*TODO: ne a reviewItemsből jöjjön*/
  const getDropDownCityCountryNames = () => {
    const values = [...new Set(reviewItems.map(review => review.cityCountry))].map((cityCountryName, index) => ({
      id: index,
      name: cityCountryName,
    }));
    console.log(values);
    return values;
  };

  return (
    <ImageBackground source={require("../src/assets/OBSKLD0.jpg")} resizeMode="cover"
                     style={{ flex: 1, justifyContent: "center" }} key={appKey}>
      <View className="flex-1" keyboardShouldPersistTaps={"handled"}>
        <SafeAreaView>
          <View className="flex-row justify-center items-center mt-6 mx-4">
            <SearchableDropDown
              onItemSelect={(item) => {
                setCityCountryName(item);
              }}
              containerStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: "#e3e5e9",
                borderRadius: 30,
                width: 290,
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
                  value: cityCountryName ? cityCountryName.name : "Search a city",
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
            />
            <TouchableOpacity className="rounded-full p-3 mr-2"
                              style={{ backgroundColor: theme.button, end: -15 }}
                              onPress={handleSubmit}
            >
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"></MagnifyingGlassIcon>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        {/*Review cards*/}
        <View className="py-2">
          <Carousel containerCustomStyle={{ overflow: "visible", borderRadius: 50 }}
                    data={reviews}
                    loop={true}
                    renderItem={({ item }) => {
                      if (item.report === false) {
                        return <ReviewCard item={item} />;
                      } else {
                        return <ReportedReviewCard item={item} />;
                      }
                    }}
                    firstItem={1}
                    inactiveSlideOpacity={0.75}
                    inactiveSlideScale={0.55}
                    sliderWidth={380}
                    itemWidth={240}
                    slideStyle={{ display: "flex", alignItems: "center" }}
          />
        </View>
        <View style={{ position: "absolute", bottom: 85, right: 16 }}>
          <TouchableOpacity style={{ shadowOpacity: 1 }}
                            onPress={() => navigation.navigate("NewReview")}
          >
            <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                             style={{
                               backgroundColor: theme.button,
                               borderRadius: 50,
                               padding: 10,
                             }}
            >
              <PlusIcon size={40} strokeWidth={1} color={theme.iconOn} />
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
