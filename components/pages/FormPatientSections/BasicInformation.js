import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Camera } from "expo-camera";
import { useHistory } from "react-router-dom";
import { IconButton } from "react-native-paper";

const styles = StyleSheet.create({
  container: {},
  image_btn: {},
});

const BasicInformation = ({
  photo,
  setPhoto,
  name,
  setName,
  lastNames,
  setLastNames,
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
        console.log(res);
        setPhoto(`data:image/jpg;base64,${res.base64}`);
      });
    }
  };

  return (
    <>
      <IconButton icon="step-backward" onPress={history.goBack} />

      {photo ? (
        <Image
          style={{ height: 200, width: 200, alignSelf: "center" }}
          source={{
            uri: photo,
          }}
        />
      ) : (
        hasPermission && (
          <Camera
            style={{
              height: 200,
              width: 200,
              alignSelf: "center",
            }}
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
        label="Nombre"
        mode="outlined"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        label="Apellidos"
        mode="outlined"
        value={lastNames}
        onChangeText={setLastNames}
      />
    </>
  );
};

export default BasicInformation;
