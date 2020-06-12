import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";
import UserDetails from "../../components/UserDetails";

const CreateUserScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: route.params.newUser.userPhoto }}
        style={{ height: 360, width: 270 }}
      />
      <UserDetails field={route.params.newUser.firstName} />
      <UserDetails field={route.params.newUser.lastName} />
      <UserDetails field={route.params.newUser.accessLevel} />

      <TouchableOpacity
        onPress={() => navigation.navigate("RegistrationFormScreen")}
      >

      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
  },
});

export default CreateUserScreen;
