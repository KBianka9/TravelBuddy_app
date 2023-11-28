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

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pswVisible, setPswVisible] = useState(true);
  const [confPassword, setConfPassword] = useState("");
  const { user } = useContext(UserContext);

  const handleUpdate = async () => {
    try {
      await updateUser(user);
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
        <TouchableOpacity onPress={() => {
        }}>
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
            value={user.name}
            onChangeText={value => setName(value)}
          />
          <TextInput
            label="Email address"
            className="bg-gray-100 text-gray-700 rounded-2xl mb-3"
            autoCorrect={false}
            value={user.email}
            onChangeText={value => setEmail(value)}
            keyboardType={"email-address"}
          />
          <TextInput
            label="Current password"
            className="bg-gray-100 text-gray-700 rounded-2xl mb-3"
            secureTextEntry={pswVisible}
            autoCorrect={false}
            value={user.password}
            onChangeText={value => setPassword(value)}
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
            value={user.password}
            onChangeText={value => setConfPassword(value)}
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
