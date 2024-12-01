import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { theme } from "../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Carousel from "react-native-snap-carousel";
import { hotelItems } from "../constants";
import HotelCard from "../components/hotelCard";
import { ArrowUpIcon } from "react-native-heroicons/solid";
import * as Animatable from "react-native-animatable";
import SearchableDropDown from "react-native-searchable-dropdown";
import { listWithFav, search } from "../contollers/accommodationContoller";
import Toast from "react-native-toast-message";
import { UserContext } from "../App";

const prices = [
  {
    label: "€100-150/night",
    value: {
      min: 100,
      max: 150,
    },
  },
  {
    label: "€151-200/night",
    value: {
      min: 151,
      max: 200,
    },
  },
  {
    label: "€201-250/night",
    value: {
      min: 201,
      max: 250,
    },
  },
  {
    label: "€251-300/night",
    value: {
      min: 251,
      max: 300,
    },
  },
];

export default function PlaceSearcherScreen() {
  const [cityCountryName, setCityCountryName] = useState(null);
  const [cityCountryNameList, setCityCountryNameList] = useState(null);
  const [nightPrice, setNightPrice] = useState(null);
  const [accommodations, setAccommodations] = useState([]);
  const { user } = useContext(UserContext);
  const [appKey, setAppKey] = useState(0);

  const reloadApp = () => {
    setAppKey(prev => prev + 1);
  };

  useEffect(() => {
    setCityCountryNameList(getDropDownCityCountryNames());
    loadAccommodations();
    reloadApp();
  }, []);

  const loadAccommodations = async () => {
    try {
      const response = await listWithFav(user.userId);
      setAccommodations(response.data);
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
    if (cityCountryName === null || nightPrice === null) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Destination or price is missing!",
        visibilityTime: 5000,
      });
    }
    try {
      const response = await search(cityCountryName.name, nightPrice);
      const accommodationList = response.data;

      if (accommodationList.length === 0) {
        Toast.show({
          type: "error",
          text1: "Sorry",
          text2: "But we couldn't find accommodation in this city based on the selected price!",
          visibilityTime: 5000,
        });
      } else {
        setAccommodations(accommodationList);
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
  /*TODO: ne a hotelItems, hanem az accommodation adatbázisból jöjjön*/
  const getDropDownCityCountryNames = () => {
    const values = [...new Set(hotelItems.map(hotel => hotel.cityCountryName))].map((cityCountryName, index) => ({
      id: index,
      name: cityCountryName,
    }));
    console.log(values);
    return values;
  };

  return (
    <ScrollView className="flex-1" keyboardShouldPersistTaps={"handled"} key={appKey}>
      <SafeAreaView>
        <Image source={require("../src/assets/walkway-tropical-jungle.jpg")}
               style={{ height: 610, width: 400 }} />
        <Text style={{
          marginTop: -370,
          textAlign: "center",
          fontSize: 40,
          color: "white",
        }}>Welcome!</Text>
        <Text style={{ fontSize: 15, color: "white", paddingLeft: 50, paddingRight: 15 }}>"Do not follow where the
          path may lead, go instead where there is no path and leave a trail."</Text>
        <Animatable.View animation="slideInDown" iterationCount={"infinite"} direction="alternate">
          <ArrowUpIcon size={20} color={theme.iconOn} style={{
            padding: 20,
            backgroundColor: theme.iconOnG,
            borderRadius: 50,
            position: "relative",
            marginTop: 210,
            marginLeft: 180,
          }} />
        </Animatable.View>
      </SafeAreaView>
      <View className="bg-white" style={{ borderTopRightRadius: 25, borderTopLeftRadius: 25, marginTop: 5 }}>
        <View className="flex-1 px-8 pt-5">
          {/*Destination searcher*/}
          <View className="flex-row justify-center items-center mb-4">
            <SearchableDropDown
              onItemSelect={(item) => {
                setCityCountryName(item);
              }}
              containerStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: "#e3e5e9",
                borderRadius: 30,
                width: 320,
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
                  value: cityCountryName ? cityCountryName.name : "Search your destination",
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
            />
          </View>
          <View className="flex-row ml-1">
            {/*Price selector*/}
            <SelectDropdown
              dropdownStyle={{
                justifyContent: "center",
                borderRadius: 30,
                backgroundColor: theme.searchInput,
                width: 250,
              }}
              selectedRowStyle={{ justifyContent: "center", backgroundColor: "white" }}
              buttonStyle={{
                justifyContent: "center",
                borderRadius: 30,
                backgroundColor: theme.searchInput,
                width: 250,
              }}
              defaultButtonText={"€price/night"}
              buttonTextStyle={{ fontSize: 15, fontWeight: "700", color: theme.text }}
              data={prices}
              onSelect={(selectedItem, index) => {
                setNightPrice(selectedItem.value);
              }}
              buttonTextAfterSelection={(selectedItem, index) => selectedItem.label}
              rowTextForSelection={(item, index) => item.label}
            />
            <View style={{ end: -15 }}>
              <TouchableOpacity className="rounded-full p-3 mr-2"
                                style={{ backgroundColor: theme.button }}
                                onPress={handleSubmit}
              >
                <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"></MagnifyingGlassIcon>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text className="text-black text-3xl my-3 ml-4">Recommendations</Text>
        {/*Recommendation cards*/}
        <View className="mt-2 mb-12 py-2">
          <Carousel containerCustomStyle={{ overflow: "visible", borderRadius: 50 }}
                    data={accommodations}
                    loop={true}
                    renderItem={({ item }) => <HotelCard item={item} />}
                    firstItem={1}
                    inactiveSlideOpacity={0.75}
                    inactiveSlideScale={0.77}
                    sliderWidth={370}
                    itemWidth={240}
                    slideStyle={{ display: "flex", alignItems: "center" }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
