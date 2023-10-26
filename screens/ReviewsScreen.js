import React from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import ReviewCard from "../components/reviewCard";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import Carousel from "react-native-snap-carousel";
import { reviewItems } from "../constants";
import { PlusIcon } from "react-native-heroicons/solid";

export default function ReviewsScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
      <SafeAreaView>
        <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 mt-8 mb-2 mx-4">
          <TextInput placeholder="Search a city" className="p-4 flex-1 font-semibold text-gray-700" />
          <TouchableOpacity className="rounded-full p-2 mr-2"
                            style={{ backgroundColor: theme.background }}>
            <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"></MagnifyingGlassIcon>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/*Review cards*/}
      <View className="py-2">
        <Carousel containerCustomStyle={{ overflow: "visible", borderRadius: 50 }}
                  data={reviewItems}
                  loop={true}
                  renderItem={({ item }) => <ReviewCard item={item} />}
                  firstItem={1}
                  inactiveSlideOpacity={0.75}
                  inactiveSlideScale={0.55}
                  sliderWidth={380}
                  itemWidth={240}
                  slideStyle={{ display: "flex", alignItems: "center" }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ shadowOpacity: 1 }}
                          onPress={() => navigation.navigate("NewReview")}
        >
          <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} duration={1000}
                           style={{
                             backgroundColor: theme.button,
                             borderRadius: 50,
                             padding: 10,
                             start: 310,
                             marginTop: -30,
                           }}
          >
            <PlusIcon size={40} strokeWidth={1} color={theme.iconOn} />
          </Animatable.View>
        </TouchableOpacity>
      </View>

    </View>
  );
}
