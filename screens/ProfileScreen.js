import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import {
  GlobeEuropeAfricaIcon,
  PencilSquareIcon,
  ClipboardDocumentListIcon,
  UserMinusIcon,
  ArrowRightOnRectangleIcon,
  HomeModernIcon, DocumentCheckIcon, IdentificationIcon,
} from "react-native-heroicons/outline";
import storage from "../storage/storage";
import { UserContext } from "../App";
import { deleteUser } from "../contollers/userContoller";
import axios from "axios";

export default function ProfileScreen({ navigation }) {
  const { setUser, user } = useContext(UserContext);
  console.log({ user });
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
    deleteUser(user.userId).then(() => {
      alert("User deleted successfully");
      setTimeout(() => handleLogout(), 3000);
    }).catch((err) => {
      if (axios.isAxiosError(err)) {
        alert(err.response.data.error);
      } else {
        alert(err.message);
      }
    });
  };

  const handleLogout = async () => {
    await storage.remove({
      key: "user",
    });
    setUser(null);
    navigation.navigate("Login");
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
          <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 5, textAlign: "center" }}>{user.name}</Text>
        </View>
        <ScrollView className="mb-20">
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
          {(user.role === "ADMIN") &&
            <TouchableOpacity onPress={() => navigation.navigate("Users")}>
              <View style={{
                flexDirection: "row",
                paddingVertical: 10,
                paddingHorizontal: 30,
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: theme.button,
                marginHorizontal: 20,
              }}>
                <IdentificationIcon size="5" strokeWidth={1}
                                    style={{ color: theme.text, borderRadius: 50, padding: 16 }} />
                <Text style={{ color: theme.iconOff, marginLeft: 16, fontSize: 16 }}>Edit user</Text>
              </View>
            </TouchableOpacity>
          }
          {(user.role === "ADMIN") &&
            <TouchableOpacity onPress={() => navigation.navigate("Post")}>
              <View style={{
                flexDirection: "row",
                paddingVertical: 10,
                paddingHorizontal: 30,
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: theme.button,
                marginHorizontal: 20,
              }}>
                <DocumentCheckIcon size="5" strokeWidth={1}
                                   style={{ color: theme.text, borderRadius: 50, padding: 16 }} />
                <Text style={{ color: theme.iconOff, marginLeft: 16, fontSize: 16 }}>Edit post</Text>
              </View>
            </TouchableOpacity>
          }
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
        </ScrollView>
      </View>
    </View>
  );
}
