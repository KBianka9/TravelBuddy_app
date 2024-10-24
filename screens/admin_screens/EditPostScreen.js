import React, { useContext } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text } from "react-native";
import { ArrowLeftIcon, MapPinIcon } from "react-native-heroicons/solid";
import { theme } from "../../theme";
import { UserContext } from "../../App";
import { useNavigation } from "@react-navigation/native";

/*TODO: item probléma*/
export default function EditPostScreen({ item }) {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  if (user.role !== "ADMIN") {
    navigation.navigate("PlaceSearcher");
    return;
  }

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center mr-2 mt-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          style={{ backgroundColor: theme.button, zIndex: 1 }}>
          <ArrowLeftIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1 bg-white px-2"
                  style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: -15 }}>
        <View style={{
          borderRadius: 50,
          backgroundColor: "white",
          marginHorizontal: 20,
          marginVertical: 10,
          padding: 15,
          height: 490,
        }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={item.profilePic}
                   style={{ width: 90, height: 90, marginLeft: 10, borderRadius: 50 }} />
            <Text style={{ paddingTop: 10, paddingLeft: 90 }}>{item.postDate}</Text>
          </View>
          <Text style={{
            paddingVertical: 10,
            paddingLeft: 15,
            fontSize: 15,
            fontWeight: "bold",
            marginBottom: 10,
          }}>{item.user}</Text>
          <View style={{ flexDirection: "row", marginLeft: -4 }}>
            <MapPinIcon style={{ marginLeft: 20, color: theme.text }} size="22" />
            <Text style={{ fontSize: 16, marginTop: 2, color: theme.text }}>
              Raha, Indonesia
            </Text>
          </View>
          <Text style={{ padding: 10 }}>{item.text}</Text>
          <View className="flex-row pb-2 my-4 ml-6">
            <Text className="pt-3 mr-2">Useful?</Text>

            <TouchableOpacity className="py-3 rounded-3xl mx-2"
                              style={{ backgroundColor: theme.iconOnG }}
                              onPress={() => usefulCounter(item.usefulSum)}>
              <Text className="font-xl text-center text-white px-2">Yes - {item.usefulSum}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-3 rounded-3xl mx-2"
                              style={{ backgroundColor: theme.iconOff }}
                              onPress={() => usefulCounter(item.uselessSum)}>
              <Text className="font-l text-center text-white px-2">No - {item.uselessSum}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
