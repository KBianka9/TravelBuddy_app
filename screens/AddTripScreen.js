import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon, MinusIcon, PlusIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import * as Animatable from "react-native-animatable";
import openMap from "react-native-open-maps";
import CalendarPicker from "react-native-calendar-picker";
import { destinations, hotelItems } from "../constants";
import Toast from "react-native-toast-message";

export default function AddTripScreen() {
  const navigation = useNavigation();
  const [placeList, setPlaceList] = useState([{}]);
  const [date, setDate] = useState("");
  const [destinationList, setDestinationList] = useState([{}]);

  const day = ["1. day", "2. day", "3. day", "4. day"];

  const handleAddTrip = () => {
    if (placeList && date) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your trip has been saved!",
        visibilityTime: 5000,
      });
      navigation.navigate("RoutePlanner");
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Your trip has not been saved!",
        visibilityTime: 5000,
      });
    }
  };

  const handleDestinationAdd = () => {
    setDestinationList([...destinationList, {}]);
  };

  const handleDestinationRemove = (index) => {
    const list = [...destinationList];
    list.splice(index, 1);
    setDestinationList(list);
  };

  const handleDestinationChange = (e, index) => {
    const list = [...destinationList];
    list[index] = e;
    setDestinationList(list);
    console.log(index, e);
  };

  const handleHotel = (e, index) => {
    const list = [...placeList];
    list[index] = e;
    setPlaceList(list);
    console.log(index, e);
  };

  function hotelNavigation() {
    const mapOptions = {};
    console.log(destinationList);
    if (Object.keys(destinationList[0]).length !== 0) {
      mapOptions.start = placeList[placeList.length - 1].latitude + ", " + placeList[placeList.length - 1].longitude;
      mapOptions.end = destinationList[destinationList.length - 1].latitude + ", " + destinationList[destinationList.length - 1].longitude;
      mapOptions.waypoints = destinationList.slice(0, -1).map(destination => destination.latitude + ", " + destination.longitude);
      mapOptions.navigate = true;
      mapOptions.mapType = "transit";
      mapOptions.travelType = "drive";
    } else {
      mapOptions.latitude = placeList[placeList.length - 1].latitude;
      mapOptions.longitude = placeList[placeList.length - 1].longitude;
    }
    openMap(mapOptions);
  }

  return (
    <View className="flex-1 bg-white">
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
          <TextInput placeholder="Add a name of your trip" className="p-4 flex-1 font-semibold text-gray-700" />
        </View>
        {placeList.map((singleHotel, index) => (
          <View key={index}>
            <View className="flex-row rounded-full p-1 bg-gray-200 mb-4">
              <SelectDropdown
                dropdownStyle={{ borderRadius: 30, backgroundColor: theme.searchInput, width: 350 }}
                selectedRowStyle={{ backgroundColor: "white" }}
                buttonStyle={{ borderRadius: 30, backgroundColor: theme.searchInput, width: "100%" }}
                defaultButtonText={"Accommodation"}
                data={hotelItems}
                onSelect={(e) => handleHotel(e, index)}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem.name}
                rowTextForSelection={(item, index) => item.name}
              />
            </View>
          </View>
        ))}
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
            onDateChange={this.onDateChange}
          />
        </View>
        <View>
          <Text className="font-bold text-2xl"
                style={{ fontSize: 24, color: theme.text, marginTop: 15, textAlign: "center" }}>What would you like to
            visit on </Text>
        </View>
        {/*Day selector*/}
        <View style={{ flexDirection: "row", marginLeft: 80, marginTop: 20 }}>
          <SelectDropdown
            dropdownStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
            selectedRowStyle={{ backgroundColor: "white" }}
            buttonStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
            dropdownIconPosition="right"
            defaultButtonText={"1. day"}
            data={day}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => item}
          />
          <Text className="font-bold text-2xl" style={{ fontSize: 24, color: theme.text, marginTop: 10 }}> ?</Text>
        </View>
        {destinationList.map((singleDestination, index) => (
          <View key={index}>
            <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 ml-4 mr-20 mt-4">
              <SelectDropdown
                dropdownStyle={{ borderRadius: 30, backgroundColor: theme.searchInput, width: 270, marginLeft: -20 }}
                selectedRowStyle={{ backgroundColor: "white" }}
                buttonStyle={{ backgroundColor: theme.searchInput }}
                data={destinations}
                onSelect={(e) => handleDestinationChange(e, index)}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem.name}
                rowTextForSelection={(item, index) => item.name}
                defaultButtonText="Destination"
                className="flex-1 font-semibold text-gray-700" />
              {destinationList.length > 1 &&
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
            {destinationList.length - 1 === index && destinationList.length < 10 &&
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
        <View style={{ paddingLeft: 40, paddingRight: 180, marginTop: 10 }}>
          <TouchableOpacity onPress={hotelNavigation}>
            <Text style={{
              backgroundColor: theme.button,
              color: "white",
              borderRadius: 50,
              padding: 10,
              fontWeight: "bold",
            }}>Editing on the map</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 40 }}>
          <TouchableOpacity className="py-3 rounded-full mb-10 mx-4" style={{ backgroundColor: theme.button }}
                            onPress={handleAddTrip}>
            <Text className="font-xl font-bold text-center text-white">Save trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
