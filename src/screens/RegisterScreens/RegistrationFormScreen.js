import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";
import Constants from "expo-constants";



const RegistrationFormScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accessLevel, setAccessLevel] = useState("");

  return (
    <View style={styles.container}>

      <Image
        source={require("../../../assets/image.png")}
        style={{ height: 230, width: 230, margin: 20, borderRadius: 14 }}
      />
      <TextInput
        style={styles.input}
        importantForAutofill="no"
        placeholder="First Name"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        importantForAutofill="no"
        placeholder="Last Name"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(text) => setLastName(text)}
      />
      <View
        style={{
          width: 350,
          height: 55,
          margin: 20,
          padding: 8,
          borderRadius: 14,
          borderWidth: 1,
          backgroundColor: "#393e46",
          justifyContent: "center",
        }}
      >
        <Picker
          selectedValue={accessLevel}
          style={{
            color: "white",
          }}
          onValueChange={(itemValue, itemIndex) => setAccessLevel(itemValue)}
        >
          <Picker.Item label="Select Access Level" value="" />
          <Picker.Item label="A1" color="black" value="A1" />
          <Picker.Item label="B2" value="B2" />
          <Picker.Item label="C3" value="C3" />
          <Picker.Item label="VIP" value="VIP" />
        </Picker>
      </View>

      <TouchableOpacity
        onPress={() =>
          firstName !== "" && lastName !== "" && accessLevel !== ""
            ? navigation.navigate("RegisterPhotoScreen", {
                firstName,
                lastName,
                accessLevel,
              })
            : alert("Please fill all the fields")
        }
      >
        <Text style={styles.nextScreen}>Add User</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
  },
});

export default RegistrationFormScreen;
