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
import UserDetailsField from "../../components/UserDetailsField";

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
    newUser.userPhoto = asset_info.localUri;
    createAndReviewUserDetails();
  }

  function createAndReviewUserDetails() {
    navigation.navigate("CreateUserScreen", { newUser });
  }

  return (
    <View style={{ flex: 1 }}>
      {isFocused && (
        <Camera style={{ flex: 0.8 }} type={type} ref={camRef}>
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

      <TouchableOpacity
        style={styles.cameraButtonContainer}
        onPress={takePicture}
      >
        <Ionicons name="ios-camera" size={50} color="white" />
      </TouchableOpacity>

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
              style={{ width: 270, height: 360, borderRadius: 20 }}
            />
            <View style={{marginTop:20}}>
              <UserDetailsField field={newUser.firstName} />
              <UserDetailsField field={newUser.lastName} />
              <UserDetailsField field={newUser.accessLevel} />
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
