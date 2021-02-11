import React from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const BasicInformation = ({
  photo,
  setPhoto,
  name,
  setName,
  firstLastName,
  setFirstLastName,
  secondLastName,
  setSecondLastName,
}) => {
  return (
    <>
      <Button
        icon="camera"
        mode="contained"
        onPress={
          (() => {
            launchCamera({
              mediaType: "photo",
              quality: 1,
              includeBase64: true,
            });
          },
          (res, rej) => {
            console.log(res.uri);
          })
        }
      ></Button>
      <TextInput label="Nombre" mode="outlined" />
      <TextInput label="Primer Apellido" mode="outlined" />
      <TextInput label="Segudo Apellido" mode="outlined" />
    </>
  );
};

export default BasicInformation;
