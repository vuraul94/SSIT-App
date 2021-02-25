import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";

const AlergyHistory = ({
    name,
    alergyHistory,
    handleAlergy,
}) => {
  const [isSwitchAlergyOn, setIsSwitchAlergyOn] = useState(false);
  const [checkAntibiotics, setCheckAntibiotics] = useState(false);
  const [checkFood, setCheckFood] = useState(false);
  const [checkOtherAlergies, setCheckOtherAlergies] = useState(false);

  const onToggleAlergySwitch = () => setIsSwitchAlergyOn(!isSwitchAlergyOn);

  return (
    <>
      <Text>{name}</Text>
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
              value={alergyHistory[0]}
              onChangeText={(text) => handleAlergy(0, text)}
            />
          )}
          <Text>Sulfas</Text>
          <Checkbox
            status={alergyHistory[1] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handleAlergy(1, "Sulfas");
            }}
          />
          <Text>Aines</Text>
          <Checkbox
            status={alergyHistory[2] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handleAlergy(2, "Aines");
            }}
          />
          <Text>Anestésia</Text>
          <Checkbox
            status={alergyHistory[3] !== "" ? "checked" : "unchecked"}
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
              value={alergyHistory[4]}
              onChangeText={(text) => handleAlergy(4, text)}
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
              value={alergyHistory[5]}
              onChangeText={(text) => handleAlergy(5, text)}
            />
          )}
        </>
      )}
    </>
  );
};

export default AlergyHistory;
