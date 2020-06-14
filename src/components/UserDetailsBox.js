import React from "react";
import { Text, View, StyleSheet } from "react-native";

const UserDetailsBox = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemField}>
        <Text style={styles.titleMenu}>ID:</Text>
        <Text style={styles.titleName}>{props.id}</Text>
      </View>
      <View style={styles.itemField}>
        <Text style={styles.titleMenu}>First Name:</Text>
        <Text style={styles.titleName}>{props.firstName}</Text>
      </View>
      <View style={styles.itemField}>
        <Text style={styles.titleMenu}>Last Name:</Text>
        <Text style={styles.titleName}>{props.lastName}</Text>
      </View>
      <View style={styles.itemField}>
        <Text style={styles.titleMenu}>Access Level:</Text>
        <Text style={styles.titleName}>{props.accessLevel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 350,
    height: 150,
    backgroundColor: "#393e46",
    margin: 20,
    padding: 8,
    borderRadius: 14,
    justifyContent: "center",
  },
  itemField: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  titleMenu: {
    flex: 0.6,
    fontSize: 18,
    color: "#00adb5",
  },
  titleName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default UserDetailsBox;
