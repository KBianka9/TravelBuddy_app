import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { ArrowLeftIcon, PlusIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
import OptionsMenu from "react-native-options-menu";
import * as Animatable from "react-native-animatable";

const bucketListItem = [
  {
    name: "Big Ben, England",
    status: "checked",
    checked: true,
  },
  {
    name: "Eiffel Tower, France",
    status: "unchecked",
    checked: false,
  },
  {
    name: "Machu Picchu, Peru",
    status: "checked",
    checked: true,
  },
  {
    name: "Colosseum, Italy",
    status: "unchecked",
    checked: false,
  },
];

const listTab = [
  {
    status: "All",
  },
  {
    status: "checked",
  },
  {
    status: "unchecked",
  },
];

export default function BucketListScreen() {

  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState("All");
  const [bucketList, setBucketList] = useState(bucketListItem);

  const setStatusFilter = (status) => {
    if (status !== "All") {
      setBucketList([...bucketListItem.filter(e => e.status === status)]);
    } else {
      setBucketList(bucketListItem);
    }
    setStatus(status);
  };
  /*TODO: nem a megfelelo indexu elemet torli ki, a tobbi oldalon nem frissul a valtozas*/
  const handleItemRemove = (index) => {
    const list = [...bucketList];
    list.splice(index, 1);
    setBucketList(list);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{ borderBottomWidth: 1, borderColor: theme.button, paddingBottom: 15, paddingTop: 20 }}>
        <CheckBox isChecked={bucketList.checked}
                  onClick={() => setBucketList({ ...bucketList, checked: !bucketList.checked })}
                  checkedCheckBoxColor={theme.iconOnG}
                  uncheckedCheckBoxColor={theme.iconOff}
                  leftText={item.name}
                  leftTextStyle={{
                    marginLeft: 30,
                    color: bucketList.checked ? theme.iconOnG : theme.iconOff,
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                  style={{ paddingRight: 40 }}
        />
        <OptionsMenu
          button={require("../src/assets/three-dots.png")}
          buttonStyle={{ width: 32, height: 17, resizeMode: "contain", marginTop: -20, marginLeft: 290 }}
          destructiveIndex={1}
          options={["Memories", "Delete", "Cancel"]}
          actions={[memories, handleItemRemove, null]}
        />
      </View>
    );
  };

  const memories = () => {
    navigation.navigate("Memories");
  };

  function renderModal() {
    return (
      <Modal visible={modal} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 15, width: "90%", height: 200, borderRadius: 10 }}>
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: "bold" }}>
              Add new list item
            </Text>
            <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 ml-0 mt-4">
              <TextInput placeholder="Spectacle, Country"
                         className="p-2 flex-1 font-semibold text-gray-700 ml-2"></TextInput>
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
      <Image source={require("../src/assets/bucket_list.jpg")}
             style={{ height: 385 }}
             className="w-full absolute"
      />
      <SafeAreaView className="flex-row justify-start">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 my-4"
          style={{ backgroundColor: theme.button }}>
          <ArrowLeftIcon size="20" color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, paddingTop: 20, paddingLeft: 100, fontWeight: "bold" }}>Bucket list</Text>
        <TouchableOpacity style={{ shadowOpacity: 1, paddingBottom: 5, marginLeft: 15 }}
                          onPress={() => setModal(true)}
        >
          <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                           className="ml-20 my-2 pt-2">
            <PlusIcon size="5" strokeWidth={2} color={theme.iconOn}
                      style={{ backgroundColor: theme.button, borderRadius: 20, padding: 20 }} />
          </Animatable.View>
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView className="flex-1 bg-white px-8 pt-4"
                  style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 300 }}>
        <View style={{ marginTop: 15 }}>
          <View style={{ flexDirection: "row", marginBottom: 25 }}>
            {listTab.map(e => (
              <TouchableOpacity className="ml-3"
                                onPress={() => setStatusFilter(e.status)}
                                style={[styles.backgroundButton, status === e.status && styles.backgroundActiveButton]}
              >
                <Text style={{
                  fontWeight: "bold", textAlign: "center", paddingHorizontal: 22,
                  paddingVertical: 10,
                }}>{e.status}</Text>
              </TouchableOpacity>
            ))}
            {renderModal()}
          </View>
          <FlatList
            data={bucketList}
            keyExtractor={(e, i) => i.toString()}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>
    </View>
  );
}
