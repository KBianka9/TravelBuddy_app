import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ArrowLeftIcon, PlusIcon, MinusIcon, ArrowPathIcon } from "react-native-heroicons/solid";
import SelectDropdown from "react-native-select-dropdown";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
import { addPackingItem, amountPackingItem, listPackingItem } from "../contollers/packinglistController";
import { UserContext } from "../App";

const filterOptions = [
  {
    name: "All",
    type: "ALL",
  },
  {
    name: "Essentials",
    type: "ESSENTIALS",
  },
  {
    name: "Clothes and shoes",
    type: "CLOTHESANDSHOES",
  },
  {
    name: "Toiletries",
    type: "TOILETRIES",
  },
  {
    name: "Other",
    type: "OTHER",
  },
];

export default function PackingListScreen({ navigation }) {
  const [modal, setModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(filterOptions[0]);
  const [filteredPackingList, setFilteredPackingList] = useState([]);
  const [packingListItems, setPackingListItems] = useState([]);
  const [packCat, setPackCat] = useState(filterOptions[0]);
  const [packItem, setPackItem] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    filter();
  }, [selectedTag]);

  useEffect(() => {
    loadPackingListItems();
  }, []);

  const loadPackingListItems = async () => {
    try {
      const response = await listPackingItem(user.userId);
      setPackingListItems(response.data);
      setFilteredPackingList(response.data);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };

  const packingItemAmount = async (itemId, amount) => {
    try {
      await amountPackingItem(user.userId, itemId, amount);
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "You can save the new item!",
        visibilityTime: 5000,
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
      throw e;
    }
  };
  const increment = async (item) => {
    await packingItemAmount(item.packingItemId, item.amount + 1);
    item.amount++;
    setFilteredPackingList([...filteredPackingList]);
  };
  const decrement = async (item) => {
    await packingItemAmount(item.packingItemId, item.amount - 1);
    item.amount--;
    setFilteredPackingList([...filteredPackingList]);
  };

  const filter = () => {
    if (selectedTag.name === "All")
      setFilteredPackingList(packingListItems);
    else
      setFilteredPackingList(packingListItems.filter(item => item.packingItem.category === selectedTag.type));
  };

  const saveNewPackingItem = async () => {
    try {
      await addPackingItem(packCat.type, packItem, user.userId);
      await loadPackingListItems();
      setModal(false);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "You can't save the new item!",
        visibilityTime: 5000,
      });
    }
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
                data={filterOptions}
                defaultValueByIndex="0"
                onSelect={(selectedItem, index) => {
                  setPackCat(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem.name}
                rowTextForSelection={(item, index) => item.name}
              />
            </View>
            <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 ml-0 mt-4">
              <TextInput placeholder="Item name"
                         className="p-2 flex-1 font-semibold text-gray-700 ml-2"
                         value={packItem}
                         onChangeText={value => setPackItem(value)}
                         require={true}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 130 }}>
              <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                style={{ backgroundColor: theme.iconOnG }}
                                onPress={saveNewPackingItem}>
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

  useEffect(() => {
    setTimeout(() => {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Check your packing list, maybe something is missing!",
        visibilityTime: 10000,
      });
    }, 2000);
  }, []);

  return (
    <View className="flex-1 bg-white">
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
              buttonTextAfterSelection={(selectedItem, index) => selectedItem.name}
              rowTextForSelection={(item, index) => item.name}
            />
          </View>
          {/*List of packing items*/}
          <View>
            {filteredPackingList.map(function(item, index) {
              return (
                <View
                  style={{ borderBottomWidth: 2, borderColor: theme.button, marginTop: 20 }}
                  className="flex-row justify-between"
                  key={item}
                >
                  <Text style={{ fontSize: 18, paddingBottom: 15, paddingLeft: 10 }}
                        className="max-w-[60%]">{item.packingItem.name}</Text>
                  <View className="flex-row gap-3 items-center" style={{ paddingBottom: 15 }}>
                    <TouchableOpacity onPress={() => decrement(item)} disabled={item.amount === 0}>
                      <MinusIcon size="2" strokeWidth={2} color={theme.iconOn}
                                 style={{
                                   backgroundColor: theme.decrementButton,
                                   borderRadius: 20,
                                   padding: 14,
                                 }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{ fontSize: 22 }}>{item.amount}</Text>
                    <TouchableOpacity onPress={() => increment(item)}>
                      <PlusIcon size="2" strokeWidth={2} color={theme.iconOn}
                                style={{
                                  backgroundColor: theme.iconOnG,
                                  borderRadius: 20,
                                  padding: 14,
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
