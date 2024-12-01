import React, { useContext, useEffect, useMemo, useState } from "react";
import { FlatList, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import OptionsMenu from "react-native-options-menu";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { UserContext } from "../../App";
import RadioGroup from "react-native-radio-buttons-group";
import SearchableDropDown from "react-native-searchable-dropdown";
import { deleteUser, list, listByName, roleUser, searchByName } from "../../contollers/userContoller";
import Toast from "react-native-toast-message";
import { userListItem } from "../../constants";
import axios from "axios";

export default function UsersScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const updateData = { ...user };
  if (user.role !== "ADMIN") {
    navigation.navigate("PlaceSearcher");
    return;
  }
  const [modal, setModal] = useState(false);
  const [selectedRadioButton, setSelectedRadioButton] = useState();
  const [username, setUsername] = useState(null);
  const [usernameList, setUsernameList] = useState(null);
  const [users, setUsers] = useState([]);
  const [appKey, setAppKey] = useState(0);

  const reloadApp = () => {
    setAppKey(prev => prev + 1);
  };

  useEffect(() => {
    setUsernameList(getDropDownUsernames());
    loadUsers();
    reloadApp();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await list();
      setUsers(response.data);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };

  const handleSubmit = async () => {
    if (username === null) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Username is missing!",
        visibilityTime: 5000,
      });
    }
    try {
      const response = await searchByName(username.name);
      const usernameList = response.data;
      console.log(usernameList);
      if (usernameList.length === 0) {
        Toast.show({
          type: "error",
          text1: "Sorry",
          text2: "But we couldn't find user in this list based on the selected value!",
          visibilityTime: 5000,
        });
      } else {
        setUsers(usernameList);
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };
  /*TODO: felhasználó törlése*/
  const removeUserAccount = async (item) => {
    deleteUser(item.userId).then(async () => {
      Toast.show({
        type: "success",
        text1: "User deleted successfully",
        visibilityTime: 3000,
      });
      await loadUsers();
    }).catch((err) => {
      if (axios.isAxiosError(err)) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.response.data.error,
          visibilityTime: 5000,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.message,
          visibilityTime: 5000,
        });
      }
    });
  };

  const getDropDownUsernames = () => {
    return [...new Set(userListItem.map(user => user.name))].map((name, index) => ({
      id: index,
      name: name,
    }));
  };

  const radioButtons = useMemo(() => ([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Admin",
      value: "ADMIN",
    },
    {
      id: "2",
      label: "User",
      value: "USER",
    },
  ]), []);

  const editMode = () => {
    setModal(true);
  };

  /*TODO: felhasználó jogosultságának módosítása*/
  const saveRole = async () => {
    try {
      await roleUser(updateData);
      setUser({
        ...user,
        role: updateData.role,
      });
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Role has been successfully saved!",
        visibilityTime: 5000,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.response.data.error,
          visibilityTime: 5000,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.message,
          visibilityTime: 5000,
        });
      }
    }
  };

  function renderModal() {
    return (
      <Modal visible={modal} animationType="slide" transparent={true}
             style={{
               margin: 20,
               backgroundColor: "white",
               borderRadius: 20,
               padding: 35,
               alignItems: "center",
               shadowColor: "#000",
               shadowOffset: {
                 width: 0,
                 height: 2,
               },
               shadowOpacity: 0.25,
               shadowRadius: 4,
               elevation: 5,
             }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 15, width: "90%", height: 450, borderRadius: 10 }}>
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: "bold" }}>Edit user's data</Text>
            <Image source={{ uri: `http://10.0.2.2:3000/userImg/profile/${users.userId}.jpg` }}
                   style={{ height: 70, width: 70, borderRadius: 90, alignSelf: "center", marginBottom: 10 }}
            />
            {/*TODO: miért nem írja ki e labeleket?, id nem jelenik meg*/}
            <View className="form space-y-2">
              <TextInput
                label="User Id"
                className="bg-gray-100 text-gray-700 rounded-2xl mb-3"
                defaultValue={users.userId}
                editable={false}
                selectTextOnFocus={false}
              />
              <TextInput
                label="Full name"
                className="bg-gray-100 text-gray-700 rounded-2xl mb-3"
                defaultValue={users.name}
                editable={false}
                selectTextOnFocus={false}
              />
              <TextInput
                label="Email address"
                className="bg-gray-100 text-gray-700 rounded-2xl mb-3"
                defaultValue={users.email}
                editable={false}
                selectTextOnFocus={false}
              />
              <RadioGroup
                label="Role"
                defaultValue={users.role}
                radioButtons={radioButtons}
                onPress={setSelectedRadioButton}
                selectedId={selectedRadioButton}
                layout="row"
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 130 }}>
              <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                style={{ backgroundColor: theme.iconOnG }}
                                onPress={() => saveRole}>
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

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} className="flex-row gap-x-4 items-center"
            style={{ borderBottomWidth: 1, borderColor: theme.button, paddingVertical: 15 }}>
        <Image source={{ uri: `http://10.0.2.2:3000/userImg/profile/${item.userId}.jpg` }}
               style={{ height: 70, width: 70, borderRadius: 90 }}
        />
        <View style={{ flexDirection: "column", width: 200 }}>
          <Text className="font-bold">{item.name}</Text>
          <Text className="font-bold">{item.email}</Text>
          <Text>Id: {item.userId}</Text>
          <Text>{item.role}</Text>
        </View>
        <OptionsMenu
          button={require("../../src/assets/three-dots.jpg")}
          buttonStyle={{ width: 32, height: 20, resizeMode: "contain", marginTop: 10, marginLeft: 10 }}
          destructiveIndex={1}
          options={["Edit", "Delete", "Cancel"]}
          actions={[editMode, () => removeUserAccount(item.userId), null]}
        />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white" keyboardShouldPersistTaps={"handled"} key={appKey}>
      <Image source={require("../../src/assets/users.jpg")}
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
      <View className="flex-1 bg-white"
            style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 180 }}>
        <View className="flex-row px-2 pt-4">
          {renderModal()}
          {/*User searcher*/}
          <View className="flex-row justify-center items-center mx-4">
            <SearchableDropDown
              onItemSelect={(item) => {
                setUsername(item);
              }}
              containerStyle={{
                padding: 5,
                paddingLeft: 10,
                backgroundColor: "#e3e5e9",
                borderRadius: 30,
                width: 280,
              }}
              itemStyle={{
                paddingVertical: 10,
                paddingLeft: 20,
                marginTop: 10,
                backgroundColor: "#f8f9fa",
                borderRadius: 30,
              }}
              itemTextStyle={{ color: "#222", fontWeight: "bold" }}
              itemsContainerStyle={{ maxHeight: 150 }}
              items={usernameList}
              resetValue={false}
              textInputProps={
                {
                  underlineColorAndroid: "transparent",
                  value: username ? username.name : "Search user by name",
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
            />
            <TouchableOpacity className="rounded-full p-3 mr-2"
                              style={{ backgroundColor: theme.button, end: -15 }}
                              onPress={handleSubmit}
            >
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"></MagnifyingGlassIcon>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{ marginTop: 10 }} className="px-8">
          <View>
            {/*TODO: nem listázza ki a kiválasztott elemet*/}
            <FlatList
              data={users}
              keyExtractor={(e, i) => e.userId}
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
