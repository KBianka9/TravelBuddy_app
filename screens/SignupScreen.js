import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebase } from "../config";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    email: Yup.string()
      .email("Provide a valid email")
      .required("Required"),
});

export default function SignupScreen() {
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [obsecureText, setObsecureText] = useState(false);

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
              <View className="flex-1 p-20">
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(value) => {
                        console.log(value);
                    }}
                  >
                      {({
                            handleChange,
                            touched,
                            values,
                            errors,
                            isValid,
                            setFieldTouched,
                        }) => (
                        <View>
                            <View style={{ marginBottom: 20 }}>
                                <Text className="text-gray-700 ml-4 mb-5">Email address</Text>
                                <View>
                                    <View style={{
                                        borderColor: theme.iconOnG, backgroundColor: theme.iconOn,
                                        borderWidth: 1, height: 50, borderRadius: 12,
                                        flexDirection: "row", paddingHorizontal: 15, alignItems: "center",
                                    }}>
                                        <MaterialCommunityIcons
                                          name="email-outline"
                                          size={20}
                                          color={theme.iconOnG}
                                        />
                                        <TextInput
                                          style={{ flex: 1 }}
                                          autoCorrect={false}
                                          autoCapitalize="none"
                                          value={values.email}
                                          keyboardType={"email-address"}
                                          placeholder="Enter your Email address"
                                          onChange={handleChange("email")}
                                          onFocus={() => setFieldTouched("email")}
                                          onBlur={() => setFieldTouched("email", "")}
                                        />
                                    </View>
                                    {touched.email && errors.email && (
                                      <Text style={{
                                          color: "red",
                                          fontSize: 12,
                                          marginBottom: 5,
                                          marginLeft: 5,
                                      }}>{errors.email}</Text>
                                    )}
                                </View>
                            </View>
                            <View style={{ marginBottom: 20 }}>
                                <Text className="text-gray-700 ml-4">Password</Text>
                                <View>
                                    <View style={{
                                        borderColor: theme.iconOnG, backgroundColor: theme.iconOn,
                                        borderWidth: 1, height: 50, borderRadius: 12,
                                        flexDirection: "row", paddingHorizontal: 15, alignItems: "center",
                                    }}>
                                        <MaterialCommunityIcons
                                          name="lock-outline"
                                          size={20}
                                          color={theme.iconOnG}
                                        />
                                        <TextInput
                                          style={{ flex: 1 }}
                                          autoCorrect={false}
                                          autoCapitalize="none"
                                          secureTextEntry={obsecureText}
                                          value={values.password}
                                          placeholder="Enter your Password"
                                          onChange={handleChange("password")}
                                          onFocus={() => setFieldTouched("password")}
                                          onBlur={() => setFieldTouched("password", "")}
                                        />
                                        <TouchableOpacity onPress={() => {
                                            setObsecureText(!obsecureText);
                                        }}>
                                            <MaterialCommunityIcons
                                              name={obsecureText ? "eye-outline" : "eye-off-outline"}
                                              size={18}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {touched.password && errors.password && (
                                      <Text style={{
                                          color: "red",
                                          fontSize: 12,
                                          marginBottom: 5,
                                          marginLeft: 5,
                                      }}>{errors.password}</Text>
                                    )}
                                </View>
                            </View>
                        </View>
                      )}
                  </Formik>
                  <Text className="text-gray-700 ml-4">Confirm password</Text>
                  <TextInput
                    className="bg-gray-100 text-gray-700 rounded-2xl mb-7"
                    secureTextEntry
                    autoCorrect={false}
                    value={{}}
                    placeholder="Enter your Password again"
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
