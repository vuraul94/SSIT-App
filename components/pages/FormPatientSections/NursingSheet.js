import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";

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
}) => {
  const [text, setText] = useState("");
  const [isSwitchPatologyOn, setIsSwitchPatologyOn] = useState(false);
  const [checkOtherPatology, setOtherPatology] = useState(false);
  const [isSwitchAlergyOn, setIsSwitchAlergyOn] = useState(false);
  const [isSwitchMedicamentOn, setIsSwitchMedicamentOn] = useState(false);
  const [checkAntibiotics, setCheckAntibiotics] = useState(false);
  const [checkFood, setCheckFood] = useState(false);
  const [checkOtherAlergies, setCheckOtherAlergies] = useState(false);
  const onTogglePatalogySwitch = () =>
    setIsSwitchPatologyOn(!isSwitchPatologyOn);
  const onToggleAlergySwitch = () => setIsSwitchAlergyOn(!isSwitchAlergyOn);
  const onToggleMedicamentSwitch = () =>
    setIsSwitchMedicamentOn(!isSwitchMedicamentOn);

  const handlePatology = (index, value) => {
    let newPatologicalHistory = patologicalHistory;
    newPatologicalHistory[index] =
      newPatologicalHistory[index] !== "" ? "" : value;
    setPatologicalHistory(newPatologicalHistory);
  };
  
  const handleAlergy = (index, value) => {
    const newAlergyHistory = alergyHistory;
    newAlergyHistory[index] = newAlergyHistory[index] !== "" ? "" : value;
    setAlergyHistory(newAlergyHistory);
  };

  return (
    <ScrollView>
      <View>
        <Text>{pathologicalCatalog[0].Name}</Text>
        <Switch
          value={isSwitchPatologyOn}
          onValueChange={onTogglePatalogySwitch}
        />
        {isSwitchPatologyOn && (
          <>
            <Text>DM-2</Text>
            <Checkbox
              status={patologicalHistory[0] !== "" ? "checked" : "unchecked"}
              onPress={() => {
                handlePatology(0, "DM-2");
              }}
            />
            <Text>HTA</Text>
            <Checkbox
              status={patologicalHistory[0] !== "" ? "checked" : "unchecked"}
              onPress={() => {
                handlePatology(1, "HTA");
              }}
            />
            <Text>Hipotiroidismo</Text>
            <Checkbox
              status={patologicalHistory[0] !== "" ? "checked" : "unchecked"}
              onPress={() => {
                handlePatology(2, "Hipotiroidismo");
              }}
            />
            <Text>AR</Text>
            <Checkbox
              status={patologicalHistory[0] !== "" ? "checked" : "unchecked"}
              onPress={() => {
                handlePatology(3, "AR");
              }}
            />
            <Text>Enfermedades Inmunológicas</Text>
            <Checkbox
              status={patologicalHistory[0] !== "" ? "checked" : "unchecked"}
              onPress={() => {
                handlePatology(4, "Enfermedades Inmunológicas");
              }}
            />
            <Text>LES</Text>
            <Checkbox
              status={patologicalHistory[0] !== "" ? "checked" : "unchecked"}
              onPress={() => {
                handlePatology(5, "LES");
              }}
            />
            <Text>Asma</Text>
            <Checkbox
              status={patologicalHistory[0] !== "" ? "checked" : "unchecked"}
              onPress={() => {
                handlePatology(6, "Asma");
              }}
            />
            <Text>Dicromatopsias</Text>
            <Checkbox
              status={patologicalHistory[0] !== "" ? "checked" : "unchecked"}
              onPress={() => {
                handlePatology(7, "Dicromatopsias");
              }}
            />
            <Text>Cáncer</Text>
            <Checkbox
              status={patologicalHistory[0] !== "" ? "checked" : "unchecked"}
              onPress={() => {
                handlePatology(8, "Cáncer");
              }}
            />
            <Text>Otros</Text>
            <Checkbox
              status={checkOtherPatology ? "checked" : "unchecked"}
              onPress={() => {
                setOtherPatology(!checkOtherPatology);
              }}
            />
            {checkOtherPatology && (
              <TextInput
                label="Detalles"
                mode="outlined"
                value={text}
                onChangeText={(text) => handlePatology(9, `(${text})`)}
              />
            )}
          </>
        )}
        <Text>{pathologicalCatalog[1].Name}</Text>
        <Switch
          value={isSwitchMedicamentOn}
          onValueChange={onToggleMedicamentSwitch}
        />
        {isSwitchMedicamentOn && (
          <>
            <Text>Gotas, cremas, inhaladores, pastillas de uso crónico:</Text>
            <TextInput
              label="Detalles"
              mode="outlined"
              value={text}
              onChangeText={(text) => setMedicamentHistory(text)}
            />
          </>
        )}
        <Text>{pathologicalCatalog[2].Name}</Text>
        <Switch value={isSwitchAlergyOn} onValueChange={onToggleAlergySwitch} />
        {isSwitchAlergyOn && (
          <>
            <Text>Antibióticos</Text>
            <Checkbox
              status={checkAntibiotics ? "checked" : "unchecked"}
              onPress={() => {
                setCheckAntibiotics(!checkAntibiotics);
              }}
            />
            {checkAntibiotics && (
              <TextInput
                label="Detalles"
                placeholder="¿Cuáles antibioticos?"
                mode="outlined"
                value={text}
                onChangeText={(text) => handleAlergy(0, `(${text})`)}
              />
            )}
            <Text>Sulfas</Text>
            <Checkbox
              status={alergyHistory[0] !== "" ? "checked" : "unchecked"}
              onPress={() => {
                handleAlergy(1, "Sulfas");
              }}
            />
            <Text>Aines</Text>
            <Checkbox
              status={alergyHistory[0] !== "" ? "checked" : "unchecked"}
              onPress={() => {
                handleAlergy(2, "Aines");
              }}
            />
            <Text>Anestésia</Text>
            <Checkbox
              status={alergyHistory[0] !== "" ? "checked" : "unchecked"}
              onPress={() => {
                handleAlergy(3, "Anestésia");
              }}
            />
            <Text>Alimentos</Text>
            <Checkbox
              status={checkFood ? "checked" : "unchecked"}
              onPress={() => {
                setCheckFood(!checkFood);
              }}
            />
            {checkFood && (
              <TextInput
                label="Detalles"
                mode="outlined"
                value={text}
                onChangeText={(text) => handleAlergy(4, `(${text})`)}
              />
            )}
            <Text>Otros</Text>
            <Checkbox
              status={checkOtherAlergies ? "checked" : "unchecked"}
              onPress={() => {
                setCheckOtherAlergies(!checkOtherAlergies);
              }}
            />
            {checkOtherAlergies && (
              <TextInput
                label="Detalles"
                mode="outlined"
                value={text}
                onChangeText={(text) => handleAlergy(5, `(${text})`)}
              />
            )}
          </>
        )}
        <Text>{pathologicalCatalog[3].Name}</Text>
        <Text>{pathologicalCatalog[4].Name}</Text>
        <Text>{pathologicalCatalog[5].Name}</Text>
        <Text>{pathologicalCatalog[6].Name}</Text>
      </View>
    </ScrollView>
  );
};

export default NursingSheet;
