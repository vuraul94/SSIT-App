import moment from "moment";
import React from "react";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { Button, Divider, IconButton } from "react-native-paper";
import { useHistory, Redirect } from "react-router-dom";

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
  },
});

const Patient = ({
  token,
  identificationNumber,
  photo,
  name,
  lastNames,
  phone,
  email,
  address,
  gender,
  birthDate,
  occupation,
  health,
  preview = false,
  createPatient,
}) => {
  let history = useHistory();

  return (
    <>
      {(!token || token === "") && <Redirect to="/" />}
      <ScrollView>
        {!preview && (
          <>
            <IconButton
              icon="step-backward"
              onPress={() => history.push("/search")}
            />
            <IconButton icon="pencil" onPress={() => history.push("/create")} />
          </>
        )}
        <Image
          style={{ height: 200, width: 200, alignSelf: "center" }}
          source={{
            uri: photo,
          }}
        />
        <Text>
          <Text style={styles.label}>ID:</Text> {identificationNumber}
          {"\n"}
          {"\n"}
          <Text style={styles.label}>Apellidos:</Text> {lastNames}
          {"\n"}
          {"\n"}
          <Text style={styles.label}>Nombre:</Text> {name}
        </Text>
        <Divider />
        <Text>
          <Text style={styles.label}>Salud:</Text> {health}
          {"\n"}
          {"\n"}
          <Text style={styles.label}>Género:</Text>{" "}
          {gender === 0 ? "Femenino" : "Masculino"}
          {"\n"}
          {"\n"}
          <Text style={styles.label}>Fecha de nacimiento:</Text>
          {moment(birthDate).format("DD/MM/YYYY")}
          {"\n"}
          {"\n"}
          <Text style={styles.label}>Edad:</Text>{" "}
          {moment(birthDate).fromNow(true).replace("years", "años")}
          {"\n"}
          {"\n"}
          <Text style={styles.label}>Ocupación:</Text> {occupation}
          {"\n"}
          {"\n"}
        </Text>
        <Divider />
        <Text>
          <Text style={styles.label}>Telefono:</Text> {phone}
          {"\n"}
          {"\n"}
          <Text style={styles.label}>Correo:</Text> {email}
          {"\n"}
          {"\n"}
          <Text style={styles.label}>Dirección:</Text> {address}
          {"\n"}
          {"\n"}
        </Text>
        <Divider />
        {preview && (
          <Button mode="contained" onPress={() => createPatient(history)}>
            Crear
          </Button>
        )}
      </ScrollView>
    </>
  );
};

export default Patient;
