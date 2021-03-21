import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Camera } from "expo-camera";
import { useHistory } from "react-router-dom";
import { IconButton } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    padding: "4%",
    flex: 1,
    justifyContent: "center",
  },
  image_btn: {
    alignSelf: "center",
    width: 200,
  },
  photo: {
    marginBottom: 20,
    height: 160,
    width: 160,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  camera: {
    marginBottom: 20,
    height: 160,
    width: 160,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  input: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
});

const BasicInformation = ({
  photo,
  setPhoto,
  name,
  setName,
  lastNames,
  setLastNames,
  setProvince,
  setCanton,
  setDistrict,
}) => {
  let history = useHistory();
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const snap = () => {
    if (photo) {
      setPhoto(null);
    } else {
      let snapshot = cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0,
      });
      snapshot.then((res, rej) => {
        setPhoto(`data:image/jpg;base64,${res.base64}`);
      });
    }
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <Image
          style={styles.photo}
          source={{
            uri: photo,
          }}
        />
      ) : (
        hasPermission && (
          <Camera
            style={styles.camera}
            pictureSize="1"
            type={Camera.Constants.Type.back}
            ref={cameraRef}
          ></Camera>
        )
      )}

      <Button
        icon="camera"
        mode="contained"
        style={styles.image_btn}
        onPress={snap}
      >
        {photo ? "Elimninar Foto" : "Tomar Foto"}
      </Button>

      <TextInput
        style={styles.input}
        label="Nombre"
        mode="outlined"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        label="Apellidos"
        mode="outlined"
        value={lastNames}
        onChangeText={setLastNames}
      />
    </View>
  );
};

export default BasicInformation;
