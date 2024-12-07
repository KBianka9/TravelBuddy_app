import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { UserContext } from "../../App";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import EmptyList from "../../components/emptyList";
import { deleteReview, list } from "../../contollers/reviewController";

export default function PostScreen() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  if (user.role !== "ADMIN") {
    navigation.navigate("PlaceSearcher");
    return;
  }
  const [posts, setPosts] = useState([]);
  const [appKey, setAppKey] = useState(0);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Az "YYYY-MM-DD" rész kivétele
  };

  const reloadApp = () => {
    setAppKey(prev => prev + 1);
  };

  useEffect(() => {
    loadReportedPosts();
    reloadApp();
  }, []);

  const loadReportedPosts = async () => {
    try {
      const response = await list();
      setPosts(response.data);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };

  const showAlert = (itemId) =>
    Alert.alert(
      "Delete post",
      "Are you sure you want to delete it?",
      [
        {
          text: "Yes",
          onPress: () => deletePost(itemId),
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
    );

  const deletePost = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      await loadReportedPosts();
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "You can removed the post from the list!",
        visibilityTime: 5000,
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "You can't delete this post from the list!",
        visibilityTime: 5000,
      });
    }
  };

  const renderItem = ({ item, index }) => {
    if (item.report === true) {
      return (
        <View key={index} className="flex-row gap-x-3 items-center"
              style={{ borderBottomWidth: 1, borderColor: theme.button, paddingVertical: 15 }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={{ uri: `http://10.0.2.2:3000/userImg/profile/${item.authorId}.jpg` }}
                   style={{ height: 70, width: 70, borderRadius: 90, marginRight: 10 }}
            />
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column" }}>
                  <Text className="font-bold">{item.author?.name}</Text>
                  <Text className="font-bold">{item.author?.email}</Text>
                  <Text>Id: {item.reviewId}</Text>
                  <Text> {formatDate(item.createdAt)}</Text>
                  <Text className="font-bold">{item.cityCountryName}</Text>
                </View>
                <View style={{ flexDirection: "column", end: -60, marginTop: 5 }}>
                  <Image source={require("../../src/assets/report.jpg")}
                         style={{ height: 35, width: 35, marginBottom: 25 }} />
                  <TouchableOpacity onPress={() => showAlert(item.reviewId)}>
                    <Image source={require("../../src/assets/bin.jpg")}
                           style={{ width: 35, height: 25, resizeMode: "contain" }} />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={{ width: 300, marginTop: 20, marginLeft: -60 }}>{item.revText}</Text>
              </View>
            </View>
          </View>
        </View>);
    }
  };

  return (
    <View className="flex-1 bg-white" keyboardShouldPersistTaps={"handled"} key={appKey}>
      <Image source={require("../../src/assets/review.jpg")}
             style={{ height: 270 }}
             className="w-full absolute"
      />
      <SafeAreaView className="flex-row justify-start">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 my-4"
          style={{ backgroundColor: theme.button }}>
          <ArrowLeftIcon size="25" color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, paddingTop: 25, paddingLeft: 70, fontWeight: "bold", color: "white" }}>Reported
          review list</Text>
      </SafeAreaView>
      <View className="flex-1 bg-white"
            style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 180 }}>
        <ScrollView style={{ marginTop: 10 }} className="px-8">
          <View>
            <FlatList
              data={posts}
              ListEmptyComponent={<EmptyList />}
              keyExtractor={(e, i) => i.toString()}
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
