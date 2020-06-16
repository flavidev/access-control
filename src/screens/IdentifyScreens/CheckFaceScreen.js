import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import Constants from "expo-constants";
import { connect } from "react-redux";
import { RNS3 } from "react-native-aws3";

import API_KEYS from "../../../credentials";

function CheckFaceScreen({ navigation, selectedUser, users }) {
  const user = users.find((x) => x.id === selectedUser);
  const sourcePhoto = user.userPhoto;

  const camRef = useRef(null);
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [inputPhotoURL, setInputPhotoURL] = useState("");
  const [matchPhotoURL, setMatchPhotoURL] = useState("");

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

  //Upload Photos to AWS Bucket
  function uploadFaces(inputPhoto, matchPhoto) {
    const fileInputPhoto = {
      uri: inputPhoto,
      name: "inputPhoto.jpg",
      type: "image/jpg",
    };

    const fileMatchPhoto = {
      uri: matchPhoto,
      name: "matchPhoto.jpg",
      type: "image/jpg",
    };

    const options = {
      bucket: "access-control-cs50m-2020",
      region: "us-east-2",
      accessKey: API_KEYS.ACCESS,
      secretKey: API_KEYS.SECRET,
      successActionStatus: 201,
    };

    RNS3.put(fileInputPhoto, options).then((response) => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      setInputPhotoURL(response.body.postResponse.location);
    });

    RNS3.put(fileMatchPhoto, options).then((response) => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      setMatchPhotoURL(response.body.postResponse.location);
    });

    //console.log(inputPhotoURL, matchPhotoURL)
    compareUploadedFaces();
  }

  async function compareUploadedFaces() {
    // compare faces and return if it is the same person, alert or navigate to userdetails

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
                  uploadFaces(user.userPhoto, capturedPhoto),
                  setOpenPreview(false)
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
