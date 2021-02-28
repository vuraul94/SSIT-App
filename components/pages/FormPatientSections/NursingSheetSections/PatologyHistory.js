import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";

const PatologyHistory = ({ name, patologicalHistory, handlePatology }) => {
  const [isSwitchPatologyOn, setIsSwitchPatologyOn] = useState(
    patologicalHistory.find((history) => history !== "")
  );
  const [checkOtherPatology, setOtherPatology] = useState(
    patologicalHistory[patologicalHistory.length - 1] !== ""
  );

  const onTogglePatalogySwitch = () =>
    setIsSwitchPatologyOn(!isSwitchPatologyOn);

  return (
    <>
      <Text>{name}</Text>
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
            status={patologicalHistory[1] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(1, "HTA");
            }}
          />
          <Text>Hipotiroidismo</Text>
          <Checkbox
            status={patologicalHistory[2] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(2, "Hipotiroidismo");
            }}
          />
          <Text>AR</Text>
          <Checkbox
            status={patologicalHistory[3] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(3, "AR");
            }}
          />
          <Text>Enfermedades Inmunológicas</Text>
          <Checkbox
            status={patologicalHistory[4] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(4, "Enfermedades Inmunológicas");
            }}
          />
          <Text>LES</Text>
          <Checkbox
            status={patologicalHistory[5] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(5, "LES");
            }}
          />
          <Text>Asma</Text>
          <Checkbox
            status={patologicalHistory[6] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(6, "Asma");
            }}
          />
          <Text>Dicromatopsias</Text>
          <Checkbox
            status={patologicalHistory[7] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(7, "Dicromatopsias");
            }}
          />
          <Text>Cáncer</Text>
          <Checkbox
            status={patologicalHistory[8] !== "" ? "checked" : "unchecked"}
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
              value={patologicalHistory[9]}
              onChangeText={(text) => handlePatology(9, text, true)}
            />
          )}
        </>
      )}
    </>
  );
};

export default PatologyHistory;
