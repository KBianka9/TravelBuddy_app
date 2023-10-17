import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { MapPinIcon } from "react-native-heroicons/solid";
import * as Animatable from "react-native-animatable";
import FloatingButton from "../components/FloatingButton";

export default function ReviewsScreen() {
    const navigation = useNavigation();
    const [yesButton, setYesButton] = useState(0);
    const [noButton, setNoButton] = useState(0);

    /*TODO:useful countert megcsinalni*/
    const usefulCounter = () => {
        if (onclick(yesButton) === true) {
            setYesButton(yesButton + 1);
        }
        if (onclick(noButton) === true) {
            setNoButton(noButton + 1);
        }
    };

    return (
      <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
          <SafeAreaView>
              <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 mt-8 mb-2 mx-4">
                  <TextInput placeholder="Search a city" className="p-4 flex-1 font-semibold text-gray-700" />
                  <TouchableOpacity className="rounded-full p-2 mr-2"
                                    style={{ backgroundColor: theme.background }}>
                      <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"></MagnifyingGlassIcon>
                  </TouchableOpacity>
              </View>
          </SafeAreaView>
          <ScrollView>
              <View style={{ borderRadius: 50, backgroundColor: "white", margin: 20, padding: 15 }}>
                  <View style={{ flexDirection: "row" }}>
                      <Image source={require("../src/assets/profile.png")}
                             style={{ width: 90, height: 90, marginLeft: 10 }} />
                      <Text style={{ paddingTop: 10, paddingLeft: 120 }}>09.09.2020</Text>
                  </View>
                  <Text style={{ paddingVertical: 10, paddingLeft: 15, fontSize: 15, fontWeight: "bold" }}>Arthur
                      Smith</Text>
                  <View style={{ flexDirection: "row", marginLeft: -4 }}>
                      <MapPinIcon style={{ marginLeft: 20, color: theme.text }} size="22" />
                      <Text style={{ fontSize: 16, marginTop: 2, color: theme.text }}>
                          Raha, Indonesia
                      </Text>
                  </View>
                  <Text style={{ padding: 15 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur
                      lacinia sapien rhoncus elementum. Integer commodo scelerisque lectus. Mauris venenatis interdum
                      magna. Mauris vel faucibus mi, at lobortis nisi. Suspendisse potenti. Pellentesque eu dolor
                      egestas, commodo metus id, pulvinar justo. In quis ornare tellus. Sed in odio et enim vehicula
                      viverra.
                  </Text>
                  <View className="flex-row">
                      <Image source={require("../src/assets/indonesia-cover-1.jpg")}
                             style={{ width: 50, height: 50, marginLeft: 20, marginRight: 5, marginTop: 5 }} />
                      <Image source={require("../src/assets/indonesia-cover-2.jpg")}
                             style={{ width: 50, height: 50, marginTop: 5, marginRight: 5, padding: 5 }} />
                      <Image source={require("../src/assets/indonesia-cover-3.jpg")}
                             style={{ width: 50, height: 50, marginTop: 5, padding: 5 }} />
                  </View>
                  <View className="flex-row pt-6 pb-2 ml-6">
                      <Text className="pt-3 mr-2">Useful?</Text>
                      <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                        style={{ backgroundColor: theme.iconOnG }}
                                        onPress={() => usefulCounter}>
                          <Text className="font-xl text-center text-white px-2">Yes - {yesButton}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                        style={{ backgroundColor: theme.iconOff }}
                                        onPress={() => usefulCounter()}>
                          <Text className="font-l text-center text-white px-2">No - {noButton}</Text>
                      </TouchableOpacity>
                  </View>
              </View>
              <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"}
                               duration={1000} style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 0,
                  overflow: "visible",
              }}>
                  <FloatingButton
                    style={{ position: "absolute", bottom: 40, right: 40 }}
                    onPress={() => navigation.navigate("NewReview")}
                  />
              </Animatable.View>
              <View style={{ borderRadius: 50, backgroundColor: "white", margin: 20, padding: 15 }}>
                  <View style={{ flexDirection: "row" }}>
                      <Image source={require("../src/assets/profile.png")}
                             style={{ width: 90, height: 90, marginLeft: 10 }} />
                      <Text style={{ paddingTop: 10, paddingLeft: 120 }}>09.10.2020</Text>
                  </View>
                  <Text style={{ paddingVertical: 10, paddingLeft: 15, fontSize: 15, fontWeight: "bold" }}>Jenny
                      Miller</Text>
                  <View style={{ flexDirection: "row", marginLeft: -4 }}>
                      <MapPinIcon style={{ marginLeft: 20, color: theme.text }} size="22" />
                      <Text style={{ fontSize: 16, marginTop: 2, color: theme.text }}>
                          Raha, Indonesia
                      </Text>
                  </View>
                  <Text style={{ padding: 15 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur
                      lacinia sapien rhoncus elementum. Integer commodo scelerisque lectus. Mauris venenatis interdum
                      magna. Mauris vel faucibus mi, at lobortis nisi. Suspendisse potenti.
                  </Text>
                  <View className="flex-row">
                      <Image source={require("../src/assets/indonesia-cover-1.jpg")}
                             style={{ width: 50, height: 50, marginLeft: 20, marginRight: 5, marginTop: 5 }} />
                  </View>
                  <View className="flex-row pt-6 pb-2 ml-6">
                      <Text className="pt-3 mr-2">Useful?</Text>
                      <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                        style={{ backgroundColor: theme.iconOnG }}
                                        onPress={() => {
                                        }}>
                          <Text className="font-xl text-center text-white px-2">Yes - 0</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                        style={{ backgroundColor: theme.iconOff }}
                                        onPress={() => {
                                        }}>
                          <Text className="font-l text-center text-white px-2">No - 0</Text>
                      </TouchableOpacity>
                  </View>
              </View>
              <View style={{ borderRadius: 50, backgroundColor: "white", margin: 20, padding: 15 }}>
                  <View style={{ flexDirection: "row" }}>
                      <Image source={require("../src/assets/profile.png")}
                             style={{ width: 90, height: 90, marginLeft: 10 }} />
                      <Text style={{ paddingTop: 10, paddingLeft: 120 }}>09.11.2020</Text>
                  </View>
                  <Text style={{ paddingVertical: 10, paddingLeft: 15, fontSize: 15, fontWeight: "bold" }}>Emily
                      Clark</Text>
                  <View style={{ flexDirection: "row", marginLeft: -4 }}>
                      <MapPinIcon style={{ marginLeft: 20, color: theme.text }} size="22" />
                      <Text style={{ fontSize: 16, marginTop: 2, color: theme.text }}>
                          Raha, Indonesia
                      </Text>
                  </View>
                  <Text style={{ padding: 15 }}>Mauris venenatis interdum
                      magna. Mauris vel faucibus mi, at lobortis nisi. Suspendisse potenti. Pellentesque eu dolor
                      egestas, commodo metus id, pulvinar justo. In quis ornare tellus. Sed in odio et enim vehicula
                      viverra.
                  </Text>
                  <View className="flex-row">
                      <Image source={require("../src/assets/indonesia-cover-1.jpg")}
                             style={{ width: 50, height: 50, marginLeft: 20, marginRight: 5, marginTop: 5 }} />
                      <Image source={require("../src/assets/indonesia-cover-2.jpg")}
                             style={{ width: 50, height: 50, marginTop: 5, marginRight: 5, padding: 5 }} />
                  </View>
                  <View className="flex-row pt-6 pb-2 ml-6">
                      <Text className="pt-3 mr-2">Useful?</Text>
                      <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                        style={{ backgroundColor: theme.iconOnG }}
                                        onPress={() => {
                                        }}>
                          <Text className="font-xl text-center text-white px-2">Yes - 0</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="py-3 rounded-3xl mx-2"
                                        style={{ backgroundColor: theme.iconOff }}
                                        onPress={() => {
                                        }}>
                          <Text className="font-l text-center text-white px-2">No - 0</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </ScrollView>
      </View>
    );
}
