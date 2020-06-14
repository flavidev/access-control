import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";
import UserDetailsBox from "../../components/UserDetailsBox";
import { Ionicons } from "@expo/vector-icons";

import { connect } from "react-redux";
import { deleteUser } from "../../actions/user";

const UserDetailsScreen = ({ navigation, route, deleteUser, users }) => {
  let userId = route.params.item
    ? route.params.item.id
    : route.params.user.id;
  const user = users.find((x) => x.id === userId);

  //const user = route.params.user;

  return (
    <View style={styles.container}>
      {user.userPhoto && (

        <Image
        source={{ uri: user.userPhoto }}
        style={{
          height: 360,
          width: 270,
          borderRadius: 14,
          marginBottom: 20,
          transform: [{ rotateY: "180deg" }],
        }}
        />
        )}

      <UserDetailsBox
        id={user.id}
        firstName={user.firstName}
        lastName={user.lastName}
        accessLevel={user.accessLevel}
      />

      <View style={{ flexDirection: "row", flex: 1, marginTop: 50 }}>
        <TouchableOpacity
          onPress={() => (
            navigation.goBack(),
            setTimeout(() => {
              deleteUser(user.id);
            }, 1000)
          )}
        >
          <Ionicons
            name="ios-trash"
            size={50}
            color="red"
            style={{ marginHorizontal: 80 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="ios-undo"
            size={50}
            color="#393e46"
            style={{ marginHorizontal: 80 }}
          />
        </TouchableOpacity>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsScreen);
