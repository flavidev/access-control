import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";
import UserDetailsBox from "../../components/UserDetailsBox";
import { Ionicons } from "@expo/vector-icons";

import { connect } from "react-redux";
import { deleteUser } from "../../actions/user";

const UserDetailsScreen = ({ navigation, deleteUser, users, selectedUser }) => {
  const user = users.find((x) => x.id === selectedUser);

  if (!user) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.userPhoto }}
        style={{
          height: 360,
          width: 270,
          borderRadius: 14,
          marginVertical: 20,
          transform: [{ rotateY: "180deg" }],
        }}
      />
      <View style={{ flex: 1 }}>
        <UserDetailsBox
          id={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          accessLevel={user.accessLevel}
        />
      </View>

      <View style={{ flexDirection: "row", flex: 0.2, marginVertical: 50 }}>
        <TouchableOpacity
          onPress={async () => (
            await deleteUser(user.id), navigation.goBack()
          )}
        >
          <Ionicons
            name="md-remove-circle"
            size={50}
            color="red"
            style={{ marginHorizontal: 80 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
  return {
    users: state.userReducer.userList,
    selectedUser: state.userReducer.selectedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsScreen);
