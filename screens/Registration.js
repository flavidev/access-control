import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native-gesture-handler";


const Registration = ({ params }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="First Name"
      autoCapitalize="none"
      placeholderTextColor="white"
    />
    <TextInput
      style={styles.input}
      placeholder="Last Name"
      autoCapitalize="none"
      placeholderTextColor="white"
    />
    <TextInput
      style={styles.input}
      placeholder="ID Number"
      autoCapitalize="none"
      placeholderTextColor="white"
      keyboardType="number-pad"
    />
    <TextInput
      style={styles.input}
      placeholder="Access Level"
      autoCapitalize="none"
      placeholderTextColor="white"
      keyboardType="number-pad"
    />

      <TouchableOpacity>
        <Text style={styles.nextScreen}>Take a Profile Picture</Text>
      </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: "#393e46",
    margin: 20,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  nextScreen: {
    width: 350,
    height: 55,
    backgroundColor: "#00adb5",
    margin: 20,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold"
  },


  });


    

export default Registration;
