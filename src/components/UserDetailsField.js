import React from "react";
import { Text, View } from "react-native";

const UserDetailsField = (props) => {
  return (
    <View
      style={{
        width: 350,
        height: 55,
        backgroundColor: "#393e46",
        justifyContent: "center",
        borderRadius: 14,
        margin: 10,
      }}
    >
      <Text
        style={{
          padding: 8,
          color: "white",
          fontSize: 18,
          fontWeight: "500",
          alignSelf:"center"
        }}
      >
        {props.field}
      </Text>
    </View>
  );
};

export default UserDetailsField;
