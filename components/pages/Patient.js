import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, IconButton, Colors, Modal } from "react-native-paper";
import { useHistory, Redirect } from "react-router-dom";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import PatientData from "./PatientViews/PatientData";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#074c76",
  },
  button: {
    width: "80%",
    marginTop: 20,
    marginLeft: "5%",
    alignSelf: "center",
  },
  container: {
    minHeight: ScreenHeight,
    flex: 1,
    paddingTop: "20%",
  },
  navButtons: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginTop: -10,
    marginHorizontal: -10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxHeight: 40,
  },
});

let ScreenHeight = Dimensions.get("window").height - 190;

const Patient = ({
  token,
  preview = false,
  identificationNumber,
  createPatient,
  checkGlassesList,
  checkContactLensList,
  validateForm = () => true,
}) => {
  const [patientDataVisible, setPatientDataVisible] = useState(false);
  let history = useHistory();

  return (
    <>
      {(!preview || patientDataVisible) && (
        <View style={styles.navButtons}>
          <Button
            style={styles.buttonLeft}
            onPress={
              patientDataVisible
                ? () => setPatientDataVisible(false)
                : () => history.push("/search")
            }
          >
            {"<"} Atras
          </Button>
          <View style={{ minWidth: "40%" }}></View>
        </View>
      )}
      {(!token || token === "") && <Redirect to="/" />}
      {!patientDataVisible ? (
        <View style={styles.container}>
          <Text style={styles.text}>Seleccione la acción a realizar</Text>
          <Button
            mode="contained"
            icon="pencil"
            style={styles.button}
            onPress={() => history.push("/create")}
          >
            Modificar Paciente
          </Button>

          <Button
            mode="contained"
            icon="clipboard-account"
            style={styles.button}
            onPress={() => setPatientDataVisible(true)}
          >
            Acceder a Información
          </Button>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <PatientData
            identificationNumber={identificationNumber}
            checkGlassesList={checkGlassesList}
            checkContactLensList={checkContactLensList}
          />
        </ScrollView>
      )}
    </>
  );
};

export default Patient;
