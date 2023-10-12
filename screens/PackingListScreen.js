import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ArrowLeftIcon, PlusIcon, MinusIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { fullPackingList, selectedFilterTag } from "../constants";
import * as Animatable from "react-native-animatable";

export default function PackingListScreen() {
    const navigation = useNavigation();
    const [counter, setCounter] = useState(0);
    const filteredPackingList = fullPackingList.filter(item => item.tags.includes(selectedFilterTag));

    return (
      <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
          <Image source={require("../src/assets/packinglist.jpg")}
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
              <Text style={{ fontSize: 18, paddingTop: 20, paddingLeft: 90, fontWeight: "bold", color: "white" }}>Packing
                  list</Text>
          </SafeAreaView>
          <ScrollView className="flex-1 bg-white px-8 pt-4"
                      style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 225 }}>
              <View style={{ flexDirection: "row", paddingLeft: 3, marginTop: 15 }}>
                  <TouchableOpacity style={{ shadowOpacity: 1, paddingRight: 20, paddingTop: 5 }}>
                      <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"}
                                       duration={1000} style={{ borderWidth: 0 }}>
                          <PlusIcon size="5" strokeWidth={2} color={theme.iconOn}
                                    style={{ backgroundColor: theme.button, borderRadius: 20, padding: 20 }} />
                      </Animatable.View>
                  </TouchableOpacity>
                  {/*Packing categories selector*/}
                  <SelectDropdown
                    dropdownStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
                    selectedRowStyle={{ backgroundColor: "white" }}
                    buttonStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
                    dropdownIconPosition="right"
                    defaultButtonText={"Essentials"}
                    data={filteredPackingList}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                    }}
                  />
                  <View style={{ paddingLeft: 20, paddingTop: 5 }}>
                      {/*TODO:Reset gomb mukodjon*/}
                      <TouchableOpacity onPress={() => setCounter(0)} disabled={counter === 0}>
                          <Image source={require("../src/assets/reset.png")}
                                 style={{ width: 32, height: 32, marginRight: 10, marginTop: 5 }} />
                      </TouchableOpacity>
                  </View>
              </View>
              {/*List of packing items*/}
              <View>
                  <View
                    style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: theme.button, marginTop: 20 }}>
                      <Text style={{ fontSize: 20, paddingRight: 150, paddingTop: 5 }}>passport</Text>
                      <TouchableOpacity onPress={() => setCounter(counter - 1)} disabled={counter === 0}>
                          <MinusIcon size="2" strokeWidth={1} color={theme.iconOn}
                                     style={{
                                         backgroundColor: theme.decrementButton,
                                         borderRadius: 20,
                                         padding: 12,
                                         marginTop: 10,
                                     }} />
                      </TouchableOpacity>
                      <Text
                        style={{ fontSize: 22, paddingHorizontal: 10, marginBottom: 10, marginTop: 5 }}>{counter}</Text>
                      <TouchableOpacity onPress={() => setCounter(counter + 1)}>
                          <PlusIcon size="2" strokeWidth={2} color={theme.iconOn}
                                    style={{
                                        backgroundColor: theme.iconOnG,
                                        borderRadius: 20,
                                        padding: 12,
                                        marginTop: 10,
                                    }} />
                      </TouchableOpacity>
                  </View>
                  <View
                    style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: theme.button, marginTop: 20 }}>
                      <Text style={{ fontSize: 20, paddingRight: 182, paddingTop: 5 }}>towel</Text>
                      <TouchableOpacity onPress={() => setCounter(counter - 1)} disabled={counter === 0}>
                          <MinusIcon size="2" strokeWidth={1} color={theme.iconOn}
                                     style={{
                                         backgroundColor: theme.decrementButton,
                                         borderRadius: 20,
                                         padding: 12,
                                         marginTop: 10,
                                     }} />
                      </TouchableOpacity>
                      <Text
                        style={{ fontSize: 22, paddingHorizontal: 10, marginBottom: 10, marginTop: 5 }}>{counter}</Text>
                      <TouchableOpacity onPress={() => setCounter(counter + 1)}>
                          <PlusIcon size="2" strokeWidth={2} color={theme.iconOn}
                                    style={{
                                        backgroundColor: theme.iconOnG,
                                        borderRadius: 20,
                                        padding: 12,
                                        marginTop: 10,
                                    }} />
                      </TouchableOpacity>
                  </View>
                  <View
                    style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: theme.button, marginTop: 20 }}>
                      <Text style={{ fontSize: 20, paddingRight: 177, paddingTop: 5 }}>paper</Text>
                      <TouchableOpacity onPress={() => setCounter(counter - 1)} disabled={counter === 0}>
                          <MinusIcon size="2" strokeWidth={1} color={theme.iconOn}
                                     style={{
                                         backgroundColor: theme.decrementButton,
                                         borderRadius: 20,
                                         padding: 12,
                                         marginTop: 10,
                                     }} />
                      </TouchableOpacity>
                      <Text
                        style={{ fontSize: 22, paddingHorizontal: 10, marginBottom: 10, marginTop: 5 }}>{counter}</Text>
                      <TouchableOpacity onPress={() => setCounter(counter + 1)}>
                          <PlusIcon size="2" strokeWidth={2} color={theme.iconOn}
                                    style={{
                                        backgroundColor: theme.iconOnG,
                                        borderRadius: 20,
                                        padding: 12,
                                        marginTop: 10,
                                    }} />
                      </TouchableOpacity>
                  </View>
                  <View
                    style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: theme.button, marginTop: 20 }}>
                      <Text style={{ fontSize: 20, paddingRight: 135, paddingTop: 5 }}>something</Text>
                      <TouchableOpacity onPress={() => setCounter(counter - 1)} disabled={counter === 0}>
                          <MinusIcon size="2" strokeWidth={1} color={theme.iconOn}
                                     style={{
                                         backgroundColor: theme.decrementButton,
                                         borderRadius: 20,
                                         padding: 12,
                                         marginTop: 10,
                                     }} />
                      </TouchableOpacity>
                      <Text
                        style={{ fontSize: 22, paddingHorizontal: 10, marginBottom: 10, marginTop: 5 }}>{counter}</Text>
                      <TouchableOpacity onPress={() => setCounter(counter + 1)}>
                          <PlusIcon size="2" strokeWidth={2} color={theme.iconOn}
                                    style={{
                                        backgroundColor: theme.iconOnG,
                                        borderRadius: 20,
                                        padding: 12,
                                        marginTop: 10,
                                    }} />
                      </TouchableOpacity>
                  </View>
              </View>
          </ScrollView>
      </View>
    );
}
