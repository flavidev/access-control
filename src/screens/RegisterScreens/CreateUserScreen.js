import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";
import UserDetailsBox from "../../components/UserDetailsBox";
import { Ionicons } from "@expo/vector-icons";

const CreateUserScreen = ({ navigation, route }) => {

  const newUser = route.params.newUser

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: route.params.newUser.userPhoto }}
        style={{ height: 360, width: 270, borderRadius: 14, marginBottom:20,
          transform: [{ rotateY: '180deg' }]
        }}
        
      />
              <UserDetailsBox
                firstName={newUser.firstName}
                lastName={newUser.lastName}
                accessLevel={newUser.accessLevel}
              />

      <TouchableOpacity
        onPress={() => navigation.navigate("RegistrationFormScreen")}
      >
        <View style={{ flexDirection: "row", flex: 1, marginTop: 50 }}>
          <Ionicons
            name="ios-trash"
            size={50}
            color="red"
            style={{ marginHorizontal: 80 }}
          />
          <Ionicons
            name="ios-undo"
            size={50}
            color="#393e46"
            style={{ marginHorizontal: 80 }}
          />
        </View>
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
