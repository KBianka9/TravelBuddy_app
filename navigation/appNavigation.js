import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import PlaceSearcherScreen from "../screens/PlaceSearcherScreen";
import RoutePlannerScreen from "../screens/RoutePlannerScreen";
import ReviewsScreen from "../screens/ReviewsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import useAuth from "../hooks/useAuth";
import { theme } from "../theme";
import {
  HomeIcon as HomeOutline,
  MapIcon as MapOutline,
  ListBulletIcon as ListBulletOutline,
  UserIcon as UserOutline,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeSolid,
  MapIcon as MapSolid,
  ListBulletIcon as ListBulletSolid,
  UserIcon as UserSolid,
} from "react-native-heroicons/solid";
import { View } from "react-native";
import HotelScreen from "../screens/HotelScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import FavoriteHotelsListScreen from "../screens/FavoriteHotelsListScreen";
import PackingListScreen from "../screens/PackingListScreen";
import NewReviewScreen from "../screens/NewReviewScreen";
import AddTripScreen from "../screens/AddTripScreen";
import RecentTripScreen from "../screens/RecentTripScreen";
import BucketListScreen from "../screens/BucketListScreen";
import MemoriesScreen from "../screens/MemoriesScreen";
import LookAtTheMapScreen from "../screens/LookAtTheMapScreen";
import EditingOnTheMapScreen from "../screens/EditingOnTheMapScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  const { user } = useAuth();
  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PlaceSearcher">
          <Stack.Screen name="PlaceSearcher" options={{ headerShown: false }} component={NavBar} />
          <Stack.Screen name="Hotel" options={{ headerShown: false }} component={HotelScreen} />
          <Stack.Screen name="RoutePlanner" options={{ headerShown: false }} component={RoutePlannerScreen} />
          <Stack.Screen name="RecentTrip" options={{ headerShown: false }} component={RecentTripScreen} />
          <Stack.Screen name="LookAtTheMap" options={{ headerShown: false }} component={LookAtTheMapScreen} />
          <Stack.Screen name="AddTrip" options={{ headerShown: false }} component={AddTripScreen} />
          <Stack.Screen name="EditingOnTheMap" options={{ headerShown: false }} component={EditingOnTheMapScreen} />
          <Stack.Screen name="Reviews" options={{ headerShown: false }} component={ReviewsScreen} />
          <Stack.Screen name="NewReview" options={{ headerShown: false }} component={NewReviewScreen} />
          <Stack.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
          <Stack.Screen name="EditProfile" options={{ headerShown: false }} component={EditProfileScreen} />
          <Stack.Screen name="BucketList" options={{ headerShown: false }} component={BucketListScreen} />
          <Stack.Screen name="Memories" options={{ headerShown: false }} component={MemoriesScreen} />
          <Stack.Screen name="FavoriteHotelsList" options={{ headerShown: false }}
                        component={FavoriteHotelsListScreen} />
          <Stack.Screen name="PackingList" options={{ headerShown: false }} component={PackingListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function NavBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.iconOn,
        headerShown: false,
        tabBarIcon: ({ focused }) => menuIcons(route, focused),
        tabBarStyle: {
          height: 70,
          backgroundColor: theme.navBarC,
          paddingBottom: 10,
          paddingTop: 10,
        },
      })}>
      <Tab.Screen name="Hotels" component={PlaceSearcherScreen} />
      <Tab.Screen name="Route Planner" component={RoutePlannerScreen} />
      <Tab.Screen name="Reviews" component={ReviewsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const menuIcons = (route, focused) => {
  let icon;
  if (route.name === "Hotels") {
    icon = focused ? <HomeSolid size="30" color={theme.iconOn} /> :
      <HomeOutline size="30" strokeWidth={2} color={theme.iconOff} />;
  } else if (route.name === "Route Planner") {
    icon = focused ? <MapSolid size="30" color={theme.iconOn} /> :
      <MapOutline size="30" strokeWidth={2} color={theme.iconOff} />;
  } else if (route.name === "Reviews") {
    icon = focused ? <ListBulletSolid size="30" color={theme.iconOn} /> :
      <ListBulletOutline size="30" strokeWidth={2} color={theme.iconOff} />;
  } else if (route.name === "Profile") {
    icon = focused ? <UserSolid size="30" color={theme.iconOn} /> :
      <UserOutline size="30" strokeWidth={2} color={theme.iconOff} />;
  }
  return (
    <View>
      {icon}
    </View>
  );
};
