import React from "react";
import { Image, ScrollView, StyleSheet, Text, View} from "react-native";
import { Button, Divider, IconButton, Colors } from "react-native-paper";
import { useHistory, Redirect } from "react-router-dom";
import moment from "moment";
import { CONSTANTS } from "../../misc/constants";

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
  button: {
    width: "90%",
    marginTop: 20,
    marginLeft: "5%",
  },
  container:{
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  photo: {
    height: 200,
    width: 200, 
    alignSelf: "center",
    marginBottom: 25,
  },
  editBtn: {
    position: 'absolute',
    backgroundColor: "#d22936",
    marginBottom: 30,
    right: 15,
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
  province,
  canton,
  district,
  address,
  gender,
  birthDate,
  occupation,
  status,
  preview = false,
  createPatient,
  setProvince,
  setCanton,
  setDistrict,
  validateForm = () => true,
}) => {
  let history = useHistory();

  return (
    <>
      {(!token || token === "") && <Redirect to="/" />}
        <ScrollView>
          {!preview && (
            <>
              <IconButton
                icon="chevron-left"
                onPress={() => {
                  setProvince("P1");
                  setCanton("C1");
                  setDistrict("D1");
                  history.push("/search");
                }}
              />
              <IconButton
                style={styles.editBtn}
                color={Colors.white}
                icon="pencil"
                onPress={() => history.push("/create")}
              />
            </>
          )}
        <View style={styles.container}>
          {photo !== "" && (
            <Image
              style={styles.photo}
              source={{
                uri: photo,
              }}
            />
          )}
          <Text>
            <Text style={styles.label}>ID:</Text> {identificationNumber}
            {"\n"}
            {"\n"}
            <Text style={styles.label}>Apellidos:</Text>{" "}
            {lastNames && lastNames.trim() !== "" ? (
              lastNames
            ) : (
              <Text style={styles.error}>* El apellido es obligatorio</Text>
            )}
            {"\n"}
            {"\n"}
            <Text style={styles.label}>Nombre:</Text>{" "}
            {name && name.trim() !== "" ? (
              name
            ) : (
              <Text style={styles.error}>* El nombre es obligatorio</Text>
            )}
          </Text>
          <Divider />
          <Text>{"\n"}</Text>
          <Text>
            <Text style={styles.label}>Estado:</Text>{" "}
            {status && status !== 0 ? (
              status
            ) : (
              <Text style={styles.error}>* El estado es obligatorio</Text>
            )}
            {"\n"}
            {"\n"}
            <Text style={styles.label}>Género:</Text>{" "}
            {gender === 0 ? "Femenino" : "Masculino"}
            {"\n"}
            {"\n"}
            <Text style={styles.label}>Fecha de nacimiento:</Text>
            {birthDate && birthDate !== "" ? (
              moment(birthDate).format("DD/MM/YYYY")
            ) : (
              <Text style={styles.error}>* La fecha es obligatorio</Text>
            )}
            {"\n"}
            {"\n"}
            <Text style={styles.label}>Edad:</Text>{" "}
            {birthDate && birthDate !== "" ? (
              moment(birthDate).fromNow(true).replace("years", "años")
            ) : (
              <Text style={styles.error}>* La fecha es obligatorio</Text>
            )}
            {"\n"}
            {"\n"}
            <Text style={styles.label}>Ocupación:</Text>
            {occupation && occupation.trim() !== "" ? (
              occupation
            ) : (
              <Text style={styles.error}>* La ocupación es obligatorio</Text>
            )}
          </Text>
          <Divider />
          <Text>{"\n"}</Text>
          <Text>
            <Text style={styles.label}>Telefono:</Text>{" "}
            {phone && phone.trim() !== "" ? (
              CONSTANTS.REGEX.PHONE.test(phone) ? (
                phone
              ) : (
                <Text style={styles.error}>
                  * El telefono ingresado es invalido
                </Text>
              )
            ) : (
              <Text style={styles.error}>* El telefono es obligatorio</Text>
            )}
            {"\n"}
            {"\n"}
            <Text style={styles.label}>Correo:</Text>{" "}
            {email !== "" ? (
              CONSTANTS.REGEX.EMAIL.test(email) ? (
                email
              ) : (
                <Text style={styles.error}>
                  * El correo ingresado es invalido
                </Text>
              )
            ) : (
              "---"
            )}
            {"\n"}
            {"\n"}
            <Text style={styles.label}>Dirección:</Text>{" "}
            {(province !== "" &&
              canton !== "" &&
              district !== "" &&
              address) || (
              <Text style={styles.error}>
                * Los valores de dirección son necesarios (Provincia, Cantón,
                Distrito y Dirección)
              </Text>
            )}
            {"\n"}
            {"\n"}
          </Text>
          {!validateForm() && (
            <Text style={styles.error}>
              ** Corrija los errores en el formulario para poder enviar
            </Text>
          )}
          <Divider />
          {preview && (
            <Button
              style={styles.button}
              mode="contained"
              disabled={!validateForm()}
              onPress={() => createPatient(history)}
            >
              Crear/Actualizar
            </Button>
          )}
          </View>
        </ScrollView>
    </>
  );
};

export default Patient;
