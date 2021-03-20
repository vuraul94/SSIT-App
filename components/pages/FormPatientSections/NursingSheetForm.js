import React, { useContext, useState } from "react";
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
import { CatalogContext } from "../../providers/CatalogProvider";

const NursingSheetForm = ({
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
  const { pathologicalCatalog } = useContext(CatalogContext);
  const [checkManager, setCheckMager] = useState(false);

  const handlePatology = (index, value, isText = false) => {
    let newPatologicalHistory = patologicalHistory;
    if (isText) {
      newPatologicalHistory[index] = value;
    } else {
      newPatologicalHistory[index] =
        newPatologicalHistory[index] !== "" ? "" : value;
    }
    setPatologicalHistory(newPatologicalHistory);
    setCheckMager(!checkManager);
  };

  const handleAlergy = (index, value, isText = false) => {
    let newAlergyHistory = alergyHistory;
    if (isText) {
      newAlergyHistory[index] = value;
    } else {
      newAlergyHistory[index] = newAlergyHistory[index] !== "" ? "" : value;
    }
    setAlergyHistory(newAlergyHistory);
    setCheckMager(!checkManager);
  };

  const handlePersonalHistory = (index, value, isText = false) => {
    let newPersonalHistory = personalHistory;
    if (isText) {
      newPersonalHistory[index] = value;
    } else {
      newPersonalHistory[index] = newPersonalHistory[index] !== "" ? "" : value;
    }
    setPersonalHistory(newPersonalHistory);
    setCheckMager(!checkManager);
  };

  const handleGlassesList = (index, value, isText = false) => {
    let newCheckGlassesList = checkGlassesList;
    if (isText) {
      newCheckGlassesList[index] = value;
    } else {
      newCheckGlassesList[index] =
        newCheckGlassesList[index] !== "" ? "" : value;
    }
    setCheckGlassesList(newCheckGlassesList);
    setCheckMager(!checkManager);
  };

  const handleCotactLens = (index, value, isText = false) => {
    let newCheckContactLensList = checkContactLensList;
    if (isText) {
      newCheckContactLensList[index] = value;
    } else {
      newCheckContactLensList[index] =
        newCheckContactLensList[index] !== "" ? "" : value;
    }
    setCheckContactLensList(newCheckContactLensList);
    setCheckMager(!checkManager);
  };

  const handleHeritageHistory = (index, value, isText = false) => {
    let newHeritageHistory = heritageHistory;
    if (isText) {
      newHeritageHistory[index] = value;
    } else {
      newHeritageHistory[index] = newHeritageHistory[index] !== "" ? "" : value;
    }
    setHeritageHistory(newHeritageHistory);
    setCheckMager(!checkManager);
  };

  const handleOphthalmologistHistory = (index, value, isText = false) => {
    let newOphthalmologistHistory = ophthalmologistHistory;
    if (isText) {
      newOphthalmologistHistory[index] = value;
    } else {
      newOphthalmologistHistory[index] =
        newOphthalmologistHistory[index] !== "" ? "" : value;
    }
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

export default NursingSheetForm;
