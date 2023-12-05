import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../App";
import { updateUser } from "../contollers/userContoller";
import ImagePicker from "react-native-image-picker";
import axios from "axios";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [pswVisible, setPswVisible] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [imageUri, setImageUri] = useState(null);
  const updateData = { ...user };

  const selectImage = () => {
    const options = {
      title: "Select Image",
      cancelButtonTitle: "Cancel",
      takePhotoButtonTitle: "Take Photo",
      chooseFromLibraryButtonTitle: "Choose from Library",
      mediaType: "photo",
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 600,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };
        setImageUri(source.uri);
        uploadImage(response);
      }
    });
  };

  const uploadImage = async (imageData) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.fileName,
      });

      const response = await axios.post("/userPhoto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUser(updateData);
      setUser({
        ...user,
        name: updateData.name,
        email: updateData.email,
      });
      alert("Your data has been successfully saved!");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response.data.error);
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
      <TouchableOpacity>
        <Image source={require("../src/assets/view-toward-sky-forest.jpg")}
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
        <TouchableOpacity onPress={selectImage}>
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <Image source={require("../src/assets/corgi.webp")}
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
        <ScrollView className="form space-y-2 mt-4">
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
            className="bg-gray-100 text-gray-700 rounded-2xl mb-3"
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
