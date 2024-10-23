import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
import OptionsMenu from "react-native-options-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hotelItems } from "../constants";

const favHotels = [
  {
    id: 1,
    hotel: "Honolulu Hotel",
    country: "Hawaii",
    status: "checked",
    checked: true,
  },
  {
    id: 2,
    hotel: "Raha Hotel",
    country: "Indonesia",
    status: "checked",
    checked: true,
  },
  {
    id: 3,
    hotel: "Inu Hotel",
    country: "Philippines",
    status: "unchecked",
    checked: false,
  },
  {
    id: 4,
    hotel: "Pizza Hotel",
    country: "Italy",
    status: "unchecked",
    checked: false,
  },
  {
    id: 5,
    hotel: "Inka Hotel",
    country: "Peru",
    status: "checked",
    checked: true,
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

export default function FavoriteHotelsListScreen() {

  const navigation = useNavigation();
  const [favHotelList, setFavHotelList] = useState(favHotels);
  const [status, setStatus] = useState("All");
  const [favItem, setFavItem] = useState([]);

  const setStatusFilter = (status) => {
    if (status !== "All") {
      setFavHotelList([...favHotels.filter(e => e.status === status)]);
    } else {
      setFavHotelList(favHotels);
    }
    setStatus(status);
  };

  const handleFavHotelRemove = (index) => {
    const list = [...favHotelList];
    list.splice(index, 1);
    setFavHotelList(list);
  };

  const addTrip = () => {
    navigation.navigate("AddTrip");
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{ borderBottomWidth: 1, borderColor: theme.button, paddingBottom: 15, paddingTop: 20 }}>
        <CheckBox isChecked={favHotelList.checked}
                  onClick={() => setFavHotelList({ ...favHotelList, checked: !favHotelList.checked })}
                  checkedCheckBoxColor={theme.iconOnG}
                  uncheckedCheckBoxColor={theme.iconOff}
                  leftText={item.hotel}
                  leftTextStyle={{
                    marginLeft: 30,
                    color: favHotelList.checked ? theme.iconOnG : theme.iconOff,
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
    );
  };
  /*TODO: kedvencnek jelölt hotelek listázása*/
  /*useEffect(() => {
    fetchFavoriteHotel();
  }, []);

  const fetchFavoriteHotel = async () => {
    await AsyncStorage.getItem("favorite").then((token) => {
      const res = JSON.parse(token);
      let items = [];
      if (res){
        //console.log("Favorite hotel result: ", res);
        res.forEach((element) => {
          let data = hotelItems.find((val) => val.id === element);
          items.push(data);
        });
        setFavItem(items);
      }else {
        setFavItem([]);
      }
    })
  }*/

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
          <ArrowLeftIcon size="25" color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, paddingTop: 25, paddingLeft: 70, fontWeight: "bold" }}>Favorite hotel list</Text>
      </SafeAreaView>
      <ScrollView className="flex-1 bg-white px-8 pt-4"
                  style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 225 }}>
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
          </View>
          <FlatList
            data={favHotelList}
            keyExtractor={(e, i) => i.toString()}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>
    </View>
  );
}
