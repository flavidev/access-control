import React from "react";
import { Text, View } from "react-native";

const NumberInput = (props) => {
  return (
    <View
      style={{
        width: 90,
        height: 90,
        backgroundColor: "#393e46",
        justifyContent: "center",
        borderRadius: 14,
        margin: 15,
      }}
    >
      <Text
        style={{
          padding: 8,
          color: "white",
          fontSize: 50,
          fontWeight: "500",
          alignSelf: "center",
        }}
      >
        {props.number}
      </Text>
    </View>
  );
};

export default NumberInput;
