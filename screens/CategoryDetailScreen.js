import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text, ImageBackground } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { categoryList } from "../constants";
import EmptyList from "../components/emptyList";

export default function CategoryDetailScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [percentageTotal, setPercentageTotal] = useState(0);

  useEffect(() => {
    calculateTotalPercentage();
  }, []);
  const calculateTotalPercentage = () => {
    setPercentageTotal((item.value / item.tBudget) * 100);
  };

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
          marginTop: 15,
          marginHorizontal: 12,
          backgroundColor: theme.iconOn,
          padding: 20,
          borderRadius: 15,
          elevation: 1,
        }}>
          <View
            style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ margin: 20 }}>
              <Image source={item.icon}
                     style={{ height: 50, width: 50, justifyContent: "center", alignItems: "baseline" }} />
            </View>
            <View style={{ flex: 1, marginLeft: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
              <Text style={{ fontSize: 16 }}>{item.sum} Items</Text>
            </View>
          </View>
          <View style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginLeft: 30,
            marginRight: 20,
          }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.value} €</Text>
            <Text style={{ fontWeight: "500", fontSize: 14 }}>Total Budget: {item.tBudget} €</Text>
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
              width: percentageTotal + " %",
              height: 15,
              backgroundColor: theme.selectedDate,
              borderRadius: 99,
            }}></View>
          </View>
        </View>
        <View style={{
          marginTop: 30,
          marginHorizontal: 12,
          backgroundColor: theme.iconOn,
          height: 425,
          padding: 20,
          borderRadius: 15,
          elevation: 1,
        }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Item list</Text>
          <ScrollView style={{ marginTop: 10, marginRight: 10 }}>
            {item.itemList?.length > 0 ? item.itemList?.map((item, index) => (
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
                      <Text style={{ fontSize: 17, fontWeight: "bold" }}>{item.price} €</Text>
                    </View>
                  </View>
                </View>
              )) :
              <EmptyList />
            }
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}
