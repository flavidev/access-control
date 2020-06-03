import React from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";

const Identify = ({ params }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Identify</Text>

    <Image source={require("../assets/image.png")} style={styles.image} />

    <View style={styles.buttonContainer}>
      <Button title="Photo" color="#00adb5" />
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
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default Identify;

