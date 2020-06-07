import React from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";

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
    <View style={styles.buttonContainer}>
      <Button title="Take a picture" color="#393e46" />
    </View>
    <View style={styles.buttonContainer}>
      <Button title="Submit" color="#00adb5" />
    </View>
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
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: 35,
  },
});

export default Registration;
