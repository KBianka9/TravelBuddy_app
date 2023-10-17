import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../config";
import {
  GlobeEuropeAfricaIcon,
  PencilSquareIcon,
  ClipboardDocumentListIcon,
  UserMinusIcon,
  ArrowRightOnRectangleIcon,
  HomeModernIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const user = [
  {
    id: 1,
    profileImg: require("../src/assets/corgi.webp"),
    name: "Bianka Kiss",
    email: "kiss.bianka@gmail.com",
    password: "123456789",
  }];


export default function ProfileScreen() {
  const navigation = useNavigation();
  /*TODO: felhasználó törlése->felugró ablak*/
  /*Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
          {
              text: "Cancel"
          },
          {
              text: "Continue", onPress: {handleDelAccount}
          },
      ]
  )*/
  const handleDelAccount = () => {
    const user = auth.currentUser;
    deleteUser(user).then(() => {
      navigation.navigate("Welcome");
    }).catch((error) => {
      Alert.alert(error);
    });
    alert("User deleted successfully");
  };

  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <SafeAreaView>
        <Image source={require("../src/assets/view-toward-sky-forest.jpg")}
               style={{ height: 370, width: 393 }} />
      </SafeAreaView>
      <View className="flex-col flex-1 bg-white px-4"
            style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: -110 }}>
        <View style={{ alignItems: "center" }}>
          <Image source={require("../src/assets/corgi.webp")}
                 style={{
                   width: 180,
                   height: 180,
                   borderRadius: 100,
                   marginTop: -100,
                   borderWidth: 3,
                   borderColor: "white",
                 }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 5, textAlign: "center" }}>Bianka Kiss</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <View style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 30,
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: theme.button,
              marginHorizontal: 20,
            }}>
              <PencilSquareIcon size="5" strokeWidth={1}
                                style={{ color: theme.text, borderRadius: 50, padding: 16 }} />
              <Text style={{ color: theme.iconOff, marginLeft: 16, fontSize: 16 }}>Edit profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("FavoriteHotelsList")}>
            <View style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 30,
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: theme.button,
              marginHorizontal: 20,
            }}>
              <HomeModernIcon size="5" strokeWidth={1}
                              style={{ color: theme.text, borderRadius: 50, padding: 16 }} />
              <Text style={{ color: theme.iconOff, marginLeft: 16, fontSize: 16 }}>Favorite hotels list</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("BucketList")}>
            <View style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 30,
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: theme.button,
              marginHorizontal: 20,
            }}>
              <GlobeEuropeAfricaIcon size="5" strokeWidth={1}
                                     style={{ color: theme.text, borderRadius: 50, padding: 16 }} />
              <Text style={{ color: theme.iconOff, marginLeft: 16, fontSize: 16 }}>Bucket list</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("PackingList")}>
            <View style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 30,
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: theme.button,
              marginHorizontal: 20,
            }}>
              <ClipboardDocumentListIcon size="5" strokeWidth={1}
                                         style={{ color: theme.text, borderRadius: 50, padding: 16 }} />
              <Text style={{ color: theme.iconOff, marginLeft: 16, fontSize: 16 }}>Packing list</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelAccount}>
            <View style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 30,
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: theme.button,
              marginHorizontal: 20,
            }}>
              <UserMinusIcon size="5" strokeWidth={1}
                             style={{ color: theme.text, borderRadius: 50, padding: 16 }} />
              <Text style={{ color: theme.iconOff, marginLeft: 16, fontSize: 16 }}>Delete account</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <View style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 30,
              alignItems: "center",
              marginHorizontal: 20,
              marginBottom: 10,
            }}>
              <ArrowRightOnRectangleIcon size="5" strokeWidth={1}
                                         style={{ color: theme.text, borderRadius: 50, padding: 16 }} />
              <Text style={{ color: theme.iconOff, marginLeft: 16, fontSize: 16 }}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
