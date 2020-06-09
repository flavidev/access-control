import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { connect } from "react-redux";
import { deleteUser } from "../src/actions/user";

function Item({ firstName, lastName, accessLevel }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemField}>
        <Text style={styles.titleMenu}>First Name:</Text>
        <Text style={styles.titleName}>{firstName}</Text>
      </View>
      <View style={styles.itemField}>
        <Text style={styles.titleMenu}>Last Name:</Text>
        <Text style={styles.titleName}>{lastName}</Text>
      </View>
      <View style={styles.itemField}>
        <Text style={styles.titleMenu}>Access Level:</Text>
        <Text style={styles.titleName}>{accessLevel}</Text>
      </View>
    </View>
  );
}

function Edit({ users, deleteUser }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => deleteUser(item.key)}>
            <Item
              firstName={item.firstName}
              lastName={item.lastName}
              accessLevel={item.accessLevel}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `key:${item.key}`}
      />
      <TouchableOpacity onPress={() => console.log(users)} style={{marginBottom:20, marginLeft:10}}>
        <Text>ConsoleLog</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    width: 350,
    height: 100,
    backgroundColor: "#393e46",
    margin: 20,
    padding: 8,
    borderRadius: 14,
    justifyContent: "center",
  },
  itemField: {
    flex:1,
    flexDirection: "row",
    justifyContent:"center",

  },
  titleMenu: {
    flex:0.6,
    fontSize: 18,
    color: "#00adb5",
    
  },
  titleName: {
    flex:1,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    
  },
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    users: state.usersReducer.userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (key) => dispatch(deleteUser(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
