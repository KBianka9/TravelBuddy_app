import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, TextInput, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import OptionsMenu from "react-native-options-menu";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import SelectDropdown from "react-native-select-dropdown";
import { UserContext } from "../../App";

const userListItem = [
  {
    id: 3,
    name: "Bianka Kiss",
    email: "kiss.bianka19995@gmail.com",
    profileImg: require("../../src/assets/corgi.webp"),
    role: "ADMIN",
    password: "987654321",
  },
  {
    id: 1,
    name: "Márk Dékány",
    email: "dekanymark@gmail.com",
    profileImg: require("../../src/assets/profile.png"),
    role: "USER",
    password: "123456789",
  },
  {
    id: 6,
    name: "Fanni Tóth",
    email: "tothfanni@gmail.com",
    profileImg: require("../../src/assets/frenchbulldog.jpg"),
    role: "USER",
    password: "tothfanni",
  },
  {
    id: 4,
    name: "Dalma Nagy",
    email: "nagydalma@gmail.com",
    profileImg: require("../../src/assets/frenchbulldog1.jpg"),
    role: "USER",
    password: "nagydalma",
  },
  {
    id: 5,
    name: "Fanni Molnár",
    email: "molnarfanni@gmail.com",
    profileImg: require("../../src/assets/frenchbulldog2.jpg"),
    role: "USER",
    password: "molnarfanni",
  },
];
const type = ["id", "name"];
const permission = [
  "USER",
  "ADMIN",
];

export default function UsersScreen({ navigation }) {
  const [modal, setModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(permission[0]);
  const { user } = useContext(UserContext);

  if (user.role !== "ADMIN") {
    navigation.navigate("PlaceSearcher");
    return;
  }

  const editMode = () => {
    setModal(true);
  };

//TODO: felhasználó adatainak módosítása
  function renderModal() {
    return (
      <Modal visible={modal} animationType="slide" transparent={true}
             style={{
               margin: 20,
               backgroundColor: "white",
               borderRadius: 20,
               padding: 35,
               alignItems: "center",
               shadowColor: "#000",
               shadowOffset: {
                 width: 0,
                 height: 2,
               },
               shadowOpacity: 0.25,
               shadowRadius: 4,
               elevation: 5,
             }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 15, width: "90%", height: 450, borderRadius: 10 }}>
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: "bold" }}>Edit user's data</Text>
            <Image source={require("../../src/assets/profile.png")}
                   style={{ height: 70, width: 70, borderRadius: 90, alignSelf: "center" }}
            />
            <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 ml-0 mt-4">
              <Text className="p-2 flex-1 font-semibold text-gray-700 ml-2">Kiss Bianka</Text>
            </View>
            <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 ml-0 mt-4">
              <Text className="p-2 flex-1 font-semibold text-gray-700 ml-2">kiss.bianka@gmail.com</Text>
            </View>
            <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 ml-0 mt-4">
              <Text className="p-2 flex-1 font-semibold text-gray-700 ml-2">123456789</Text>
            </View>
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <SelectDropdown
                dropdownStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
                selectedRowStyle={{ backgroundColor: "white" }}
                selectedRowTextStyle={{ fontSize: 17, fontWeight: "800", color: theme.text }}
                buttonStyle={{ borderRadius: 30, backgroundColor: theme.searchInput, width: 250 }}
                buttonTextStyle={{ fontSize: 17, fontWeight: "800", color: theme.text }}
                rowTextStyle={{ fontSize: 15, fontWeight: "500", color: theme.text }}
                dropdownIconPosition="right"
                data={permission}
                defaultValueByIndex="0"
                onSelect={(selectedItem, index) => {
                  setSelectedTag(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                rowTextForSelection={(item, index) => item}
              />
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

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} className="flex-row gap-x-4 items-center"
            style={{ borderBottomWidth: 1, borderColor: theme.button, paddingVertical: 15 }}>
        <Image source={item.profileImg}
               style={{ height: 70, width: 70, borderRadius: 90 }}
        />
        <View style={{ flexDirection: "column", width: 200 }}>
          <Text className="font-bold">{item.name}</Text>
          <Text className="font-bold">{item.email}</Text>
          <Text>Id: {item.id}</Text>
          <Text>{item.role}</Text>
        </View>
        <OptionsMenu
          button={require("../../src/assets/three-dots.png")}
          buttonStyle={{ width: 32, height: 20, resizeMode: "contain", marginTop: 10, marginLeft: 10 }}
          destructiveIndex={1}
          options={["Edit", "Delete", "Cancel"]}
          actions={[editMode, null, null]}
        />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
      <Image source={require("../../src/assets/users.png")}
             style={{ height: 270 }}
             className="w-full absolute"
      />
      <SafeAreaView className="flex-row justify-start">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 my-4"
          style={{ backgroundColor: theme.button }}>
          <ArrowLeftIcon size="25" color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-4"
            style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 180 }}>
        <View className="flex-row">
          <SelectDropdown
            dropdownStyle={{
              justifyContent: "center",
              borderRadius: 30,
              backgroundColor: theme.searchInput,
              width: 80,
            }}
            selectedRowStyle={{ justifyContent: "center", backgroundColor: "white" }}
            buttonStyle={{
              justifyContent: "center",
              borderRadius: 30,
              backgroundColor: theme.searchInput,
              width: 80,
              height: 60,
            }}
            defaultButtonText={"id"}
            buttonTextStyle={{ fontSize: 15, fontWeight: "700", color: theme.text }}
            data={type}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => item}
          />
          {renderModal()}
          {/*User searcher*/}
          <View className="flex-row items-center rounded-full p-2 bg-gray-200 ml-4">
            <TextInput placeholder="Search user"
                       style={{ padding: 8, fontWeight: "600", color: theme.text, width: 180 }}
            />
            <TouchableOpacity className="rounded-full p-2 mr-1"
                              style={{ backgroundColor: theme.background }}>
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"></MagnifyingGlassIcon>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{ marginTop: 10 }}>
          <View>
            <FlatList
              data={userListItem}
              keyExtractor={(e, i) => i.toString()}
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
