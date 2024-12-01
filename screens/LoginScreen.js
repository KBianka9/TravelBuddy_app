import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { login } from "../contollers/userContoller";
import axios from "axios";
import { UserContext } from "../App";
import storage from "../storage/storage";
import Toast from "react-native-toast-message";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pswVisible, setPswVisible] = useState(true);
  const { setUser, user } = useContext(UserContext);

    const handleSubmit = async () => {
      try {
        const loginResponse = await login(email, password);
        if (loginResponse.data !== null) {
          setUser(loginResponse.data);
          await storage.save({
            key: "user",
            data: {
              user: loginResponse.data,
            },
          });
          Toast.show({
            type: "success",
            text1: "Welcome!",
            visibilityTime: 5000,
          });
          navigation.navigate("PlaceSearcher");
        }
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
      <View className="flex-1 bg-white">
        <Image source={require("../src/assets/login.jpg")}
               style={{ height: 310 }}
               className="w-full absolute"
        />
        <SafeAreaView className="flex-row justify-between items-center mr-2 mt-3">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            style={{ backgroundColor: theme.button }}>
            <ArrowLeftIcon size="25" color="white" />
          </TouchableOpacity>
        </SafeAreaView>
        <ScrollView className="flex-1 bg-white px-8 pt-4"
                    style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 225 }}>
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email address</Text>
            <TextInput
              className="bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={email}
              onChangeText={value => setEmail(value)}
              keyboardType={"email-address"}
              placeholder="Enter your Email address"
              require={true}
            />
                  <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput className="bg-gray-100 text-gray-700 rounded-2xl mb-7"
                             secureTextEntry={pswVisible}
                             autoCorrect={false}
                             value={password}
                             onChangeText={value => setPassword(value)}
                             placeholder="Enter your Password"
                             right={
                                 <TextInput.Icon
                                   icon={pswVisible ? "eye" : "eye-off"}
                                   onPress={() => setPswVisible(!pswVisible)}
                                 />
                             }
                  />
                  <TouchableOpacity className="py-3 rounded-xl"
                                    style={{ backgroundColor: theme.button }}
                                    onPress={handleSubmit}>
                      <Text className="font-xl font-bold text-center text-white">Login</Text>
                  </TouchableOpacity>
              </View>
              <View className="flex-row justify-center my-10 p-3">
                  <Text className="text-black font-semibold">Don't have an account?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                      <Text className="font-semibold" style={{ color: theme.iconOnG }}> Sign up</Text>
                  </TouchableOpacity>
              </View>
          </ScrollView>
      </View>
    );
}
