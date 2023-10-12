import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config";

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pswVisible, setPswVisible] = useState(true);

    const resetPassword = () => {
        if (email != null) {
            sendPasswordResetEmail(auth, email)
              .then(() => {
                  alert("Password reset email has been sent successfully!");
              })
              .catch((error) => {
                  const errorMessage = error.message;
                  alert(errorMessage);
              });
        } else {
            alert("Please enter a valid Email address");
        }
    };

    const handleSubmit = async () => {
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (err) {
                console.log("got error: ", err.message);
            }
        }
    };

    return (
      <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
          <SafeAreaView className="flex">
              <View className="flex-row justify-start">
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4"
                    style={{ backgroundColor: theme.button }}>
                      <ArrowLeftIcon size="20" color="white" />
                  </TouchableOpacity>
              </View>
              <View className="flex-row justify-center">
                  <Image source={require("../src/assets/login.png")}
                         style={{ width: 380, height: 280 }} />
              </View>
          </SafeAreaView>
          <ScrollView className="flex-1 bg-white px-8 pt-4"
                      style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}>
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
                  <TextInput className="bg-gray-100 text-gray-700 rounded-2xl"
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
                  <TouchableOpacity className="flex items-end mb-5"
                                    onPress={() => resetPassword()}>
                      <Text className="text-gray-700">Forgot Password?</Text>
                  </TouchableOpacity>
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
