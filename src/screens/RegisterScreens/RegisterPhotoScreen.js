import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";


const RegisterPhotoScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={()=>navigation.navigate("CreateUserScreen") }
      >

      <Text>RegisterPhotoScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:Constants.statusBarHeight,
    alignItems:"center"
  }
});


export default RegisterPhotoScreen;
