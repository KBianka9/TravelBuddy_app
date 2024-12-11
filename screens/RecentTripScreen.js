import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text } from "react-native";
import { ArrowLeftIcon, MapPinIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import openMap from "react-native-open-maps";
import { destinations } from "../constants";

export default function RecentTripScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState(1);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [days, setDays] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Az "YYYY-MM-DD" rész kivétele
  };

  const filter = () => {
    setFilteredDestinations(item.destinations
      .filter(item => item.day === selectedDay)
      .sort((a, b) => a.order - b.order));
  };
  useEffect(() => {
    filter();
  }, [selectedDay]);

  useEffect(() => {
    setDays([...new Set(item.destinations.map(destination => destination.day))]);
    filter();
  }, []);

  function goToDestinations() {
    const mapOptions = {};
    if (filteredDestinations.length !== 0) {
      mapOptions.start = item.accommodation.latitude + ", " + item.accommodation.longitude;
      mapOptions.end = filteredDestinations[filteredDestinations.length - 1].destination.latitude + ", " + filteredDestinations[filteredDestinations.length - 1].destination.longitude;
      mapOptions.waypoints = filteredDestinations.slice(0, -1).map(destination => destination.destination.latitude + ", " + destination.destination.longitude);
      mapOptions.navigate = true;
      mapOptions.mapType = "transit";
      mapOptions.travelType = "drive";
    } else {
      mapOptions.latitude = item.accommodation.latitude;
      mapOptions.longitude = item.accommodation.longitude;
    }
    openMap(mapOptions);
  }

  return (
    <View className="flex-1">
      <Image source={{ uri: `http://10.0.2.2:3000/accommodationImg/${item.accommodationId}.jpg` }}
             style={{ height: 310 }}
             className="w-full absolute"
      />
      <SafeAreaView>
        <View className="flex-row justify-between items-center mr-2 mt-3">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            style={{ backgroundColor: theme.button }}>
            <ArrowLeftIcon size="25" color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView className="flex-1 bg-white px-8"
                  style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 200 }}>
        <View className="ml-2 space-y-3 mt-5">
          <Text
            style={{ fontSize: 20, fontStyle: "italic", textAlign: "center", color: "black" }}>{item.tripTitle}</Text>
          <Text style={{
            fontSize: 20,
            marginTop: 5,
            color: theme.text,
            fontWeight: "bold",
          }}>{item.accommodation.name}</Text>
          <View style={{ flexDirection: "row", marginLeft: -4 }}>
            <MapPinIcon style={{ marginLeft: 20 }} size="25" color="black" />
            <Text style={{ fontSize: 18, marginTop: 2, color: "black" }}>
              {item.accommodation.cityCountryName}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Hotels")}>
            <Text>About accommodation</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, marginTop: 5, color: theme.text, fontWeight: "bold" }}>
            {formatDate(item.from)} - {formatDate(item.to)}
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
                data={days}
                defaultButtonText="1. day"
                onSelect={(selectedItem, index) => {
                  setSelectedDay(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem + ". day"}
                rowTextForSelection={(item, index) => item + ". day"}
              />
            </View>
          </View>
          <View>
            {filteredDestinations.map(function(destination, index) {
              return (
                <View style={{
                  flexDirection: "row",
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderColor: theme.button,
                  marginHorizontal: 20,
                }} key={destination.destination.name}>
                  <Text
                    style={{ color: theme.iconOff, marginLeft: 16, fontSize: 17 }}>{destination.destination.name}</Text>
                </View>
              );
            })}
          </View>
          <View style={{ width: 105 }}>
            <TouchableOpacity onPress={goToDestinations}>
              <Text style={{
                backgroundColor: theme.background,
                borderRadius: 50,
                padding: 10,
                fontWeight: "bold",
                marginBottom: 50,
                marginTop: 20,
              }}>View on map</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
