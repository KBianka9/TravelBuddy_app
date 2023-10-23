import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
import OptionsMenu from "react-native-options-menu";

export default function FavoriteHotelsListScreen() {
  const navigation = useNavigation();
  /*const favHotels = [
    {
      id: 1,
      hotel: "Honolulu Hotel",
      country: "Hawaii",
      checked: true
    },
    {
      id: 2,
      hotel: "Raha Hotel",
      country: "Indonesia",
      checked: true
    },
    {
      id: 3,
      hotel: "Inu Hotel",
      country: "Philippines",
      checked: false
    },
    {
      id: 4,
      hotel: "Pizza Hotel",
      country: "Italy",
      checked: false
    },
    {
      id: 5,
      hotel: "Inka Hotel",
      country: "Peru",
      checked: true
    }
  ]*/

  const [isChecked, setChecked] = useState({
    Hawaii: false,
    Indonesia: true,
    Philippines: false,
    Italy: false,
    Peru: true,
  });
  const [favHotelList, setFavHotelList] = useState([{ favHotel: "" }, { favHotel: "" }, { favHotel: "" }, { favHotel: "" }]);

  const handleFavHotelRemove = (index) => {
    const list = [...favHotelList];
    list.splice(index, 1);
    setFavHotelList(list);
  };

  const addTrip = () => {
    navigation.navigate("AddTrip");
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
      <Image source={require("../src/assets/favhotel.jpg")}
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
        <Text style={{ fontSize: 18, paddingTop: 20, paddingLeft: 70, fontWeight: "bold" }}>Favorite hotel list</Text>
      </SafeAreaView>
      <ScrollView className="flex-1 bg-white px-8 pt-4"
                  style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 225 }}>
        <View style={{ marginTop: 15 }}>
          <View style={{ flexDirection: "row", marginBottom: 25 }}>
            <TouchableOpacity className="ml-2">
              <Text style={{
                backgroundColor: theme.background,
                borderRadius: 25,
                paddingHorizontal: 15,
                paddingVertical: 8,
                fontWeight: "bold",
              }}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity className="ml-4">
              <Text style={{
                backgroundColor: theme.background,
                borderRadius: 25,
                paddingHorizontal: 15,
                paddingVertical: 8,
                fontWeight: "bold",
              }}>checked</Text>
            </TouchableOpacity>
            <TouchableOpacity className="ml-4">
              <Text style={{
                backgroundColor: theme.background,
                borderRadius: 25,
                paddingHorizontal: 15,
                paddingVertical: 8,
                fontWeight: "bold",
              }}>unchecked</Text>
            </TouchableOpacity>
          </View>
          {favHotelList.map((singleFavHotel, index) => (
            <View style={{ borderBottomWidth: 1, borderColor: theme.button, paddingBottom: 15, marginBottom: 15 }}
                  key={index}>
              <CheckBox isChecked={isChecked.Hawaii}
                        onClick={() => setChecked({ ...isChecked, Hawaii: !isChecked.Hawaii })}
                        checkedCheckBoxColor={theme.iconOnG}
                        uncheckedCheckBoxColor={theme.iconOff}
                        leftText="Hawaii, Honolulu Hotel"
                        leftTextStyle={{
                          marginLeft: 30,
                          color: isChecked.Hawaii ? theme.iconOnG : theme.iconOff,
                          fontSize: 17,
                          fontWeight: "bold",
                        }}
                        style={{ paddingRight: 40 }}
              />
              <OptionsMenu
                button={require("../src/assets/three-dots.png")}
                buttonStyle={{ width: 32, height: 17, resizeMode: "contain", marginTop: -20, marginLeft: 290 }}
                destructiveIndex={1}
                options={["Plan trip", "Delete", "Cancel"]}
                actions={[addTrip, handleFavHotelRemove, null]}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
