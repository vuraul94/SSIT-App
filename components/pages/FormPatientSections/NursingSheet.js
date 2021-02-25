import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";
import PatologyHistory from "./NursingSheetSections/PatologyHistory";
import MedicamentHistory from "./NursingSheetSections/MedicamentHistory";
import AlergyHistory from "./NursingSheetSections/AlergyHistory";
import PersonalHistory from "./NursingSheetSections/PersonalHistory";
import HeritageHistory from "./NursingSheetSections/HeritageHistory";
import TraumaHistory from "./NursingSheetSections/TraumaHistory";
import OphthalmologistHistory from "./NursingSheetSections/OphthalmologistHistory";

const NursingSheet = ({
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
  pathologicalCatalog,
  checkGlassesList,
  setCheckGlassesList,
  checkContactLensList,
  setCheckContactLensList,
}) => {
  const [checkManager, setCheckMager] = useState(false);

  const handlePatology = (index, value) => {
    let newPatologicalHistory = patologicalHistory;
    newPatologicalHistory[index] =
      newPatologicalHistory[index] !== "" ? "" : value;
    setPatologicalHistory(newPatologicalHistory);
    setCheckMager(!checkManager);
  };

  const handleAlergy = (index, value) => {
    let newAlergyHistory = alergyHistory;
    newAlergyHistory[index] = newAlergyHistory[index] !== "" ? "" : value;
    setAlergyHistory(newAlergyHistory);
    setCheckMager(!checkManager);
  };

  const handlePersonalHistory = (index, value) => {
    let newPersonalHistory = personalHistory;
    newPersonalHistory[index] = newPersonalHistory[index] !== "" ? "" : value;
    setPatologicalHistory(newPersonalHistory);
    setCheckMager(!checkManager);
  };

  const handleGlassesList = (index, value) => {
    let newCheckGlassesList = checkGlassesList;
    newCheckGlassesList[index] = newCheckGlassesList[index] !== "" ? "" : value;
    setCheckGlassesList(newCheckGlassesList);
    setCheckMager(!checkManager);
    console.log(checkGlassesList[index]);
  };

  const handleCotactLens = (index, value) => {
    let newCheckContactLensList = checkContactLensList;
    newCheckContactLensList[index] =
      newCheckContactLensList[index] !== "" ? "" : value;
    setCheckContactLensList(newCheckContactLensList);
    setCheckMager(!checkManager);
  };

  const handleHeritageHistory = (index, value) => {
    let newHeritageHistory = heritageHistory;
    newHeritageHistory[index] = newHeritageHistory[index] !== "" ? "" : value;
    setHeritageHistory(newHeritageHistory);
    setCheckMager(!checkManager);
  };

  const handleOphthalmologistHistory = (index, value) => {
    let newOphthalmologistHistory = ophthalmologistHistory;
    newOphthalmologistHistory[index] = newOphthalmologistHistory[index] !== "" ? "" : value;
    setOphthalmologistHistory(newOphthalmologistHistory);
    setCheckMager(!checkManager);
  };

  return (
    <ScrollView>
      <View>
        <PatologyHistory
          name={pathologicalCatalog[0].Name}
          patologicalHistory={patologicalHistory}
          handlePatology={handlePatology}
        />
        <MedicamentHistory
          name={pathologicalCatalog[1].Name}
          medicamentHistory={medicamentHistory}
          setMedicamentHistory={setMedicamentHistory}
        />
        <AlergyHistory
          name={pathologicalCatalog[2].Name}
          alergyHistory={alergyHistory}
          handleAlergy={handleAlergy}
        />
        <PersonalHistory
          name={pathologicalCatalog[3].Name}
          personalHistory={personalHistory}
          handlePersonalHistory={handlePersonalHistory}
          handleGlassesList={handleGlassesList}
          handleCotactLens={handleCotactLens}
          checkGlassesList={checkGlassesList}
          checkContactLensList={checkContactLensList}
        />
        <HeritageHistory
          name={pathologicalCatalog[4].Name}
          heritageHistory={heritageHistory}
          handleHeritageHistory={handleHeritageHistory}
        />
        <TraumaHistory
          name={pathologicalCatalog[5].Name}
          traumaHistory={traumaHistory}
          setTraumaHistory={setTraumaHistory}
        />
        <OphthalmologistHistory
          name={pathologicalCatalog[6].Name}
          ophthalmologistHistory={ophthalmologistHistory}
          handleOphthalmologistHistory={handleOphthalmologistHistory}
        />
      </View>
    </ScrollView>
  );
};

export default NursingSheet;
