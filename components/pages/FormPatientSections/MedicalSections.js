import React, { useState } from "react";
import { View, Modal, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import Header from "../../ui/Header";
import NursingSheetForm from "./NursingSheetForm";

let ScreenHeight = Dimensions.get("window").height - 220;

const styles = StyleSheet.create({
  container: {
    minHeight: ScreenHeight,
    flex: 1,
    justifyContent: "center",
  },
  sectionBtn:{
      
  },
  backBtn:{

  }
});

const MedicalSections = ({
  patologicalHistory,
  medicamentHistory,
  alergyHistory,
  personalHistory,
  heritageHistory,
  traumaHistory,
  ophthalmologistHistory,
  setPatologicalHistory,
  setMedicamentHistory,
  setAlergyHistory,
  setPersonalHistory,
  setHeritageHistory,
  setTraumaHistory,
  setOphthalmologistHistory,
  checkGlassesList,
  setCheckGlassesList,
  checkContactLensList,
  setCheckContactLensList,
}) => {
    
  const [nursingVisible, setNursingVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        icon="stethoscope"
        onPress={() => setNursingVisible(true)}
      >
        Hoja de Enfermería
      </Button>
      <Modal visible={nursingVisible}>
        <View
          style={{ position: "absolute", top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <Header></Header>
          <Button onPress={() => setNursingVisible(false)}>
            {" "}
            {"<"} Regresar{" "}
          </Button>
          <ScrollView>
            <NursingSheetForm
              patologicalHistory={patologicalHistory}
              medicamentHistory={medicamentHistory}
              alergyHistory={alergyHistory}
              personalHistory={personalHistory}
              heritageHistory={heritageHistory}
              traumaHistory={traumaHistory}
              ophthalmologistHistory={ophthalmologistHistory}
              setPatologicalHistory={setPatologicalHistory}
              setMedicamentHistory={setMedicamentHistory}
              setAlergyHistory={setAlergyHistory}
              setPersonalHistory={setPersonalHistory}
              setHeritageHistory={setHeritageHistory}
              setTraumaHistory={setTraumaHistory}
              setOphthalmologistHistory={setOphthalmologistHistory}
              setCheckGlassesList={setCheckGlassesList}
              checkGlassesList={checkGlassesList}
              setCheckContactLensList={setCheckContactLensList}
              checkContactLensList={checkContactLensList}
              ophthalmologistHistory={ophthalmologistHistory}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default MedicalSections;
