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
import UserDetailsBox from "../../components/UserDetailsBox";

function RegisterPhotoScreen({ route, navigation }) {
  const newUser = {
    firstName: route.params.firstName,
    lastName: route.params.lastName,
    accessLevel: route.params.accessLevel,
  };

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

  async function saveToGallery(photo) {
    const asset = await MediaLibrary.createAssetAsync(photo);
    const asset_info = await MediaLibrary.getAssetInfoAsync(asset);
    console.log(asset_info);
    newUser.userPhoto = asset_info.localUri;
    createAndReviewUserDetails();
  }

  function createAndReviewUserDetails() {
    navigation.navigate("CreateUserScreen", { newUser });
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
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
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <Image
              source={{ uri: capturedPhoto }}
              style={{
                width: 270,
                height: 360,
                borderRadius: 20,

                // fix inverted image preview when using front camera
                transform:
                  type === Camera.Constants.Type.back
                    ? [{ rotateY: "0deg" }]
                    : [{ rotateY: "180deg" }],
              }}
            />
            <View style={{ marginTop: 40 }}>
              <UserDetailsBox
                firstName={newUser.firstName}
                lastName={newUser.lastName}
                accessLevel={newUser.accessLevel}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginVertical: 30, marginHorizontal: 70 }}
                onPress={() => setOpenPreview(false)}
              >
                <Ionicons name="md-close-circle" size={50} color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginVertical: 30, marginHorizontal: 70 }}
                onPress={() => (
                  saveToGallery(capturedPhoto), setOpenPreview(false)
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

export default RegisterPhotoScreen;
