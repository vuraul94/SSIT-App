import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Camera } from "expo-camera";
import { useHistory } from "react-router-dom";
import { IconButton } from "react-native-paper";

const styles = StyleSheet.create({
  container: {},
  image_btn: {
    width: "80%",
    marginTop: 10,
    marginLeft: "10%",
  },
  photo: {
    marginBottom: 20,
    height: 200, 
    width: 200, 
    alignSelf: "center",
  },
  camera:{
    marginBottom: 20,
    height: 200,
    width: 200,
    alignSelf: "center",
  },
  input:{
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
    <>
      <IconButton
        icon="chevron-left"
        onPress={() => {
          if(
            history.entries[history.entries.length - 2].pathname === "/search"
          ){
            setProvince("P1");
            setCanton("C1");
            setDistrict("D1");
          }
          history.goBack();
        }}
      />

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
            ratio="3:2"
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
      ></Button>

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
    </>
  );
};

export default BasicInformation;
