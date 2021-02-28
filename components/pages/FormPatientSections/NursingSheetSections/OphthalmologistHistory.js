import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";

const OphtalmologistHistory = ({
  name,
  ophthalmologistHistory,
  handleOphthalmologistHistory,
}) => {
  const [
    isSwitchOphthalmologistHistoryOn,
    setIsSwitchOphthalmologistHistoryOn,
  ] = useState(ophthalmologistHistory.find((history) => history !== ""));
  const [checkConsultation, setCheckConsultation] = useState(ophthalmologistHistory[0]!==""||ophthalmologistHistory[1]!=="");
  const [checkSurgery, setCheckSurgery] = useState(ophthalmologistHistory[2]!=="");

  const onToggleOphthalmologistHistorySwitch = () => {
    setIsSwitchOphthalmologistHistoryOn(!isSwitchOphthalmologistHistoryOn);
  };


  return (
    <>
      <Text>{name}</Text>
      <Switch
        value={isSwitchOphthalmologistHistoryOn}
        onValueChange={onToggleOphthalmologistHistorySwitch}
      />
      {isSwitchOphthalmologistHistoryOn && (
        <>
          <Text>Consultas</Text>
          <Checkbox
            status={checkConsultation ? "checked" : "unchecked"}
            onPress={() => {
              setCheckConsultation(!checkConsultation);
            }}
          />
          {checkConsultation && (
            <>
              <TextInput
                label="Detalles de la consulta"
                mode="outlined"
                value={ophthalmologistHistory[0]}
                onChangeText={(text) =>
                  handleOphthalmologistHistory(0, text, true)
                }
              />
              <Text>Diagnóstico de la consulta</Text>
              <TextInput
                label="Detalles"
                mode="outlined"
                value={ophthalmologistHistory[1]}
                onChangeText={(text) =>
                  handleOphthalmologistHistory(1, text, true)
                }
              />
            </>
          )}
          <Text>Cirugías</Text>
          <Checkbox
            status={checkSurgery ? "checked" : "unchecked"}
            onPress={() => {
              setCheckSurgery(!checkSurgery);
            }}
          />
          {checkSurgery && (
            <>
              <TextInput
                label="¿Cuáles?¿Cuándo?"
                mode="outlined"
                value={ophthalmologistHistory[2]}
                onChangeText={(text) =>
                  handleOphthalmologistHistory(2, text, true)
                }
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default OphtalmologistHistory;
