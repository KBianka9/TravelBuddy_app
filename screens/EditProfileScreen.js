import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../App";
import { updateUser } from "../contollers/userContoller";
import axios from "axios";
import ImagePicker from "react-native-image-crop-picker";
import Toast from "react-native-toast-message";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [pswVisible, setPswVisible] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const updateData = { ...user };
  const [selectProfileImage, setSelectProfileImage] = useState("");
  const [selectCoverImage, setSelectCoverImage] = useState("");

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
        text1: "Your data has been successfully saved!",
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

  const ProfileImagePicker = async () => {
    try {
      await ImagePicker.openPicker({
        width: 180,
        height: 180,
        cropping: true,
        cropperCircleOverlay: true,
      }).then(image => {
        console.log(image, "image");
        setSelectProfileImage(image);
      });
    } catch (error) {
      console.log(error, "error");
    }
  };
  const CoverImagePicker = async () => {
    try {
      await ImagePicker.openPicker({
        height: 310,
        cropping: true,
      }).then(image => {
        console.log(image, "image");
        setSelectCoverImage(image);
      });
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
      <TouchableOpacity onPress={() => CoverImagePicker()}>
        <Image
          source={!selectCoverImage ? (require("../src/assets/view-toward-sky-forest.jpg")) : { uri: selectCoverImage?.path }}
          style={{ height: 310 }}
          className="w-full absolute"
        />
      </TouchableOpacity>
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
      {/*Change profile picture, full name, email address, password*/}
      <View className="flex-1 bg-white px-8 pt-4"
            style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 190 }}>
        <TouchableOpacity onPress={() => ProfileImagePicker()}>
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <Image
              source={!selectProfileImage ? (require("../src/assets/profile.png")) : { uri: selectProfileImage?.path }}
              style={{
                width: 180,
                height: 180,
                borderRadius: 90,
                marginTop: -100,
                borderWidth: 3,
                borderColor: "white",
              }}
              className="justify-center" />
          </View>
        </TouchableOpacity>
        <Text style={{ paddingTop: 10, marginHorizontal: -16, marginBottom: 10 }}>You can change profile and cover
          image, if you click on it.</Text>
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
            defaultValue={updateData.email}
            onChangeText={newEmail => updateData.email = newEmail}
            keyboardType={"email-address"}
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
