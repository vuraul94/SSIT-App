import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";

const PersonalHistory = ({
  name,
  personalHistory,
  handlePersonalHistory,
  handleGlassesList,
  handleCotactLens,
  checkGlassesList,
  checkContactLensList,
}) => {
  const [isSwitchPersonalHistoryOn, setIsSwitchPersonalHistoryOn] = useState(
    false
  );

  const [checkDrugs, setDrugs] = useState(false);

  const onTogglePersonalHistorySwitch = () =>
    setIsSwitchPersonalHistoryOn(!isSwitchPersonalHistoryOn);

  return (
    <>
      <Text>{name}</Text>
      <Switch
        value={isSwitchPersonalHistoryOn}
        onValueChange={onTogglePersonalHistorySwitch}
      />
      {isSwitchPersonalHistoryOn && (
        <>
          <Text>Tabaco</Text>
          <Checkbox
            status={personalHistory[0] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePersonalHistory(0, "Tabaco");
            }}
          />
          <Text>Alcohol</Text>
          <Checkbox
            status={personalHistory[1] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePersonalHistory(1, "Alcohol");
            }}
          />
          <Text>Drogas</Text>
          <Checkbox
            status={checkDrugs ? "checked" : "unchecked"}
            onPress={() => {
              setDrugs(!checkDrugs);
            }}
          />
          {checkDrugs && (
            <TextInput
              label="Detalles"
              mode="outlined"
              value={personalHistory[2]}
              onChangeText={(text) => handlePersonalHistory(2, text, true)}
            />
          )}
          <Text>Horas de exposición a dispositivos electrónicos</Text>
          <TextInput
            keyboardType="number-pad"
            label="Horas de exposición"
            mode="outlined"
            value={personalHistory[3]}
            onChangeText={(text) => handlePersonalHistory(3, text, true)}
          />
          <Text>Usuario de anteojos</Text>
          <Checkbox
            status={personalHistory[4] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePersonalHistory(4, "Ok");
            }}
          />
          {personalHistory[4] !== "" && (
            <>
              <Text>Bifocales</Text>
              <Checkbox
                status={checkGlassesList[0] !== "" ? "checked" : "unchecked"}
                onPress={() => {
                  handleGlassesList(0, "Bifocales");
                }}
              />
              <Text>Visión sencilla</Text>
              <Checkbox
                status={checkGlassesList[1] !== "" ? "checked" : "unchecked"}
                onPress={() => {
                  handleGlassesList(1, "Visión sencilla");
                }}
              />
              <Text>Progresivos</Text>
              <Checkbox
                status={checkGlassesList[2] !== "" ? "checked" : "unchecked"}
                onPress={() => {
                  handleGlassesList(2, "Progresivos");
                }}
              />
            </>
          )}
          <Text>Usuario de lentes de contacto</Text>
          <Checkbox
            status={personalHistory[5] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePersonalHistory(5, "Ok");
            }}
          />
          {personalHistory[5] !== "" && (
            <>
              <Text>Blandos</Text>
              <Checkbox
                status={
                  checkContactLensList[0] !== "" ? "checked" : "unchecked"
                }
                onPress={() => {
                  handleCotactLens(0, "Blandos");
                }}
              />
              <Text>Híbridos</Text>
              <Checkbox
                status={
                  checkContactLensList[1] !== "" ? "checked" : "unchecked"
                }
                onPress={() => {
                  handleCotactLens(1, "Híbridos");
                }}
              />
              <Text>Esclerales</Text>
              <Checkbox
                status={
                  checkContactLensList[2] !== "" ? "checked" : "unchecked"
                }
                onPress={() => {
                  handleCotactLens(2, "Esclerales");
                }}
              />
              <Text>Tóricos</Text>
              <Checkbox
                status={
                  checkContactLensList[3] !== "" ? "checked" : "unchecked"
                }
                onPress={() => {
                  handleCotactLens(3, "Tóricos");
                }}
              />
              <Text>Gas Permeable</Text>
              <Checkbox
                status={
                  checkContactLensList[4] !== "" ? "checked" : "unchecked"
                }
                onPress={() => {
                  handleCotactLens(4, "Gas Permeable");
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default PersonalHistory;
