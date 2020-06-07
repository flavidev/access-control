import React from "react";
import { View, Text } from "react-native";
import PhotoBooth from "../src/components/PhotoBooth";
import Constants from "expo-constants";

const Identify = () => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeigh,
      }}
    >
      <Text style={{ alignSelf: "center", marginTop: 50 }}>IDENTIFY</Text>
      <PhotoBooth />
    </View>
  );
};

export default Identify;
