import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text, Modal, TextInput, ImageBackground } from "react-native";
import {
  ArrowLeftIcon, ArrowPathIcon,
  PlusIcon,
  StopIcon,
} from "react-native-heroicons/solid";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import PieChart from "react-native-pie-chart";
import * as Animatable from "react-native-animatable";
import SelectDropdown from "react-native-select-dropdown";
import Toast from "react-native-toast-message";
import { categoryList, itemList } from "../constants";
import ImagePicker from "react-native-image-crop-picker";

const categories = ["Travel", "Food", "Entertainment", "Other"];
const categoryColor = ["#98daca", "#539a88", "#aab2be", "#5e646b"];

export default function BudgetCalculatorScreen() {
  const navigation = useNavigation();
  const widthAndHeight = 180;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([theme.button]);
  const [modal, setModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState();
  const [totalBudget, setTotalBudget] = useState();
  const [totalEstimates, setTotalEstimates] = useState(0);
  const [selectIcon, setSelectIcon] = useState("");

  const saveCategory = async () => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Category created!!",
      visibilityTime: 5000,
    });
  };
  /*TODO: reset fgv megvalósítás*/
  const reset = () => {

  };

  const iconPicker = async () => {
    try {
      await ImagePicker.openPicker({
        height: 50,
        width: 50,
        cropping: true,
      }).then(image => {
        console.log(image, "image");
        setSelectIcon(image);
        Toast.show({
          type: "success",
          text1: "Uploaded icon!",
          visibilityTime: 5000,
        });
      });
    } catch (error) {
      console.log(error, "error");
    }
  };

  function renderModal() {
    return (
      <Modal visible={modal} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 15, width: "90%", height: 350, borderRadius: 10 }}>
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: "bold" }}>
              Add category's budget
            </Text>
            <View style={{ flex: 1, alignItems: "center", marginTop: 15 }}>
              <TouchableOpacity onPress={iconPicker}>
                <Image source={!selectIcon ? (require("../src/assets/airplane-mode.jpg")) : { uri: selectIcon?.path }}
                       style={{ height: 50, width: 50 }} />
              </TouchableOpacity>
              <Text>Click on the icon to select</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <SelectDropdown
                dropdownStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
                selectedRowStyle={{ backgroundColor: "white" }}
                selectedRowTextStyle={{ fontSize: 17, fontWeight: "800", color: theme.text }}
                buttonStyle={{ borderRadius: 30, backgroundColor: theme.searchInput, width: 250 }}
                buttonTextStyle={{ fontSize: 17, fontWeight: "800", color: theme.text }}
                rowTextStyle={{ fontSize: 15, fontWeight: "500", color: theme.text }}
                dropdownIconPosition="right"
                data={categories}
                defaultValueByIndex="0"
                onSelect={(selectedItem, index) => {
                  setSelectedTag(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                rowTextForSelection={(item, index) => item}
              />
            </View>
            <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 ml-0 mt-4">
              <TextInput placeholder="€ Total budget" keyboardType="numeric"
                         className="p-2 flex-1 font-semibold text-gray-700 ml-2"
                         onChangeText={(val) => setTotalBudget(val)}
              ></TextInput>
            </View>
            <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 130 }}>
              <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                style={{ backgroundColor: theme.iconOnG }}
                                onPress={() => saveCategory()}>
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

  const calculateTotalCost = (itemList) => {
    let totalCost = 0;
    itemList?.forEach(item => {
      totalCost = totalCost + item.cost;
    });
    return totalCost;
  };
  /*TODO: updatePieChart*/
  /*useEffect(() => {
    updatePieChart();
  }, []);
  const updatePieChart = () => {
    let totalEstimates = 0;
    setSliceColor([]);
    setValues([]);
    categoryList.forEach((item, index) => {
      let itemTotalCost = 0;
      item.itemList?.forEach((item_) => {
        itemTotalCost = itemTotalCost + item_.cost;
        totalEstimates = totalEstimates + item_.cost;
      })
      setTotalEstimates(totalEstimates);
      setSliceColor(sliceColor=> [...sliceColor, categoryColor[index]]);
      setValues(values => [...values, itemTotalCost])
    })
  }*/

  return (
    <View className="flex-1">
      <ImageBackground source={require("../src/assets/OBSKLD0.jpg")} resizeMode="cover"
                       style={{ flex: 1, justifyContent: "center" }}>
        <SafeAreaView className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 my-4"
            style={{ backgroundColor: theme.button }}>
            <ArrowLeftIcon size="25" color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, paddingTop: 25, paddingLeft: 70, fontWeight: "bold", color: "white" }}>Budget
            calculator</Text>
          <TouchableOpacity style={{ shadowOpacity: 1, end: -60, marginTop: 15 }}
                            onPress={() => reset()}
          >
            <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"}
                             duration={1000} style={{ backgroundColor: theme.button, borderRadius: 50, padding: 10 }}>
              <ArrowPathIcon size={25} color="white" strokeWidth={1} />
            </Animatable.View>
          </TouchableOpacity>
        </SafeAreaView>
        <View style={{
          marginHorizontal: 12,
          backgroundColor: theme.iconOn,
          padding: 20,
          borderRadius: 15,
          elevation: 1,
        }}
        >
          <Text style={{
            fontSize: 20,
          }}
          >Total Estimate: <Text style={{ fontWeight: "bold" }}>{totalEstimates} €</Text></Text>
          <View style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
            gap: 40,

          }}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={values}
              sliceColor={sliceColor}
              coverRadius={0.65}
              coverFill={theme.iconOn}
            />
            {categoryList?.length === 0 ? <View style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}>
                <StopIcon
                  size="26"
                  color={theme.iconOn}
                />
                <Text>NA</Text>
              </View>
              : <View>
                {categoryList?.map((category, index) => (
                  <View key={index} style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                  }}>
                    <StopIcon
                      size="26"
                      color={categoryColor[index]}
                    />
                    <Text>{category.name}</Text>
                  </View>
                ))}
              </View>}
          </View>
        </View>
        <View style={{ marginLeft: 30, padding: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Latest budget</Text>
        </View>
        <ScrollView style={{
          marginBottom: 80,
          marginHorizontal: 12,
        }}>
          {renderModal()}
          <View>
            {categoryList && categoryList?.map((category, index) => (
              <TouchableOpacity key={index}
                                style={{
                                  marginBottom: 10,
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: 10,
                                  alignItems: "center",
                                  backgroundColor: theme.iconOn,
                                  padding: 17,
                                  borderRadius: 15,
                                }}
                                onPress={() => navigation.navigate("CategoryDetail")}
              >
                <View style={{
                  justifyContent: "center",
                  alignItems: "baseline",
                }}>
                  <Image source={category.icon} style={{ height: 50, width: 50, padding: 15, marginBottom: 10 }} />
                </View>
                <View style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "80%",
                }}>
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{category.name}</Text>
                    <Text>{category?.length}0 Items</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>{calculateTotalCost(category?.itemList)} €</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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
      </ImageBackground>
    </View>
  );
}
