import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon, PlusIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import DatePicker from "react-native-date-ranges";
import * as Animatable from "react-native-animatable";


export default function AddTripScreen() {
  const navigation = useNavigation();
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [destination, setDestination] = useState("");

  const day = ["1. day", "2. day", "3. day", "4. day"];
  const handleAddTrip = () => {
    if (place && date) {
      navigation.navigate("RoutePlanner");
    } else {

    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
      <Image source={require("../src/assets/flat-lay-hands-holding-photos.jpg")}
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
      <ScrollView className="flex-col flex-1 bg-white px-4 pt-6"
                  style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 215 }}>
        <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 mb-4">
          <TextInput placeholder="Add a name of your trip" className="p-4 flex-1 font-semibold text-gray-700" />
        </View>
        <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 mb-4">
          <TextInput value={place} onChangeText={value => setPlace(value)} placeholder="Accommodation name"
                     className="p-4 flex-1 font-semibold text-gray-700" />
        </View>
        <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 mb-4">
          <DatePicker
            style={{ width: 350, height: 45, margin: 10 }}
            customStyles={{
              placeholderText: { fontSize: 20 }, // placeHolder style
              headerStyle: { backgroundColor: theme.background }, // title container style
              headerMarkTitle: { fontSize: 25 }, // title mark style
              borderRadius: 50,
            }} // optional
            centerAlign // optional text will align center or not
            markText={"Date picker"}
            selectedBgColor={theme.iconOnG}
            allowFontScaling={false} // optional
            placeholder={"Apr 27, 2018 → Jul 10, 2018"}
            mode={"range"}
          />
        </View>
        <View>
          <Text style={{ fontSize: 24, color: theme.text, marginTop: 15, textAlign: "center" }}>What would you like to
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
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
          <Text style={{ fontSize: 24, color: theme.text, marginTop: 10 }}> ?</Text>
        </View>
        <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 ml-4 mr-20 mb-4 mt-6">
          <TextInput value={destination} onChangeText={value => setDestination(value)} placeholder="Destination"
                     className="p-4 flex-1 font-semibold text-gray-700" />
          <TouchableOpacity style={{ shadowOpacity: 1, end: -60 }}>
            <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                             style={{ borderWidth: 0 }}>
              <PlusIcon size="5" strokeWidth={2} color={theme.iconOn}
                        style={{ backgroundColor: theme.button, borderRadius: 20, padding: 20 }} />
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <View style={{ paddingLeft: 40, paddingRight: 180 }}>
          <TouchableOpacity onPress={() => {
          }}>
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
          <TouchableOpacity className="py-3 rounded-full mb-20 mx-4" style={{ backgroundColor: theme.button }}
                            onPress={handleAddTrip}>
            <Text className="font-xl font-bold text-center text-white">Save trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
