import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ArrowLeftIcon, PlusIcon, MinusIcon, ArrowPathIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import * as Animatable from "react-native-animatable";

const filterOptions = [
  "All",
  "Essentials",
  "Clothes and shoes",
  "Toiletries",
  "Other",
];
const filterOptionsNew = [
  "Essentials",
  "Clothes and shoes",
  "Toiletries",
  "Other",
];

const packingItems = [
  {
    name: "passport",
    packed: 0,
    tags: ["Essentials"],
  },
  {
    name: "cash",
    packed: 0,
    tags: ["Essentials"],
  },
  {
    name: "credit card",
    packed: 0,
    tags: ["Essentials"],
  },
  {
    name: "smart phone and charger",
    packed: 0,
    tags: ["Essentials"],
  },
  {
    name: "health insurance card",
    packed: 0,
    tags: ["Essentials"],
  },
  {
    name: "underwear",
    packed: 0,
    tags: ["Clothes and shoes"],
  },
  {
    name: "pyjamas",
    packed: 0,
    tags: ["Clothes and shoes"],
  },
  {
    name: "T-shirts",
    packed: 0,
    tags: ["Clothes and shoes"],
  },
  {
    name: "shorts",
    packed: 0,
    tags: ["Clothes and shoes"],
  },
  {
    name: "sport shoes",
    packed: 0,
    tags: ["Clothes and shoes"],
  },
  {
    name: "toothbrush",
    packed: 0,
    tags: ["Toiletries"],
  },
  {
    name: "tooth pasta",
    packed: 0,
    tags: ["Toiletries"],
  },
  {
    name: "shower gel",
    packed: 0,
    tags: ["Toiletries"],
  },
  {
    name: "shampoo and conditioner",
    packed: 0,
    tags: ["Toiletries"],
  },
  {
    name: "First-aid kit",
    packed: 0,
    tags: ["Toiletries"],
  },
  {
    name: "painkillers",
    packed: 0,
    tags: ["Toiletries"],
  },
  {
    name: "sunglasses",
    packed: 0,
    tags: ["Other"],
  },
  {
    name: "power bank",
    packed: 0,
    tags: ["Other"],
  },
  {
    name: "books",
    packed: 0,
    tags: ["Other"],
  },
  {
    name: "tissues",
    packed: 0,
    tags: ["Other"],
  },
];


export default function PackingListScreen({ navigation }) {
  const [modal, setModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(filterOptions[0]);
  const [fullPackingList, setFullPackingList] = useState(packingItems);
  const [filteredPackingList, setFilteredPackingList] = useState(packingItems);

  useEffect(() => filter(), [fullPackingList, selectedTag]);
  const increment = (itemName) => {
    setFullPackingList(prevList =>
      prevList.map(item =>
        item.name === itemName
          ? { ...item, packed: item.packed + 1 }
          : item,
      ),
    );
  };
  const decrement = (itemName) => {
    setFullPackingList(prevList =>
      prevList.map(item =>
        item.name === itemName && item.packed !== 0
          ? { ...item, packed: item.packed - 1 }
          : item,
      ),
    );
  };
  const reset = () => {
    setFullPackingList(packingItems);
  };
  const filter = () => {
    if (selectedTag === "All")
      setFilteredPackingList(fullPackingList);
    else
      setFilteredPackingList(fullPackingList.filter(item => item.tags.includes(selectedTag)));
  };

  function renderModal() {
    return (
      <Modal visible={modal} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 15, width: "90%", height: 280, borderRadius: 10 }}>
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: "bold" }}>
              Add new list item
            </Text>
            <View style={{ marginTop: 30, alignItems: "center" }}>
              <SelectDropdown
                dropdownStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
                selectedRowStyle={{ backgroundColor: "white" }}
                selectedRowTextStyle={{ fontSize: 17, fontWeight: "800", color: theme.text }}
                buttonStyle={{ borderRadius: 30, backgroundColor: theme.searchInput, width: 250 }}
                buttonTextStyle={{ fontSize: 17, fontWeight: "800", color: theme.text }}
                rowTextStyle={{ fontSize: 15, fontWeight: "500", color: theme.text }}
                dropdownIconPosition="right"
                data={filterOptionsNew}
                defaultValueByIndex="0"
                onSelect={(selectedItem, index) => {
                  setSelectedTag(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                rowTextForSelection={(item, index) => item}
              />
            </View>
            <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 ml-0 mt-4">
              <TextInput placeholder="Item name" className="p-2 flex-1 font-semibold text-gray-700 ml-2"></TextInput>
            </View>
            <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 130 }}>
              <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                style={{ backgroundColor: theme.iconOnG }}
                                onPress={() => {
                                }}>
                <Text className="font-xl text-center text-white px-6">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                style={{ backgroundColor: theme.iconOff }}
                                onPress={() => setModal(false)}>
                <Text className="font-l text-center text-white px-6">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
      <Image source={require("../src/assets/packinglist.jpg")}
             style={{ height: 310 }}
             className="w-full absolute"
      />
      <SafeAreaView className="flex-row justify-start">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 my-4"
          style={{ backgroundColor: theme.button }}>
          <ArrowLeftIcon size="25" color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, paddingTop: 25, paddingLeft: 90, fontWeight: "bold", color: "white" }}>Packing
          list</Text>
        <TouchableOpacity style={{ shadowOpacity: 1, end: -90, marginTop: 15 }}
                          onPress={() => reset()}
        >
          <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"}
                           duration={1000} style={{ backgroundColor: theme.button, borderRadius: 50, padding: 10 }}>
            <ArrowPathIcon size={25} color="white" strokeWidth={1} />
          </Animatable.View>
        </TouchableOpacity>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-4"
            style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 225 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ shadowOpacity: 1 }}
                            onPress={() => setModal(true)}
          >
            <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                             style={{
                               marginTop: -45,
                               backgroundColor: theme.button,
                               borderRadius: 50,
                               padding: 10,
                               start: 260,
                             }}
            >
              <PlusIcon size={40} strokeWidth={1} color={theme.iconOn} />
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ flexDirection: "row", paddingLeft: 3 }}>
            {renderModal()}
            {/*Packing categories selector*/}
            <SelectDropdown
              dropdownStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
              selectedRowStyle={{ backgroundColor: "white" }}
              selectedRowTextStyle={{ fontSize: 17, fontWeight: "800", color: theme.text }}
              buttonStyle={{ borderRadius: 30, backgroundColor: theme.searchInput, width: 250 }}
              buttonTextStyle={{ fontSize: 17, fontWeight: "800", color: theme.text }}
              rowTextStyle={{ fontSize: 15, fontWeight: "500", color: theme.text }}
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
          {/*List of packing items*/}
          <View>
            {filteredPackingList.map(function(item, index) {
              return (
                <View
                  style={{ borderBottomWidth: 2, borderColor: theme.button, marginTop: 20 }}
                  className="flex-row justify-between"
                  key={item.name}
                >
                  <Text style={{ fontSize: 18, paddingBottom: 15, paddingLeft: 10 }}
                        className="max-w-[60%]">{item.name}</Text>
                  <View className="flex-row gap-3 items-center" style={{ paddingBottom: 15 }}>
                    <TouchableOpacity onPress={() => decrement(item.name)} disabled={item.packed === 0}>
                      <MinusIcon size="2" strokeWidth={1} color={theme.iconOn}
                                 style={{
                                   backgroundColor: theme.decrementButton,
                                   borderRadius: 20,
                                   padding: 12,
                                 }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{ fontSize: 22 }}>{item.packed}</Text>
                    <TouchableOpacity onPress={() => increment(item.name)}>
                      <PlusIcon size="2" strokeWidth={2} color={theme.iconOn}
                                style={{
                                  backgroundColor: theme.iconOnG,
                                  borderRadius: 20,
                                  padding: 12,
                                }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
    );
}
