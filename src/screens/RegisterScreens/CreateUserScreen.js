import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CreateUserScreen = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity
      onPress={()=>navigation.navigate("RegistrationFormScreen") }
      >
      <Text>RegistrationFormScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});


export default CreateUserScreen;
