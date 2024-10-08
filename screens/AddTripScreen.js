import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon, MinusIcon, PlusIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import * as Animatable from "react-native-animatable";
import openMap from "react-native-open-maps";
import CalendarPicker from "react-native-calendar-picker";
import ImagePicker from "react-native-image-crop-picker";


export default function AddTripScreen() {
  const navigation = useNavigation();
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [destinationList, setDestinationList] = useState([{ destination: "" }]);
  const [selectCoverImage, setSelectCoverImage] = useState("");

  const day = ["27.11.", "28.11.", "29.11.", "30.11."];
  const handleAddTrip = () => {
    if (place && date) {
      navigation.navigate("RoutePlanner");
    } else {

    }
  };

  const handleDestinationAdd = () => {
    setDestinationList([...destinationList, { destination: "" }]);
  };

  const handleDestinationRemove = (index) => {
    const list = [...destinationList];
    list.splice(index, 1);
    setDestinationList(list);
  };

  const handleDestinationChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...destinationList];
    list[index][name] = value;
    setDestinationList(list);
  };

  function goToBudapest() {
    openMap({ latitude: 47.49715361442786, longitude: 19.057183488380094 });
  }

  const CoverImagePicker = async () => {
    try {
      await ImagePicker.openPicker({
        height: 310,
        cropping: true,
      }).then(image => {
        console.log(image, "image");
        setSelectCoverImage(image);
      });
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: theme.background }}>
      <TouchableOpacity onPress={() => CoverImagePicker()}>
        <Image
          source={!selectCoverImage ? (require("../src/assets/flat-lay-hands-holding-photos.jpg")) : { uri: selectCoverImage?.path }}
               style={{ height: 310 }}
               className="w-full absolute"
        />
      </TouchableOpacity>
      <SafeAreaView className="flex-row justify-between items-center mr-2 mt-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          style={{ backgroundColor: theme.button }}>
          <ArrowLeftIcon size="25" color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView className="flex-col flex-1 bg-white px-4 pt-6"
                  style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50, marginTop: 215 }}>
        <Text style={{ marginBottom: 10, textAlign: "center" }}>You can change cover image, if you click on it.</Text>
        <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 mb-4">
          <TextInput placeholder="Add a name of your trip" className="p-4 flex-1 font-semibold text-gray-700" />
        </View>
        <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 mb-4">
          <TextInput defaultValue={place} onChangeText={value => setPlace(value)} placeholder="Accommodation name"
                     className="p-4 flex-1 font-semibold text-gray-700" />
        </View>
        <View className="p-4">
          <Text className="font-bold text-2xl" style={{ color: theme.text }}>Select date</Text>
        </View>
        <View style={{ backgroundColor: theme.background, borderRadius: 20 }}>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            width={350}
            minDate={Date.now()}
            todayBackgroundColor={theme.iconOff}
            todayTextColor={theme.iconOn}
            selectedDayColor={theme.selectedDate}
            selectedDayTextColor={theme.iconOn}
            onDateChange={this.onDateChange}
          />
        </View>
        <View>
          <Text className="font-bold text-2xl"
                style={{ fontSize: 24, color: theme.text, marginTop: 15, textAlign: "center" }}>What would you like to
            visit on </Text>
        </View>
        {/*Day selector*/}
        <View style={{ flexDirection: "row", marginLeft: 80, marginTop: 20 }}>
          <SelectDropdown
            dropdownStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
            selectedRowStyle={{ backgroundColor: "white" }}
            buttonStyle={{ borderRadius: 30, backgroundColor: theme.searchInput }}
            dropdownIconPosition="right"
            defaultButtonText={"27.11."}
            data={day}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => item}
          />
          <Text className="font-bold text-2xl" style={{ fontSize: 24, color: theme.text, marginTop: 10 }}> ?</Text>
        </View>
        {destinationList.map((singleDestination, index) => (
          <View key={index}>
            <View className="flex-row justify-center items-center rounded-full p-1 bg-gray-200 ml-4 mr-20 mt-4">
              <TextInput defaultValue={singleDestination.destination}
                         onChange={(e) => handleDestinationChange(e, index)}
                         placeholder="Destination"
                         className="p-4 flex-1 font-semibold text-gray-700" />
              {destinationList.length > 1 &&
                (<TouchableOpacity style={{ shadowOpacity: 1, end: -60 }}
                                   onPress={() => handleDestinationRemove(index)}>
                    <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"}
                                     duration={1000}
                                     style={{ borderWidth: 0 }}>
                      <MinusIcon size="5" strokeWidth={2} color={theme.iconOn}
                                 style={{ backgroundColor: theme.decrementButton, borderRadius: 20, padding: 18 }} />
                    </Animatable.View>
                  </TouchableOpacity>
                )}
            </View>
            {destinationList.length - 1 === index && destinationList.length < 10 &&
              (<TouchableOpacity style={{ shadowOpacity: 10 }} onPress={handleDestinationAdd}>
                  <Animatable.View animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"}
                                   duration={1000}
                                   style={{ borderWidth: 0 }}>
                    <PlusIcon size="5" strokeWidth={2} color={theme.iconOn}
                              style={{
                                backgroundColor: theme.iconOnG,
                                borderRadius: 20,
                                padding: 20,
                                marginLeft: 297,
                                marginTop: 20,
                              }}
                    />
                  </Animatable.View>
                </TouchableOpacity>
              )}
          </View>
        ))}
        <View style={{ paddingLeft: 40, paddingRight: 180, marginTop: 10 }}>
          <TouchableOpacity onPress={goToBudapest}>
            <Text style={{
              backgroundColor: theme.button,
              color: "white",
              borderRadius: 50,
              padding: 10,
              fontWeight: "bold",
            }}>Editing on the map</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 40 }}>
          <TouchableOpacity className="py-3 rounded-full mb-20 mx-4" style={{ backgroundColor: theme.button }}
                            onPress={handleAddTrip}>
            <Text className="font-xl font-bold text-center text-white">Save trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
