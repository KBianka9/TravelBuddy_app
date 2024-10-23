import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text } from "react-native";
import { ArrowLeftIcon, MapPinIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import openMap from "react-native-open-maps";

/*TODO: idointervallumbol jojjon*/
const filterOptions = ["1. day", "2. day", "3. day", "4. day"];

const spectacleItems = [
  {
    spectacleName: "Uluwatu Temple",
    tags: ["1. day"],
  },
  {
    spectacleName: "Pura Ulun Danu Beratan",
    tags: ["1. day"],
  },
  {
    spectacleName: "Tanah Lot",
    tags: ["1. day"],
  },
  {
    spectacleName: "Phool Bagh Park",
    tags: ["2. day"],
  },
  {
    spectacleName: "Atal Ghat",
    tags: ["2. day"],
  },
  {
    spectacleName: "Nana Rao Restaurant",
    tags: ["2. day"],
  },
  {
    spectacleName: "Brahmavart Ghat",
    tags: ["2. day"],
  },
  {
    spectacleName: "Moti Jheel",
    tags: ["3. day"],
  },
  {
    spectacleName: "Jk Temple",
    tags: ["3. day"],
  },
  {
    spectacleName: "Allen Forest Zoo",
    tags: ["4. day"],
  },
];


export default function RecentTripScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [selectedTag, setSelectedTag] = useState(filterOptions[0]);
  const [filteredSpectacleItems, setFilteredSpectacleItems] = useState(spectacleItems);

  const filter = () => {
    setFilteredSpectacleItems(spectacleItems.filter(item => item.tags.includes(selectedTag)));
  };
  useEffect(() => filter(), [spectacleItems, selectedTag]);

  function goToBudapest() {
    openMap({ latitude: 47.49715361442786, longitude: 19.057183488380094 });
  }

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
            <ArrowLeftIcon size="25" color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView className="flex-1 bg-white px-8"
                  style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 200 }}>
        <View className="ml-2 space-y-3 mt-5">
          <Text
            style={{ fontSize: 20, fontStyle: "italic", textAlign: "center", color: "black" }}>{item.tripName}</Text>
          <Text style={{ fontSize: 20, marginTop: 5, color: theme.text, fontWeight: "bold" }}>{item.name}</Text>
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
                data={filterOptions}
                defaultValueByIndex="0"
                onSelect={(selectedItem, index) => {
                  setSelectedTag(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                rowTextForSelection={(item, index) => item}
              />
            </View>
          </View>
          <View>
            {filteredSpectacleItems.map(function(item, index) {
              return (
                <View style={{
                  flexDirection: "row",
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderColor: theme.button,
                  marginHorizontal: 20,
                }} key={item.spectacleName}>
                  <Text style={{ color: theme.iconOff, marginLeft: 16, fontSize: 17 }}>{item.spectacleName}</Text>
                </View>
              );
            })}
          </View>
          <View style={{ marginRight: 197 }}>
            <TouchableOpacity onPress={goToBudapest}>
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
