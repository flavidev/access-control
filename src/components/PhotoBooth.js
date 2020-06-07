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
import { FontAwesome } from "@expo/vector-icons";

export default function PhotoBooth() {
  const camRef = useRef(null);
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePicture() {
    const data = await camRef.current.takePictureAsync();
    setCapturedPhoto(data.uri);
    setOpenPreview(true);
    console.log(data);
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
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}

      <TouchableOpacity
        style={styles.cameraButtonContainer}
        onPress={takePicture}
      >
        <FontAwesome name="camera" size={23} color="#FFF" />
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
            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={() => setOpenPreview(false)}
            >
              <FontAwesome name="window-close" size={50} />
            </TouchableOpacity>
            <Image
              source={{ uri: capturedPhoto }}
              style={{ width: "100%", height: 300, borderRadius: 20 }}
            />
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
    backgroundColor: "#393e46",
    margin: 20,
    borderRadius: 10,
    height: 50,
  },
});
