import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon, MinusIcon, PlusIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import * as Animatable from "react-native-animatable";
import openMap from "react-native-open-maps";
import CalendarPicker from "react-native-calendar-picker";
import { destinations } from "../constants";
import Toast from "react-native-toast-message";
import { listWithFav } from "../contollers/accommodationContoller";
import { listDestination } from "../contollers/destinationController";
import { addTrip } from "../contollers/tripController";
import { UserContext } from "../App";

export default function AddTripScreen() {
  const navigation = useNavigation();
  const [accommodations, setAccommodations] = useState([]);
  const [destinationList, setDestinationList] = useState([{}]);
  const [appKey, setAppKey] = useState(0);

  const [tripName, setTripName] = useState("");
  const [accommodation, setAccommodation] = useState(null);
  const [date, setDate] = useState({ from: null, to: null });
  const [days, setDays] = useState([[]]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const { user } = useContext(UserContext);

  const reloadApp = () => {
    setAppKey(prev => prev + 1);
  };

  useEffect(() => {
    loadAccommodations();
    loadDestinations();
    reloadApp();
  }, []);

  const loadAccommodations = async () => {
    try {
      const response = await listWithFav();
      setAccommodations(response.data.map(acc => ({
          id: acc.accommodationId,
          name: acc.name,
          longitude: acc.longitude,
          latitude: acc.latitude,
        }),
      ));
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };

  const loadDestinations = async () => {
    try {
      const response = await listDestination();
      setDestinationList(response.data);
      console.log(destinationList);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };

  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24)) + 1;
  }

  const onDateChange = (selectedDate, selectType) => {
    if (selectType === "START_DATE") {
      date.from = selectedDate;
    } else {
      date.to = selectedDate;
      const numberOfDays = datediff(date.from, date.to);
      if (numberOfDays > 0) {
        setDays(Array.from({ length: numberOfDays }, () => [{}]));
      }
    }
    setDate({ ...date });
  };

  const saveTrip = async () => {
    if (tripName === "" || accommodation === null || date.from === null || date.to === null || days.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "One or more data is missing!",
        visibilityTime: 5000,
      });
    }
    try {
      await addTrip(user.userId, tripName, date.from, date.to, accommodation.id, days);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your trip has been successfully saved!",
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

  const handleDestinationAdd = () => {
    days[selectedDayIndex].push({});
    setDays(JSON.parse(JSON.stringify(days)));
  };

  const handleDestinationRemove = (index) => {
    days[selectedDayIndex].splice(index, 1);
    setDays(JSON.parse(JSON.stringify(days)));
  };

  const handleDestinationChange = (selectedDestination, destinationIndex) => {
    days[selectedDayIndex][destinationIndex] = selectedDestination;
    setDays(JSON.parse(JSON.stringify(days)));
    console.log(selectedDestination);
  };

  function hotelNavigation() {
    const mapOptions = {};
    if (days[selectedDayIndex].length !== 0) {
      const destinations = days[selectedDayIndex];
      mapOptions.start = accommodation.latitude + ", " + accommodation.longitude;
      mapOptions.end = destinations[destinations.length - 1].latitude + ", " + destinations[destinations.length - 1].longitude;
      mapOptions.waypoints = destinations.slice(0, -1).map(destination => destination.latitude + ", " + destination.longitude);
      mapOptions.navigate = true;
      mapOptions.mapType = "transit";
      mapOptions.travelType = "drive";
    } else {
      mapOptions.latitude = accommodation.latitude;
      mapOptions.longitude = accommodation.longitude;
    }
    openMap(mapOptions);
  }

  return (
    <View className="flex-1 bg-white" key={appKey}>
      <Image
        source={require("../src/assets/flat-lay-hands-holding-photos.jpg")}
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
      <ScrollView className="flex-col flex-1 bg-white px-4 pt-6"
                  style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 215 }}>
        <View className="flex-row rounded-full p-1 bg-gray-200 mb-4">
          <TextInput placeholder="Add a name of your trip"
                     className="p-4 flex-1 font-semibold text-gray-700"
                     value={tripName}
                     onChangeText={setTripName}
          />
        </View>

        <View className="flex-row rounded-full p-1 bg-gray-200 mb-4">
          <SelectDropdown
            dropdownStyle={{ borderRadius: 30, backgroundColor: theme.searchInput, width: 350 }}
            selectedRowStyle={{ backgroundColor: "white" }}
            buttonStyle={{ borderRadius: 30, backgroundColor: theme.searchInput, width: "100%" }}
            defaultButtonText={"Accommodation"}
            data={accommodations}
            onSelect={setAccommodation}
            buttonTextAfterSelection={(selectedItem) => selectedItem.name}
            rowTextForSelection={(item) => item.name}
          />
        </View>
        <View className="p-4">
          <Text className="font-bold text-2xl" style={{ color: theme.text }}>Select date</Text>
        </View>
        <View style={{ backgroundColor: theme.background, borderRadius: 20 }}>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            width={350}
            minDate={Date.now()}
            todayBackgroundColor={theme.iconOff}
            todayTextColor={theme.iconOn}
            selectedDayColor={theme.selectedDate}
            selectedDayTextColor={theme.iconOn}
            onDateChange={onDateChange}
          />
        </View>
        <View>
          <Text className="font-bold text-2xl"
                style={{ fontSize: 24, color: theme.text, marginTop: 15, textAlign: "center" }}>What would you like to
            visit on </Text>
        </View>
        {/*Day selector*/}
        <View style={{ flexDirection: "row", marginLeft: 80, marginVertical: 20 }}>
          <SelectDropdown
            dropdownStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
            selectedRowStyle={{ backgroundColor: "white" }}
            buttonStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
            dropdownIconPosition="right"
            defaultButtonText={"1. day"}
            data={days.map((_, index) => index)}
            onSelect={setSelectedDayIndex}
            buttonTextAfterSelection={(selectedItem) => (selectedItem + 1) + ". day"}
            rowTextForSelection={(item) => (item + 1) + ". day"}
          />
          <Text className="font-bold text-2xl" style={{ fontSize: 24, color: theme.text, marginTop: 10 }}> ?</Text>
        </View>
        {days[selectedDayIndex].map((destination, index) => (
          <View key={index + destination?.name}>
            <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 ml-4 mr-20 mt-4">
              <SelectDropdown
                dropdownStyle={{ borderRadius: 30, backgroundColor: theme.searchInput, width: 270, marginLeft: -20 }}
                selectedRowStyle={{ backgroundColor: "white" }}
                buttonStyle={{ backgroundColor: theme.searchInput }}
                data={destinationList}
                defaultValue={destination}
                onSelect={(e) => handleDestinationChange(e, index)}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem.name}
                rowTextForSelection={(item, index) => item.name}
                defaultButtonText={destination?.name ?? "Destination"}
                className="flex-1 font-semibold text-gray-700" />
              {days[selectedDayIndex].length > 1 &&
                (<TouchableOpacity style={{ shadowOpacity: 1, end: -60 }}
                                   onPress={() => handleDestinationRemove(index)}>
                    <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"}
                                     duration={1000}
                                     style={{ borderWidth: 0 }}>
                      <MinusIcon size="5" strokeWidth={2} color={theme.iconOn}
                                 style={{ backgroundColor: theme.decrementButton, borderRadius: 20, padding: 18 }} />
                    </Animatable.View>
                  </TouchableOpacity>
                )}
            </View>
            {days[selectedDayIndex].length - 1 === index && days[selectedDayIndex].length < 10 &&
              (<TouchableOpacity style={{ shadowOpacity: 10 }} onPress={handleDestinationAdd}>
                  <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"}
                                   duration={1000}
                                   style={{ borderWidth: 0 }}>
                    <PlusIcon size="5" strokeWidth={2} color={theme.iconOn}
                              style={{
                                backgroundColor: theme.iconOnG,
                                borderRadius: 20,
                                padding: 20,
                                marginLeft: 297,
                                marginTop: 20,
                              }}
                    />
                  </Animatable.View>
                </TouchableOpacity>
              )}
          </View>
        ))}
        <View style={{ paddingLeft: 40, width: 150, marginVertical: 10 }}>
          <TouchableOpacity onPress={hotelNavigation}>
            <Text style={{
              backgroundColor: theme.button,
              color: "white",
              borderRadius: 50,
              padding: 10,
              fontWeight: "bold",
            }}>View on map</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity className="py-3 rounded-full mb-12 mx-4" style={{ backgroundColor: theme.button }}
                            onPress={saveTrip}>
            <Text className="font-xl font-bold text-center text-white">Save trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
