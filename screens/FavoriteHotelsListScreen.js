import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
import OptionsMenu from "react-native-options-menu";
import EmptyList from "../components/emptyList";
import { completedHotel, listByFav, unFavoriteHotel } from "../contollers/accommodationContoller";
import Toast from "react-native-toast-message";
import { UserContext } from "../App";

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
  const [currentList, setCurrentList] = useState([]);
  const [status, setStatus] = useState("All");
  const [favItem, setFavItem] = useState([]);
  const { user } = useContext(UserContext);
  const [appKey, setAppKey] = useState(0);

  const reloadApp = () => {
    setAppKey(prev => prev + 1);
  };

  useEffect(() => {
    loadFavorites();
    reloadApp();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await listByFav(user.userId);
      setFavItem(response.data);
      console.log(response.data);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };

  useEffect(() => {
    setStatusFilter(status);
  }, [favItem]);

  const setStatusFilter = (newStatus) => {
    if (newStatus === "All") {
      setCurrentList([...favItem]);
    } else {
      const isCompleted = newStatus === "checked";
      setCurrentList([...favItem.filter(item => item.completed === isCompleted)]);
    }
    setStatus(newStatus);
  };

  const handleFavHotelRemove = async (itemId) => {
    try {
      await unFavoriteHotel(itemId, user.userId);
      await loadFavorites();
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "You can removed the hotel from the favorite list!",
        visibilityTime: 5000,
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "You can't delete this item from your favorite hotel list.",
        visibilityTime: 5000,
      });
    }
  };
  const checkBox = async (item) => {
    try {
      await completedHotel(item.accommodationId, user.userId, !item.completed);
      await loadFavorites();
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "You can't check the box!",
        visibilityTime: 5000,
      });
    }
  };

  const addTrip = () => {
    navigation.navigate("AddTrip");
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{ borderBottomWidth: 1, borderColor: theme.button, paddingVertical: 20 }}>
        <CheckBox isChecked={item.completed}
                  onClick={() => checkBox(item)}
                  checkedCheckBoxColor={theme.iconOnG}
                  uncheckedCheckBoxColor={theme.iconOff}
                  leftText={item.accommodation.name}
                  leftTextStyle={{
                    marginLeft: 10,
                    color: item.completed ? theme.iconOnG : theme.iconOff,
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                  style={{ paddingRight: 40 }}
        />
        <OptionsMenu
          button={require("../src/assets/three-dots.jpg")}
          buttonStyle={{ width: 32, height: 17, resizeMode: "contain", marginTop: -20, marginLeft: 290 }}
          destructiveIndex={1}
          options={["Plan trip", "Delete", "Cancel"]}
          actions={[addTrip, () => handleFavHotelRemove(item.accommodationId), null]}
        />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingBottom: -20 }} key={appKey}>
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
      <ScrollView className="flex-1 bg-white px-8"
                  style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 225, marginBottom: 1 }}>
        <View style={{ marginTop: 15 }}>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
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
            data={currentList}
            ListEmptyComponent={<EmptyList />}
            keyExtractor={(e) => e.accommodationId + e.completed.toString()}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>
    </View>
  );
}
