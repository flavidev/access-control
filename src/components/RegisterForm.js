import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { addUser } from "../actions/user";

function RegisterForm({ addUser, navigation }) {
  const Foo = { firstName: "Foo", lastName: "Bar", accessLevel: "Zaz" };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accessLevel, setAccessLevel] = useState("");

  return (
    <View style={styles.container}>
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
      <TextInput
        style={styles.input}
        importantForAutofill="no"
        placeholder="Access Level"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(text) => setAccessLevel(text)}
      />

      <TouchableOpacity onPress={() => navigation.navigate("PhotoBooth")}>
        <Text style={styles.nextScreen}>Take a Profile Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          firstName !== "" && lastName !== "" && accessLevel !== ""
            ? addUser({
                firstName: firstName,
                lastName: lastName,
                accessLevel: accessLevel,
              })
            : alert("Please fill the form and take a picture")
        }
      >
        <Text style={styles.nextScreen}>Add User</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(RegisterForm);
