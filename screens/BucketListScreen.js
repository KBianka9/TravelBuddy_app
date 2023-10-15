import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ArrowLeftIcon, PlusIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
import OptionsMenu from "react-native-options-menu";
import * as Animatable from "react-native-animatable";

export default function BucketListScreen() {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState({
    BigBen: true,
    EiffelTower: false,
    MachuPicchu: true,
    Colosseum: false,
  });

  const memories = () => {
    navigation.navigate("Memories");
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
      <Image source={require("../src/assets/bucket_list.jpg")}
             style={{ height: 385 }}
             className="w-full absolute"
      />
      <SafeAreaView className="flex-row justify-start">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 my-4"
          style={{ backgroundColor: theme.button }}>
          <ArrowLeftIcon size="20" color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, paddingTop: 20, paddingLeft: 100, fontWeight: "bold" }}>Bucket list</Text>
      </SafeAreaView>
      <ScrollView className="flex-1 bg-white px-8 pt-4"
                  style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 300 }}>
        <View style={{ marginTop: 15 }}>
          <View style={{ flexDirection: "row", marginBottom: 25 }}>
            <TouchableOpacity className="ml-2">
              <Text style={{
                backgroundColor: theme.background,
                borderRadius: 25,
                paddingHorizontal: 15,
                paddingVertical: 8,
                fontWeight: "bold",
              }}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity className="ml-4">
              <Text style={{
                backgroundColor: theme.background,
                borderRadius: 25,
                paddingHorizontal: 15,
                paddingVertical: 8,
                fontWeight: "bold",
              }}>checked</Text>
            </TouchableOpacity>
            <TouchableOpacity className="ml-4">
              <Text style={{
                backgroundColor: theme.background,
                borderRadius: 25,
                paddingHorizontal: 15,
                paddingVertical: 8,
                fontWeight: "bold",
              }}>unchecked</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ shadowOpacity: 1, paddingBottom: 5, marginLeft: 15 }}>
              <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                               style={{ borderWidth: 0 }}>
                <PlusIcon size="5" strokeWidth={2} color={theme.iconOn}
                          style={{ backgroundColor: theme.button, borderRadius: 20, padding: 20 }} />
              </Animatable.View>
            </TouchableOpacity>
          </View>
          <View style={{ borderBottomWidth: 1, borderColor: theme.button, paddingBottom: 15 }}>
            <CheckBox isChecked={isChecked.BigBen}
                      onClick={() => setChecked({ ...isChecked, BigBen: !isChecked.BigBen })}
                      checkedCheckBoxColor={theme.iconOnG}
                      uncheckedCheckBoxColor={theme.iconOff}
                      leftText="Big Ben, England"
                      leftTextStyle={{
                        marginLeft: 30,
                        color: isChecked.BigBen ? theme.iconOnG : theme.iconOff,
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                      style={{ paddingRight: 40 }}
            />
            <OptionsMenu
              button={require("../src/assets/three-dots.png")}
              buttonStyle={{ width: 32, height: 17, resizeMode: "contain", marginTop: -20, marginLeft: 290 }}
              destructiveIndex={1}
              options={["Memories", "Delete", "Cancel"]}
              actions={[memories, null, null]}
            />
          </View>
          <View style={{ borderBottomWidth: 1, borderColor: theme.button, paddingBottom: 15, paddingTop: 20 }}>
            <CheckBox isChecked={isChecked.EiffelTower}
                      onClick={() => setChecked({ ...isChecked, EiffelTower: !isChecked.EiffelTower })}
                      checkedCheckBoxColor={theme.iconOnG}
                      uncheckedCheckBoxColor={theme.iconOff}
                      leftText="Eiffel Tower, France"
                      leftTextStyle={{
                        marginLeft: 30,
                        color: isChecked.EiffelTower ? theme.iconOnG : theme.iconOff,
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                      style={{ paddingRight: 40 }}
            />
            <OptionsMenu
              button={require("../src/assets/three-dots.png")}
              buttonStyle={{ width: 32, height: 17, resizeMode: "contain", marginTop: -20, marginLeft: 290 }}
              destructiveIndex={1}
              options={["Memories", "Delete", "Cancel"]}
              actions={[memories, null, null]}
            />
          </View>
          <View style={{ borderBottomWidth: 1, borderColor: theme.button, paddingBottom: 15, paddingTop: 20 }}>
            <CheckBox isChecked={isChecked.MachuPicchu}
                      onClick={() => setChecked({ ...isChecked, MachuPicchu: !isChecked.MachuPicchu })}
                      checkedCheckBoxColor={theme.iconOnG}
                      uncheckedCheckBoxColor={theme.iconOff}
                      leftText="Machu Picchu, Peru"
                      leftTextStyle={{
                        marginLeft: 30,
                        color: isChecked.MachuPicchu ? theme.iconOnG : theme.iconOff,
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                      style={{ paddingRight: 40 }}
            />
            <OptionsMenu
              button={require("../src/assets/three-dots.png")}
              buttonStyle={{ width: 32, height: 17, resizeMode: "contain", marginTop: -20, marginLeft: 290 }}
              destructiveIndex={1}
              options={["Memories", "Delete", "Cancel"]}
              actions={[memories, null, null]}
            />
          </View>
          <View style={{ borderBottomWidth: 1, borderColor: theme.button, paddingBottom: 15, paddingTop: 20 }}>
            <CheckBox isChecked={isChecked.Colosseum}
                      onClick={() => setChecked({ ...isChecked, Colosseum: !isChecked.Colosseum })}
                      checkedCheckBoxColor={theme.iconOnG}
                      uncheckedCheckBoxColor={theme.iconOff}
                      leftText="Colosseum, Italy"
                      leftTextStyle={{
                        marginLeft: 30,
                        color: isChecked.Colosseum ? theme.iconOnG : theme.iconOff,
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                      style={{ paddingRight: 40 }}
            />
            <OptionsMenu
              button={require("../src/assets/three-dots.png")}
              buttonStyle={{ width: 32, height: 17, resizeMode: "contain", marginTop: -20, marginLeft: 290 }}
              destructiveIndex={1}
              options={["Memories", "Delete", "Cancel"]}
              actions={[memories, null, null]}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
