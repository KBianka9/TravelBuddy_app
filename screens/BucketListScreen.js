import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput, FlatList, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { ArrowLeftIcon, PlusIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
import OptionsMenu from "react-native-options-menu";
import * as Animatable from "react-native-animatable";
import ImagePicker from "react-native-image-crop-picker";
import Toast from "react-native-toast-message";

const bucketListItem = [
  {
    name: "Big Ben, England",
    alfa3: "GBR",
    status: "checked",
    checked: true,
  },
  {
    name: "Eiffel Tower, France",
    alfa3: "FRA",
    status: "unchecked",
    checked: false,
  },
  {
    name: "Machu Picchu, Peru",
    alfa3: "PER",
    status: "checked",
    checked: true,
  },
  {
    name: "Colosseum, Italy",
    alfa3: "ITA",
    status: "unchecked",
    checked: false,
  },
  {
    name: "Taj Mahal, India",
    alfa3: "IND",
    status: "unchecked",
    checked: true,
  },
  {
    name: "Pyramids of Giza, Egypt",
    alfa3: "EGY",
    status: "unchecked",
    checked: true,
  },
  {
    name: "Statue of Liberty, USA",
    alfa3: "USA",
    status: "unchecked",
    checked: false,
  },
  {
    name: "Sydney Opera House, Australia",
    alfa3: "AUS",
    status: "unchecked",
    checked: true,
  },
  {
    name: "Great Wall of China, China",
    alfa3: "CHN",
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
  const [selectMapImage, setSelectMapImage] = useState("");

  const mapPicker = async () => {
    try {
      await ImagePicker.openPicker({
        cropping: true,
      }).then(image => {
        console.log(image, "image");
        setSelectMapImage(image);
        Toast.show({
          type: "success",
          text1: "Uploaded map!",
          visibilityTime: 5000,
        });
      });
    } catch (error) {
      console.log(error, "error");
    }
  };
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
      <TouchableOpacity onPress={mapPicker}>
        <Image
          source={!selectMapImage ? (require("../src/assets/MapChart_Map.png")) : { uri: selectMapImage?.path }}
          style={{ height: 390, width: 400 }}
          className="w-full absolute"
        />
      </TouchableOpacity>
      <SafeAreaView className="flex-row justify-start">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 my-4"
          style={{ backgroundColor: theme.button }}>
          <ArrowLeftIcon size="25" color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, paddingTop: 20, paddingLeft: 100, fontWeight: "bold" }}>Bucket list</Text>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-4"
            style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 300 }}>
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
        <ScrollView style={{ marginTop: 15 }}>
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
        </ScrollView>
        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity className="py-3 rounded-full mb-5 mx-4" style={{ backgroundColor: theme.button }}
                            onPress={() => Linking.openURL("https://www.mapchart.net/world.html")}>
            <Text className="font-xl font-bold text-center text-white">Show as map</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
