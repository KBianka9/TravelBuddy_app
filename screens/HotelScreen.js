import React from "react";
import { Image, TouchableOpacity, View, ScrollView, Text } from "react-native";
import { ArrowLeftIcon, MapPinIcon, StarIcon } from "react-native-heroicons/solid";
import { HomeModernIcon as HomeModernIconOutline } from "react-native-heroicons/outline";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";


export default function HotelScreen(props) {
    const item = props.route.params;
    const navigation = useNavigation();
    return (
      <View className="flex-1">
        <Image source={item.image}
               style={{ height: 310 }}
               className="w-full absolute"
        />
        <SafeAreaView>
          <View className="flex-row justify-between items-center mr-2 mt-4">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
              style={{ backgroundColor: theme.button }}>
              <ArrowLeftIcon size="25" color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View className="flex-1 bg-white px-8"
              style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 210 }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{ shadowOpacity: 1 }}>
              <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                               style={{
                                 marginTop: -35,
                                 backgroundColor: theme.button,
                                 borderRadius: 50,
                                 padding: 10,
                                 start: 250,
                               }}
              >
                <HomeModernIconOutline size={40} strokeWidth={1} color={theme.iconOn} />
              </Animatable.View>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={{
              backgroundColor: theme.button, flexDirection: "row", alignItems: "center", borderRadius: 20,
              marginTop: 10, width: 80, padding: 10, marginVertical: 8,
            }}>
              <StarIcon style={{ alignItems: "center", padding: 8, marginLeft: 2 }} size="19" color="white" />
              <Text style={{ fontSize: 17, color: "white", fontWeight: "bold", marginLeft: 6 }}>{item.stars}</Text>
            </View>
            <View className="ml-2 space-y-3">
              <Text style={{ fontSize: 24, marginTop: 5, color: "black", fontWeight: "bold" }}>
                {item.name}
              </Text>
              <View style={{ flexDirection: "row", marginLeft: -4 }}>
                <MapPinIcon style={{ marginLeft: 20 }} size="25" color="black" />
                <Text style={{ fontSize: 18, marginTop: 2, color: "black" }}>
                  {item.city}, {item.country}
                </Text>
              </View>
              <View style={{ marginTop: 8, alignItems: "flex-end" }}>
                <Text style={{ fontSize: 24, color: theme.iconOff, fontWeight: "bold" }}>$ {item.price}</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 20, marginTop: 5, color: "black", fontWeight: "bold" }}>About Hotel and
                  around</Text>
                <Text style={{ fontSize: 15, marginTop: 5, color: "black" }}>{item.description}</Text>
              </View>
              <View style={{ marginTop: 10, paddingBottom: 90 }}>
                <Text
                  style={{ fontSize: 20, marginVertical: 15, color: "black", fontWeight: "bold" }}>Location</Text>
                <Image source={item.map}
                       style={{ width: 320, height: 160, borderRadius: 10 }} />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
}
