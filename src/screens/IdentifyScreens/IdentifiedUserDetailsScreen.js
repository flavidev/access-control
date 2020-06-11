import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";

const IdentifiedUserDetailsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={()=>navigation.navigate("TypeIdScreen") }
      >

      <Text>IdentifiedUserDetailsScreen</Text>
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


export default IdentifiedUserDetailsScreen;
