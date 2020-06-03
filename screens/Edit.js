import React from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";

const Edit = ({ params }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Edit</Text>

    <TextInput
      style={styles.input}
      placeholder="ID"
      autoCapitalize="none"
      placeholderTextColor="white"
      keyboardType="number-pad"
    />
    <View style={styles.buttonContainer}>
      <Button title="Search" color="#00adb5" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 25,
    color: "#00adb5",
    fontWeight: "bold",
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
    marginTop: 10,
  },
});

export default Edit;
