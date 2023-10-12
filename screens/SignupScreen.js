import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

export default function SignupScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pswVisible, setPswVisible] = useState(true);
    const [confPassword, setConfPassword] = useState("");

    const handleSubmit = async () => {
        if (email && password === confPassword) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (err) {
                console.log("got error: ", err.message);
            }
        } else {
            alert("Email address incorrect or Password not equal Password again");
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
                  <Image source={require("../src/assets/signup.png")}
                         style={{ width: 380, height: 330 }} />
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
                  <Text className="text-gray-700 ml-4">Confirm password</Text>
                  <TextInput
                    className="bg-gray-100 text-gray-700 rounded-2xl mb-7"
                    secureTextEntry={pswVisible}
                    autoCorrect={false}
                    value={confPassword}
                    onChangeText={value => setConfPassword(value)}
                    placeholder="Enter your Password again"
                    right={
                        <TextInput.Icon
                          icon={pswVisible ? "eye" : "eye-off"}
                          onPress={() => setPswVisible(!pswVisible)}
                        />
                    }
                  />
                  <TouchableOpacity className="py-3 rounded-xl" style={{ backgroundColor: theme.button }}
                                    onPress={handleSubmit}
                  >
                      <Text className="font-xl font-bold text-center text-white">Sign up</Text>
                  </TouchableOpacity>
              </View>
              <View className="flex-row justify-center my-10 p-3">
                  <Text className="text-black font-semibold mb-2">Already have an account?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                      <Text className="font-semibold" style={{ color: theme.iconOnG }}> Login</Text>
                  </TouchableOpacity>
              </View>
          </ScrollView>
      </View>
    );
}
