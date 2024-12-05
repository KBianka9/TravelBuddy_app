import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  FlatList,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { ArrowLeftIcon, PlusIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
import EmptyList from "../components/emptyList";
import { addItem, completedItem, listItems, removeItem } from "../contollers/bucketListController";
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

export default function BucketListScreen() {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState("All");
  const [bucketList, setBucketList] = useState([]);
  const [bucketItem, setBucketItem] = useState([]);
  const [spectacle, setSpectacle] = useState("");
  const { user } = useContext(UserContext);
  const [appKey, setAppKey] = useState(0);

  const reloadApp = () => {
    setAppKey(prev => prev + 1);
  };

  useEffect(() => {
    loadItems();
    reloadApp();
  }, []);

  useEffect(() => {
    setStatusFilter(status);
  }, [bucketItem]);

  const setStatusFilter = (newStatus) => {
    if (newStatus === "All") {
      setBucketList([...bucketItem]);
    } else {
      const isCompleted = newStatus === "checked";
      setBucketList([...bucketItem.filter(item => item.completed === isCompleted)]);
    }
    setStatus(newStatus);
  };
  const loadItems = async () => {
    try {
      const response = await listItems(user.userId);
      setBucketItem(response.data);
      console.log(bucketItem);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };

  const showAlert = () =>
    Alert.alert(
      "Delete bucket item",
      "Are you sure you want to delete it?",
      [
        {
          text: "Yes",
          onPress: () => deleteBucketItem(),
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
    );
  /*TODO: elem törlése*/
  const deleteBucketItem = async (itemId) => {
    try {
      await removeItem(itemId, user.userId);
      await loadItems();
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "You can removed the item from the list!",
        visibilityTime: 5000,
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "You can't delete this item from the list!",
        visibilityTime: 5000,
      });
    }
  };
  /*TODO: checkbox nem működik*/
  const checkBoxBucket = async (item) => {
    try {
      await completedItem(item.bucketListId, user.userId, item.spectacleId, !item.completed);
      await loadItems();
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "You can't check the box!",
        visibilityTime: 5000,
      });
    }
  };
  /*TODO: új elem hozzáadása*/
  const saveNewItem = async () => {
    try {
      await addItem(spectacle);
      await loadItems();
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "You can save the new item!",
        visibilityTime: 5000,
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "You can't save the new item!",
        visibilityTime: 5000,
      });
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{
        flexDirection: "column",
        borderBottomWidth: 1,
        borderColor: theme.button,
        paddingBottom: 15,
        paddingTop: 20,
      }}>
        <CheckBox isChecked={item.completed}
                  onClick={() => checkBoxBucket(item)}
                  checkedCheckBoxColor={theme.iconOnG}
                  uncheckedCheckBoxColor={theme.iconOff}
                  leftText={item.spectacle.name}
                  leftTextStyle={{
                    marginLeft: 20,
                    color: item.completed ? theme.iconOnG : theme.iconOff,
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                  rightTextView={
                    <TouchableOpacity onPress={showAlert}>
                      <Image source={require("../src/assets/bin.jpg")}
                             style={{ width: 35, height: 25, resizeMode: "contain", marginLeft: 5 }} />
                    </TouchableOpacity>
                  }
        />
      </View>
    );
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
                         className="p-2 flex-1 font-semibold text-gray-700 ml-2"
                         value={spectacle}
                         onChangeText={value => setSpectacle(value)}
                         require={true}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 130 }}>
              <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                style={{ backgroundColor: theme.iconOnG }}
                                onPress={saveNewItem}>
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
    <View className="flex-1 bg-white" key={appKey}>
      <Image
        source={require("../src/assets/MapChart_Map.jpg")}
        style={{ height: 390, width: 400 }}
        className="absolute"
      />
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
                               marginTop: -60,
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
        <View style={{ flexDirection: "row", marginTop: 15 }}>
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
        <ScrollView>
          <FlatList
            data={bucketList}
            ListEmptyComponent={
              <View>
                <EmptyList />
              </View>
            }
            keyExtractor={(e, i) => e.bucketListId + e.completed.toString()}
            renderItem={renderItem}
          />
        </ScrollView>
        <View style={{ paddingTop: 5, marginBottom: -15 }}>
          <TouchableOpacity className="py-3 rounded-full mb-5 mx-4" style={{ backgroundColor: theme.button }}
                            onPress={() => Linking.openURL("https://www.mapchart.net/world.html")}>
            <Text className="font-xl font-bold text-center text-white">Show as map</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
