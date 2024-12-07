import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../App";
import { updateUser } from "../contollers/userContoller";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [pswVisible, setPswVisible] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const updateData = { ...user };
  const [appKey, setAppKey] = useState(0);

  const reloadApp = () => {
    setAppKey(prev => prev + 1);
  };

  useEffect(() => {
    reloadApp();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateUser(updateData);
      setUser({
        ...user,
        name: updateData.name,
        email: updateData.email,
      });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your data has been successfully saved!",
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

  return (
    <View key={appKey} className="flex-1 bg-white">
      <Image
        source={{ uri: `http://10.0.2.2:3000/userImg/cover/${user.userId}.jpg` }}
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
        <Text style={{ fontSize: 18, paddingTop: 30, paddingLeft: 100, fontWeight: "bold", color: "white" }}>Edit
          profile</Text>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-4"
            style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 190 }}>
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <Image
              source={{ uri: `http://10.0.2.2:3000/userImg/profile/${user.userId}.jpg` }}
              style={{
                width: 180,
                height: 180,
                borderRadius: 90,
                marginTop: -100,
                borderWidth: 3,
                borderColor: "white",
              }}
              className="justify-center mb-4" />
          </View>
        <ScrollView className="form space-y-2">
          <TextInput
            label="Full name"
            className="bg-gray-100 text-gray-700 rounded-2xl mb-3"
            autoCorrect={false}
            defaultValue={updateData.name}
            onChangeText={newName => updateData.name = newName}
          />
          <TextInput
            label="Email address"
            className="bg-gray-100 text-gray-700 rounded-2xl mb-3"
            autoCorrect={false}
            keyboardType={"email-address"}
            defaultValue={updateData.email}
            onChangeText={newEmail => updateData.email = newEmail}
          />
          <TextInput
            label="Current password"
            className="bg-gray-100 text-gray-700 rounded-2xl mb-3"
            secureTextEntry={pswVisible}
            autoCorrect={false}
            onChangeText={currentPassword => updateData.currentPassword = currentPassword}
            right={
              <TextInput.Icon
                icon={pswVisible ? "eye" : "eye-off"}
                onPress={() => setPswVisible(!pswVisible)}
              />
            }
          />
          <TextInput
            label="New password"
            className="bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry={pswVisible}
            autoCorrect={false}
            onChangeText={newPassword => updateData.newPassword = newPassword}
            right={
              <TextInput.Icon
                icon={pswVisible ? "eye" : "eye-off"}
                onPress={() => setPswVisible(!pswVisible)}
              />
            }
          />
          <View style={{ paddingVertical: 20 }}>
            <TouchableOpacity className="py-3 rounded-full" style={{ backgroundColor: theme.button }}
                              onPress={handleUpdate}>
              <Text className="font-xl font-bold text-center text-white">Save data</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
