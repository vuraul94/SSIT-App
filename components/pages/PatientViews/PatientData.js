import React, { useState } from "react";
import { View, StyleSheet, Text, Modal } from "react-native";
import { Button } from "react-native-paper";
import PersonalData from "./PersonalData";
import NursingSheetData from "./NursingSheetData";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#fff",
    margin: 8,
  },
  error: {
    color: "red",
  },
});

const PatientData = ({
  identificationNumber,
  createPatient,
  checkGlassesList,
  checkContactLensList,
  validateForm = () => true,
}) => {
  const [personalVisible, setPersonalVisible] = useState(false);
  const [nursingVisible, setNursingVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Button
        style={styles.btn}
        icon="card-account-details-outline"
        color="#074c76"
        onPress={() => setPersonalVisible(true)}
      >
        Datos Personales
      </Button>

      <Button
        style={styles.btn}
        icon="stethoscope"
        color="#074c76"
        onPress={() => setNursingVisible(true)}
      >
        Hoja de enfermería
      </Button>

      <Modal visible={personalVisible}>
        <PersonalData
          identificationNumber={identificationNumber}
          setVisible={setPersonalVisible}
        />
      </Modal>

      <Modal visible={nursingVisible}>
        <View>
          <NursingSheetData
            checkGlassesList={checkGlassesList}
            checkContactLensList={checkContactLensList}
            setVisible={setNursingVisible}
          />
        </View>
      </Modal>

      <Text>{"\n"}</Text>
      {!validateForm() && (
        <Text style={styles.error}>
          ** Corrija los errores en el formulario para poder enviar
        </Text>
      )}
    </View>
  );
};

export default PatientData;
