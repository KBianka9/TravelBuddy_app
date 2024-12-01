import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { reviewItems } from "../../constants";
import { UserContext } from "../../App";
import { useNavigation } from "@react-navigation/native";
import SearchableDropDown from "react-native-searchable-dropdown";
import { searchByName } from "../../contollers/userContoller";
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

  const [username, setUsername] = useState(null);
  const [usernameList, setUsernameList] = useState(null);
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
    setUsernameList(getDropDownUsernames());
    loadReportedPosts();
    reloadApp();
  }, []);

  const loadReportedPosts = async () => {
    try {
      const response = await list();
      setPosts(response.data);
      console.log(posts);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };
  const handleSubmit = async () => {
    if (username === null) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Username is missing!",
        visibilityTime: 5000,
      });
    }
    try {
      const response = await searchByName(username);
      const postList = response.data;
      console.log(postList);
      if (postList.length === 0) {
        Toast.show({
          type: "error",
          text1: "Sorry",
          text2: "But we couldn't find review on the selected name!",
          visibilityTime: 5000,
        });
      } else {
        setPosts(postList);
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
        visibilityTime: 5000,
      });
    }
  };
  /*TODO: username szerinti keresés*/
  const getDropDownUsernames = () => {
    const values = [...new Set(reviewItems.map(username => username.userName))].map((userName, index) => ({
      id: index,
      name: userName,
    }));
    console.log(values);
    return values;
  };


  const showAlert = () =>
    Alert.alert(
      "Delete post",
      "Are you sure you want to delete it?",
      [
        {
          text: "Yes",
          onPress: () => deletePost(),
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
    );

  /*TODO: post delete*/
  const deletePost = async (reviewId) => {
    try {
      await deleteReview(reviewId);
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
      return (<View key={index} className="flex-row gap-x-3 items-center"
                    style={{ borderBottomWidth: 1, borderColor: theme.button, paddingVertical: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: `http://10.0.2.2:3000/userImg/profile/${item.authorId}.jpg` }}
                 style={{ height: 70, width: 70, borderRadius: 90, marginRight: 10 }}
          />
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column" }}>
                {/*TODO: nem jelenik meg a név (item.author.name)*/}
                <Text className="font-bold">{item.name}</Text>
                <Text className="font-bold">{item.email}</Text>
                <Text>Id: {item.reviewId}</Text>
                <Text> {formatDate(item.createdAt)}</Text>
                <Text className="font-bold">{item.cityCountryName}</Text>
              </View>
              <View style={{ flexDirection: "column", end: -100, marginTop: 5 }}>
                <Image source={require("../../src/assets/report.jpg")}
                       style={{ height: 35, width: 35, marginBottom: 25 }} />
                <TouchableOpacity onPress={showAlert}>
                  <Image source={require("../../src/assets/bin.jpg")}
                         style={{ width: 35, height: 25, resizeMode: "contain" }} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ width: 200, marginTop: 20 }}>{item.revText}</Text>
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
      </SafeAreaView>
      <View className="flex-1 bg-white"
            style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 180 }}>
        <View className="flex-row px-2 pt-4">
          <View className="flex-row justify-center items-center mx-4">
            <SearchableDropDown
              onItemSelect={(item) => {
                setUsername(item);
              }}
              containerStyle={{
                padding: 5,
                paddingLeft: 10,
                backgroundColor: "#e3e5e9",
                borderRadius: 30,
                width: 280,
              }}
              itemStyle={{
                paddingVertical: 10,
                paddingLeft: 20,
                marginTop: 10,
                backgroundColor: "#f8f9fa",
                borderRadius: 30,
              }}
              itemTextStyle={{ color: "#222", fontWeight: "bold" }}
              itemsContainerStyle={{ maxHeight: 150 }}
              items={usernameList}
              resetValue={false}
              textInputProps={
                {
                  underlineColorAndroid: "transparent",
                  value: username ? username.name : "Search review by author",
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
            />
            <TouchableOpacity className="rounded-full p-3 mr-2"
                              style={{ backgroundColor: theme.button, end: -15 }}
                              onPress={handleSubmit}
            >
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"></MagnifyingGlassIcon>
            </TouchableOpacity>
          </View>
        </View>
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
