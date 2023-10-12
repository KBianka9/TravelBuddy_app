import React from "react";
import { Image, TouchableOpacity, View, ScrollView, Text, TextInput } from "react-native";
import { ArrowLeftIcon, MapPinIcon, PlusIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";

export default function RecentTripScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const day = ["1. day", "2. day", "3. day", "4. day"];

  return (
    <View className="flex-1">
      <Image source={item.img}
             style={{ height: 310 }}
             className="w-full absolute"
      />
      <SafeAreaView>
        <View className="flex-row justify-between items-center mr-2 mt-3">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            style={{ backgroundColor: theme.button }}>
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView className="flex-1 bg-white px-8"
                  style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 200 }}>
        <View className="ml-2 space-y-3 mt-5">
          <Text
            style={{ fontSize: 20, fontStyle: "italic", textAlign: "center", color: "black" }}>{item.tripName}</Text>
          <Text style={{ fontSize: 20, marginTop: 5, color: theme.text, fontWeight: "bold" }}>Ungabunga Hotel</Text>
          <View style={{ flexDirection: "row", marginLeft: -4 }}>
            <MapPinIcon style={{ marginLeft: 20 }} size="25" color="black" />
            <Text style={{ fontSize: 18, marginTop: 2, color: "black" }}>
              {item.city}, {item.country}
            </Text>
          </View>
          {/*TODO:megoldani, hogy a hotel minden adata latszodjon*/}
          <TouchableOpacity onPress={() => navigation.navigate("Hotel", { ...item })}>
            <Text>About accommodation</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, marginTop: 5, color: theme.text, fontWeight: "bold" }}>
            {item.date}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 24, marginTop: 20, color: "black" }}>Destination(s):</Text>
            {/*Day selector*/}
            <View style={{ marginTop: 15, marginLeft: 15 }}>
              <SelectDropdown
                dropdownStyle={{ borderRadius: 50, backgroundColor: theme.searchInput }}
                selectedRowStyle={{ backgroundColor: "white" }}
                buttonStyle={{ borderRadius: 50, backgroundColor: theme.searchInput, width: 140, height: 45 }}
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
            </View>
          </View>
          <View style={{
            flexDirection: "row",
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: theme.button,
            marginHorizontal: 20,
          }}>
            <Text style={{ color: theme.iconOff, marginLeft: 16, fontSize: 17 }}>{item.destinationF}</Text>
          </View>
          <View style={{
            flexDirection: "row",
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: theme.button,
            marginHorizontal: 20,
          }}>
            <Text style={{ color: theme.iconOff, marginLeft: 16, fontSize: 17 }}>{item.destinationS}</Text>
          </View>
          <View style={{
            flexDirection: "row",
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: theme.button,
            marginHorizontal: 20,
          }}>
            <Text style={{ color: theme.iconOff, marginLeft: 16, fontSize: 17 }}>{item.destinationT}</Text>
          </View>
          <View style={{ marginRight: 197 }}>
            <TouchableOpacity onPress={() => {
            }}>
              <Text style={{
                backgroundColor: theme.background,
                borderRadius: 50,
                padding: 10,
                fontWeight: "bold",
                marginBottom: 50,
                marginTop: 20,
              }}>Look at the map</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
