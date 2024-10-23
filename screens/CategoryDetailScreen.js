import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text, Modal, TextInput, ImageBackground } from "react-native";
import { ArrowLeftIcon, MapPinIcon, PlusIcon, StarIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { categoryList, itemList } from "../constants";
import Toast from "react-native-toast-message";
import * as Animatable from "react-native-animatable";

export default function CategoryDetailScreen() {
  const navigation = useNavigation();
  const [totalCost, setTotalCost] = useState();
  const [percentageTotal, setPercentageTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [cost, setCost] = useState();
  const [itemName, setItemName] = useState();

  /*TODO: kategóriákon belül számolja az összeget*/
  const calculateTotalPercentage = () => {
    let total = 0;
    categoryList[0]?.itemList[0]?.forEach(item => {
      total = total + item.cost;
    });
    console.log("Total cost: ".total);
    setTotalCost(total);
    const percentage = (total / categoryList[0].tBudget) * 100;
    setPercentageTotal(percentage);
  };

  const saveItem = async () => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Item saved!!",
      visibilityTime: 5000,
    });
  };

  function renderModal() {
    return (
      <Modal visible={modal} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 15, width: "90%", height: 260, borderRadius: 10 }}>
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: "bold" }}>
              Add new item
            </Text>
            <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 ml-0 mt-4">
              <TextInput placeholder="Item name" className="p-2 flex-1 font-semibold text-gray-700 ml-2"
                         onChangeText={(val) => setItemName(val)}
              ></TextInput>
            </View>
            <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 ml-0 mt-4">
              <TextInput placeholder="€ Item cost" keyboardType="numeric"
                         className="p-2 flex-1 font-semibold text-gray-700 ml-2"
                         onChangeText={(val) => setCost(val)}
              ></TextInput>
            </View>
            <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 130 }}>
              <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                style={{ backgroundColor: theme.iconOnG }}
                                onPress={() => saveItem()}>
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
    <ImageBackground source={require("../src/assets/OBSKLD0.jpg")} resizeMode="cover"
                     style={{ flex: 1, justifyContent: "center" }}>
      <View className="flex-1">
        <SafeAreaView>
          <View className="flex-row justify-between items-center mr-2 mt-4">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
              style={{ backgroundColor: theme.button }}>
              <ArrowLeftIcon size="25" color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={{
          marginTop: 10,
          marginHorizontal: 12,
          backgroundColor: theme.iconOn,
          padding: 20,
          borderRadius: 15,
          elevation: 1,
        }}>
          <View
            style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ margin: 20 }}>
              <Image source={categoryList[0]?.icon}
                     style={{ height: 50, width: 50, justifyContent: "center", alignItems: "baseline" }} />
            </View>
            <View style={{ flex: 1, marginLeft: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{categoryList[0]?.name}</Text>
              <Text style={{ fontSize: 16 }}>0 Items</Text>
            </View>
          </View>
          <View style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginLeft: 30,
            marginRight: 20,
          }}>
            {/*TODO: totalCost értéket írja ki*/}
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{totalCost}50 €</Text>
            <Text style={{ fontWeight: "500", fontSize: 14 }}>Total Budget: {categoryList[0]?.tBudget} €</Text>
          </View>
          <View style={{
            marginVertical: 10,
            marginLeft: 30,
            marginRight: 20,
            height: 15,
            backgroundColor: theme.navBarC,
            borderRadius: 99,
          }}>
            <View style={{
              width: percentageTotal + "25%",
              height: 15,
              backgroundColor: theme.selectedDate,
              borderRadius: 99,
            }}></View>
          </View>
        </View>
        {renderModal()}
        <View style={{
          marginTop: 10,
          marginHorizontal: 12,
          backgroundColor: theme.iconOn,
          height: 420,
          padding: 20,
          borderRadius: 15,
          elevation: 1,
        }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Item list</Text>
          <ScrollView style={{ marginTop: 10, marginRight: 10 }}>
            {itemList?.length > 0 ? itemList?.map((item, index) => (
                <View key={index}
                      style={{
                        marginBottom: 10,
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                        backgroundColor: theme.iconOnG,
                        padding: 18,
                        borderRadius: 15,
                      }}
                >
                  <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                  >
                    <View>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
                    </View>
                    <View style={{ end: -50 }}>
                      <Text style={{ fontSize: 17, fontWeight: "bold" }}>{item.cost} €</Text>
                    </View>
                  </View>
                </View>
              )) :
              <Text style={{ fontWeight: "bold", fontSize: 25, color: theme.button }}>No item found</Text>
            }
          </ScrollView>
        </View>
        <View style={{ position: "absolute", bottom: 10, right: 16 }}>
          <TouchableOpacity style={{ shadowOpacity: 1 }}
                            onPress={() => setModal(true)}
          >
            <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                             style={{
                               backgroundColor: theme.button,
                               borderRadius: 50,
                               padding: 10,
                             }}
            >
              <PlusIcon size={40} strokeWidth={1} color={theme.iconOn} />
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
