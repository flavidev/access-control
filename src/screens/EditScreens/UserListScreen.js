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
import { deleteUser } from "../../actions/user";
import UserDetailsBox from "../../components/UserDetailsBox";


function Item({ firstName, lastName, accessLevel, id }) {
  return (
    <UserDetailsBox
      firstName={firstName}
      lastName={lastName}
      accessLevel={accessLevel}
      id={id}
    />
  );
}

function userListScreen({ users, navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("UserDetailsScreen", {item})}>
            <Item
              id={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              accessLevel={item.accessLevel}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `key:${item.id}`}
      />
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    users: state.userReducer.userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(userListScreen);
