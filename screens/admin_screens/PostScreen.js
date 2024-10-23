import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import SelectDropdown from "react-native-select-dropdown";
import { reviewItems } from "../../constants";
import OptionsMenu from "react-native-options-menu";
import { UserContext } from "../../App";
import { useNavigation } from "@react-navigation/native";
import EditPostScreen from "./EditPostScreen";

const type = ["id", "name"];

export default function PostScreen() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  if (user.role !== "ADMIN") {
    navigation.navigate("PlaceSearcher");
    return;
  }
  /*TODO: post delete*/
  const deletePost = () => {

  }
  /*TODO: report értéke true, akkor jelenjen meg*/
  const renderItem = ({ item, index }) => {
    return (
      <View key={index} className="flex-row gap-x-3 items-center"
            style={{ borderBottomWidth: 1, borderColor: theme.button, paddingVertical: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Image source={item.profilePic}
                 style={{ height: 70, width: 70, borderRadius: 90, marginRight: 10 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text className="font-bold">{item.user}</Text>
            <Text className="font-bold">{item.email}</Text>
            <Text>Id: {item.reviewId}</Text>
            <Text> {item.postDate}</Text>
            <Text className="font-bold">{item.cityCountry}</Text>
            <Text></Text>
            <Text style={{ width: 200 }}>{item.text}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Image source={require("../../src/assets/report.png")} style={{ height: 35, width: 35, marginTop: -130 }} />
          <OptionsMenu
            button={require("../../src/assets/three-dots.png")}
            buttonStyle={{ width: 32, height: 20, resizeMode: "contain", marginTop: 90 }}

            destructiveIndex={1}
            options={["Edit", "Delete", "Cancel"]}
            actions={[EditPostScreen, deletePost, null]}
          />
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
      <Image source={require("../../src/assets/review.jpg")}
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
              data={reviewItems}
              keyExtractor={(e, i) => i.toString()}
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
