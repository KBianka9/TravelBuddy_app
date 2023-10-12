import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ArrowLeftIcon, PlusIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
import OptionsMenu from "react-native-options-menu";
import * as Animatable from "react-native-animatable";

export default function FavoriteHotelsListScreen() {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState({
    Hawaii: false,
    Indonesia: true,
    Philippines: false,
    Italy: false,
    Peru: true,
  });

  const addTrip = () => {
    navigation.navigate("AddTrip");
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
      <Image source={require("../src/assets/favhotel.jpg")}
             style={{ height: 310 }}
             className="w-full absolute"
      />
      <SafeAreaView className="flex-row justify-start">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 my-4"
          style={{ backgroundColor: theme.button }}>
          <ArrowLeftIcon size="20" color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, paddingTop: 20, paddingLeft: 70, fontWeight: "bold" }}>Favorite hotel list</Text>
      </SafeAreaView>
      <ScrollView className="flex-1 bg-white px-8 pt-4"
                  style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 225 }}>
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
            <CheckBox isChecked={isChecked.Hawaii}
                      onClick={() => setChecked({ ...isChecked, Hawaii: !isChecked.Hawaii })}
                      checkedCheckBoxColor={theme.iconOnG}
                      uncheckedCheckBoxColor={theme.iconOff}
                      leftText="Hawaii, Honolulu Hotel"
                      leftTextStyle={{
                        marginLeft: 30,
                        color: isChecked.Hawaii ? theme.iconOnG : theme.iconOff,
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                      style={{ paddingRight: 40 }}
            />
            <OptionsMenu
              button={require("../src/assets/three-dots.png")}
              buttonStyle={{ width: 32, height: 17, resizeMode: "contain", marginTop: -20, marginLeft: 290 }}
              destructiveIndex={1}
              options={["Plan trip", "Delete", "Cancel"]}
              actions={[addTrip, null, null]}
            />
          </View>
          <View style={{ borderBottomWidth: 1, borderColor: theme.button, paddingBottom: 15, paddingTop: 20 }}>
            <CheckBox isChecked={isChecked.Indonesia}
                      onClick={() => setChecked({ ...isChecked, Indonesia: !isChecked.Indonesia })}
                      checkedCheckBoxColor={theme.iconOnG}
                      uncheckedCheckBoxColor={theme.iconOff}
                      leftText="Indonesia, Raha Hotel"
                      leftTextStyle={{
                        marginLeft: 30,
                        color: isChecked.Indonesia ? theme.iconOnG : theme.iconOff,
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                      style={{ paddingRight: 40 }}
            />
            <OptionsMenu
              button={require("../src/assets/three-dots.png")}
              buttonStyle={{ width: 32, height: 17, resizeMode: "contain", marginTop: -20, marginLeft: 290 }}
              destructiveIndex={1}
              options={["Plan trip", "Delete", "Cancel"]}
              actions={[addTrip, null, null]}
            />
          </View>
          <View style={{ borderBottomWidth: 1, borderColor: theme.button, paddingBottom: 15, paddingTop: 20 }}>
            <CheckBox isChecked={isChecked.Philippines}
                      onClick={() => setChecked({ ...isChecked, Philippines: !isChecked.Philippines })}
                      checkedCheckBoxColor={theme.iconOnG}
                      uncheckedCheckBoxColor={theme.iconOff}
                      leftText="Philippines, You Hotel"
                      leftTextStyle={{
                        marginLeft: 30,
                        color: isChecked.Philippines ? theme.iconOnG : theme.iconOff,
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                      style={{ paddingRight: 40 }}
            />
            <OptionsMenu
              button={require("../src/assets/three-dots.png")}
              buttonStyle={{ width: 32, height: 17, resizeMode: "contain", marginTop: -20, marginLeft: 290 }}
              destructiveIndex={1}
              options={["Plan trip", "Delete", "Cancel"]}
              actions={[addTrip, null, null]}
            />
          </View>
          <View style={{ borderBottomWidth: 1, borderColor: theme.button, paddingBottom: 15, paddingTop: 20 }}>
            <CheckBox isChecked={isChecked.Italy} onClick={() => setChecked({ ...isChecked, Italy: !isChecked.Italy })}
                      checkedCheckBoxColor={theme.iconOnG}
                      uncheckedCheckBoxColor={theme.iconOff}
                      leftText="Italy, Rome Hotel"
                      leftTextStyle={{
                        marginLeft: 30,
                        color: isChecked.Italy ? theme.iconOnG : theme.iconOff,
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                      style={{ paddingRight: 40 }}
            />
            <OptionsMenu
              button={require("../src/assets/three-dots.png")}
              buttonStyle={{ width: 32, height: 17, resizeMode: "contain", marginTop: -20, marginLeft: 290 }}
              destructiveIndex={1}
              options={["Plan trip", "Delete", "Cancel"]}
              actions={[addTrip, null, null]}
            />
          </View>
          <View style={{
            borderBottomWidth: 1,
            borderColor: theme.button,
            paddingBottom: 15,
            paddingTop: 20,
            marginBottom: 30,
          }}>
            <CheckBox isChecked={isChecked.Peru} onClick={() => setChecked({ ...isChecked, Peru: !isChecked.Peru })}
                      checkedCheckBoxColor={theme.iconOnG}
                      uncheckedCheckBoxColor={theme.iconOff}
                      leftText="Peru, Machu Hotel"
                      leftTextStyle={{
                        marginLeft: 30,
                        color: isChecked.Peru ? theme.iconOnG : theme.iconOff,
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                      style={{ paddingRight: 40 }}
            />
            <OptionsMenu
              button={require("../src/assets/three-dots.png")}
              buttonStyle={{ width: 32, height: 17, resizeMode: "contain", marginTop: -20, marginLeft: 290 }}
              destructiveIndex={1}
              options={["Plan trip", "Delete", "Cancel"]}
              actions={[addTrip, null, null]}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
