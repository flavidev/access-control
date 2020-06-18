import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import * as MediaLibrary from "expo-media-library";
import { connect } from "react-redux";

import { uploadFaces } from "../../external_calls/";

function CheckFaceScreen({ navigation, selectedUser, users }) {
  const user = users.find((x) => x.id === selectedUser);
  const sourcePhoto = user.userPhoto;

  const camRef = useRef(null);
  const isFocused = useIsFocused();
  const [isReady, setIsReady] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [capturedPhoto, setCapturedPhoto] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        (await Camera.requestPermissionsAsync(),
        await MediaLibrary.requestPermissionsAsync());
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera or library</Text>;
  }

  async function takePicture() {
    const data = await camRef.current.takePictureAsync();
    setCapturedPhoto(data.uri);
    setOpenPreview(true);
  }

  async function handleSubmit() {
    (await uploadFaces(sourcePhoto, capturedPhoto))
      ? (setIsReady(true),
        navigation.navigate("UserDetailsScreen"),
        alert("Access Granted!"))
      : (setIsReady(true),
        navigation.navigate("TypeIdScreen"),
        alert("Access Denied!"));
  }

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={50} color="#00adb5" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginTop: Constants.statusBarHeight,
      }}
    >
      {isFocused && (
        <Camera style={{ flex: 1 }} type={type} ref={camRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
                alignItems: "center",
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons
                name="ios-refresh"
                size={35}
                color="white"
                style={{ marginBottom: 15, marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <View style={{ alignContent: "flex-start" }}>
        <TouchableOpacity
          style={styles.cameraButtonContainer}
          onPress={takePicture}
        >
          <Ionicons name="ios-camera" size={50} color="white" />
        </TouchableOpacity>
      </View>

      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={openPreview}>
          <View
            style={{
              flex: 1,
              margin: 20,
              alignItems: "center",
            }}
          >
            <View style={{ flex: 5, marginTop: 100 }}>
              <Image
                source={{ uri: capturedPhoto }}
                style={{
                  width: 300,
                  height: 400,
                  borderRadius: 20,

                  // fix inverted image preview when using front camera
                  transform:
                    type === Camera.Constants.Type.back
                      ? [{ rotateY: "0deg" }]
                      : [{ rotateY: "180deg" }],
                }}
              />
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginHorizontal: 80 }}
                onPress={() => setOpenPreview(false)}
              >
                <Ionicons name="md-close-circle" size={50} color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginHorizontal: 80 }}
                onPress={() => (
                  setOpenPreview(false), setIsReady(false), handleSubmit()
                )}
              >
                <Ionicons name="ios-checkmark-circle" size={50} color="green" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00adb5",
    margin: 20,

    borderRadius: 10,
    height: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    users: state.userReducer.userList,
    selectedUser: state.userReducer.selectedUser,
  };
};

export default connect(mapStateToProps, null)(CheckFaceScreen);
