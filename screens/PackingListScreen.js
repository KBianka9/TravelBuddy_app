import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ArrowLeftIcon, PlusIcon, MinusIcon } from "react-native-heroicons/solid";
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
    packed: 1,
    tags: ["Essentials"],
  },
  {
    name: "cash",
    packed: 0,
    tags: ["Essentials"],
  },
  {
    name: "credit card",
    packed: 1,
    tags: ["Essentials"],
  },
  {
    name: "smart phone and charger",
    packed: 2,
    tags: ["Essentials"],
  },
  {
    name: "health insurance card",
    packed: 1,
    tags: ["Essentials"],
  },
  {
    name: "underwear",
    packed: 5,
    tags: ["Clothes and shoes"],
  },
  {
    name: "pyjamas",
    packed: 1,
    tags: ["Clothes and shoes"],
  },
  {
    name: "T-shirts",
    packed: 6,
    tags: ["Clothes and shoes"],
  },
  {
    name: "shorts",
    packed: 2,
    tags: ["Clothes and shoes"],
  },
  {
    name: "sport shoes",
    packed: 1,
    tags: ["Clothes and shoes"],
  },
  {
    name: "toothbrush",
    packed: 1,
    tags: ["Toiletries"],
  },
  {
    name: "toothpasta",
    packed: 0,
    tags: ["Toiletries"],
  },
  {
    name: "shower gel",
    packed: 1,
    tags: ["Toiletries"],
  },
  {
    name: "shampoo and conditioner",
    packed: 2,
    tags: ["Toiletries"],
  },
  {
    name: "First-aid kit",
    packed: 1,
    tags: ["Toiletries"],
  },
  {
    name: "painkillers",
    packed: 6,
    tags: ["Toiletries"],
  },
  {
    name: "sunglasses",
    packed: 1,
    tags: ["Other"],
  },
  {
    name: "powerbank",
    packed: 2,
    tags: ["Other"],
  },
  {
    name: "books",
    packed: 1,
    tags: ["Other"],
  },
  {
    name: "tissues",
    packed: 6,
    tags: ["Other"],
  },
];


export default function PackingListScreen() {
  const navigation = useNavigation();
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
                buttonStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
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
          <ArrowLeftIcon size="20" color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, paddingTop: 20, paddingLeft: 90, fontWeight: "bold", color: "white" }}>Packing
          list</Text>
      </SafeAreaView>
      <ScrollView className="flex-1 bg-white px-8 pt-4"
                  style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 225 }}>
        <View style={{ flexDirection: "row", paddingLeft: 3, marginTop: 15 }}>
          <TouchableOpacity style={{ shadowOpacity: 1, paddingRight: 20, paddingTop: 5 }}
                            onPress={() => setModal(true)}
          >
            <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"}
                             duration={1000} style={{ borderWidth: 0 }}>
              <PlusIcon size="5" strokeWidth={2} color={theme.iconOn}
                        style={{ backgroundColor: theme.button, borderRadius: 20, padding: 20 }} />
            </Animatable.View>
          </TouchableOpacity>
          {renderModal()}
          {/*Packing categories selector*/}
          <SelectDropdown
            dropdownStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
            selectedRowStyle={{ backgroundColor: "white" }}
            buttonStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
            dropdownIconPosition="right"
            data={filterOptions}
            defaultValueByIndex="0"
            onSelect={(selectedItem, index) => {
              setSelectedTag(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => item}
                />
                <View style={{ paddingLeft: 20, paddingTop: 5 }}>
                  <TouchableOpacity onPress={() => reset()}>
                    <Image source={require("../src/assets/reset.png")}
                           style={{ width: 32, height: 32, marginRight: 10, marginTop: 5 }} />
                  </TouchableOpacity>
                </View>
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
                    <Text style={{ fontSize: 20, paddingBottom: 15 }} className="max-w-[60%]">{item.name}</Text>
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
    );
}
