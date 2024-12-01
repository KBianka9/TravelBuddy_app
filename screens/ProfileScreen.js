import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import {
  GlobeEuropeAfricaIcon,
  PencilSquareIcon,
  ClipboardDocumentListIcon,
  UserMinusIcon,
  ArrowRightOnRectangleIcon,
  HomeModernIcon, DocumentCheckIcon, IdentificationIcon, BanknotesIcon,
} from "react-native-heroicons/outline";
import storage from "../storage/storage";
import { UserContext } from "../App";
import { deleteUser } from "../contollers/userContoller";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [appKey, setAppKey] = useState(0);

  const reloadApp = () => {
    setAppKey(prev => prev + 1);
  };

  useEffect(() => {
    reloadApp();
  }, []);

  const showAlert = () =>
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Yes",
          onPress: () => handleDelAccount(),
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
    );

  const handleDelAccount = () => {
    deleteUser(user.userId).then(() => {
      Toast.show({
        type: "success",
        text1: "User deleted successfully",
        visibilityTime: 3000,
      });
      setTimeout(() => handleLogout(), 5000);
    }).catch((err) => {
      if (axios.isAxiosError(err)) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.response.data.error,
          visibilityTime: 5000,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.message,
          visibilityTime: 5000,
        });
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
    <View className="flex-1" key={appKey}>
      <SafeAreaView>
        <Image source={{ uri: `http://10.0.2.2:3000/userImg/cover/${user.userId}.jpg` }}
               style={{ height: 370, width: 393 }} />
      </SafeAreaView>
      <View className="flex-col flex-1 bg-white px-4"
            style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: -110 }}>
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: `http://10.0.2.2:3000/userImg/profile/${user.userId}.jpg` }}
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
          <TouchableOpacity onPress={() => navigation.navigate("BudgetCalculator")}>
            <View style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 30,
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: theme.button,
              marginHorizontal: 20,
            }}>
              <BanknotesIcon size="5" strokeWidth={1}
                             style={{ color: theme.text, borderRadius: 50, padding: 16 }} />
              <Text style={{ color: theme.iconOff, marginLeft: 16, fontSize: 16 }}>Budget calculator</Text>
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
          <TouchableOpacity onPress={showAlert}>
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
              paddingTop: 10,
              paddingHorizontal: 30,
              alignItems: "center",
              marginHorizontal: 20,
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
