import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { theme } from "../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Carousel from "react-native-snap-carousel";
import { hotelItems } from "../constants";
import HotelCard from "../components/hotelCard";
import { ArrowUpIcon } from "react-native-heroicons/solid";
import * as Animatable from "react-native-animatable";

const prices = ["$0-50/night", "$51-100/night", "$101-150/night", "$151-200/night"];

export default function PlaceSearcherScreen() {
    return (
      <ScrollView className="flex-1">
          <SafeAreaView>
              <Image source={require("../src/assets/walkway-tropical-jungle.jpg")}
                     style={{ height: 610, width: 400 }} />
              <Text style={{
                marginTop: -370,
                  textAlign: "center",
                  fontSize: 40,
                color: "white",
              }}>Welcome!</Text>
              <Text style={{ fontSize: 15, color: "white", paddingLeft: 50, paddingRight: 15 }}>"Do not follow where the
                  path may lead, go instead where there is no path and leave a trail."</Text>
              <Animatable.View animation="slideInDown" iterationCount={"infinite"} direction="alternate">
                  <ArrowUpIcon size={20} color={theme.iconOn} style={{
                      padding: 20,
                      backgroundColor: theme.iconOnG,
                      borderRadius: 50,
                      position: "relative",
                      marginTop: 210,
                      marginLeft: 180,
                  }} />
              </Animatable.View>
          </SafeAreaView>
          <View className="bg-white" style={{ borderTopRightRadius: 25, borderTopLeftRadius: 25, marginTop: 5 }}>
            <View className="flex-1 px-8 pt-5">
                  {/*Destination searcher*/}
                  <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 mb-4">
                      <TextInput placeholder="Search your destination"
                                 className="p-4 flex-1"
                                 style={{ fontSize: 15, fontWeight: "600", color: theme.text }}
                      />
                      <TouchableOpacity className="rounded-full p-2 mr-2"
                                        style={{ backgroundColor: theme.background }}>
                          <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"></MagnifyingGlassIcon>
                      </TouchableOpacity>
                  </View>
                  {/*Price selector*/}
                  <SelectDropdown
                    dropdownStyle={{ justifyContent: "center", borderRadius: 30, backgroundColor: theme.searchInput }}
                    selectedRowStyle={{ justifyContent: "center", backgroundColor: "white" }}
                    buttonStyle={{ justifyContent: "center", borderRadius: 30, backgroundColor: theme.searchInput }}
                    defaultButtonText={"$price/night"}
                    buttonTextStyle={{ fontSize: 15, fontWeight: "700", color: theme.text }}
                    data={prices}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                    rowTextForSelection={(item, index) => item}
                  />
              </View>
              <Text className="text-black text-3xl my-3 ml-4">Recommendations</Text>
              {/*Recommendation cards*/}
              <View className="mt-2 py-2">
                  <Carousel containerCustomStyle={{ overflow: "visible", borderRadius: 50 }}
                            data={hotelItems}
                            loop={true}
                            renderItem={({ item }) => <HotelCard item={item} />}
                            firstItem={1}
                            inactiveSlideOpacity={0.75}
                            inactiveSlideScale={0.77}
                            sliderWidth={370}
                            itemWidth={240}
                            slideStyle={{ display: "flex", alignItems: "center" }}
                  />
              </View>
          </View>
      </ScrollView>
    );
}
