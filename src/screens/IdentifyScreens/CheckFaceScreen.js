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
import API_KEY from "../../../credentials";

function CheckFaceScreen({ navigation, selectedUser, users }) {
  const user = users.find((x) => x.id === selectedUser);
  const sourcePhoto = user.userPhoto;

  const camRef = useRef(null);
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
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

  //Cloudwise API Call
  async function compareFaces(inputPhoto, matchPhoto) {
    const CloudmersiveImageApiClient = await require("cloudmersive-image-api-client");
    const defaultClient = CloudmersiveImageApiClient.ApiClient.instance;

    // Configure API key authorization: Apikey
    const Apikey = await defaultClient.authentications["Apikey"];
    Apikey.apiKey = API_KEY;

    const apiInstance = new CloudmersiveImageApiClient.FaceApi();

    let inputImage = Buffer.from(fs.readFileSync(inputPhoto).buffer); // File | Image file to perform the operation on; this image can contain one or more faces which will be matched against face provided in the second image.  Common file formats such as PNG, JPEG are supported.

    let matchFace = Buffer.from(fs.readFileSync(matchPhoto).buffer); // File | Image of a single face to compare and match against.

    let callback = function (error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log("API called successfully. Returned data: " + data);
      }
    };
    return apiInstance.faceCompare(inputImage, matchFace, callback);
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
                  compareFaces(user.userPhoto, capturedPhoto), setOpenPreview(false)
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
