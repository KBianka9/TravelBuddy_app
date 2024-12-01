import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text, ImageBackground, FlatList } from "react-native";
import { ArrowLeftIcon, ArrowPathIcon, StopIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import PieChart from "react-native-pie-chart";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
import { categoryList } from "../constants";
import EmptyList from "../components/emptyList";

const catValues = ["650", "405", "205", "2030"];
const categoryColor = ["#98daca", "#539a88", "#aab2be", "#5e646b"];

export default function BudgetCalculatorScreen() {
  const navigation = useNavigation();
  const widthAndHeight = 180;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([theme.button]);
  const [totalEstimates, setTotalEstimates] = useState(3290);

  const reset = () => {
    Toast.show({
      type: "info",
      text1: "Sorry",
      text2: "But this function doesn't work!",
      visibilityTime: 5000,
    });
  };

  useEffect(() => {
    updatePieChart();
  }, []);
  const updatePieChart = () => {
    setSliceColor(categoryColor);
    setValues(catValues);
  };

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
        }}>
          <Text style={{ fontSize: 20 }}>Total Estimate:
            <Text style={{ fontWeight: "bold" }}> {totalEstimates} €</Text>
          </Text>
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
            <View>
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
            </View>
          </View>
        </View>
        <View style={{ marginLeft: 30, padding: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Latest budget</Text>
        </View>
        <View style={{ marginHorizontal: 12 }}>
          <FlatList data={categoryList}
                    keyExtractor={(e, i) => i.toString()}
                    className="mx-1"
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => navigation.navigate("CategoryDetail", { ...item })}
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
                        >
                          <View style={{
                            justifyContent: "center",
                            alignItems: "baseline",
                          }}>
                            <Image source={item.icon}
                                   style={{ height: 45, width: 45, padding: 15, marginBottom: 10 }} />
                          </View>
                          <View style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "80%",
                          }}>
                            <View>
                              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
                              <Text>{item.sum} Items</Text>
                            </View>
                            <View>
                              <Text style={{ fontSize: 17, fontWeight: "bold" }}>{item.tBudget} €</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
