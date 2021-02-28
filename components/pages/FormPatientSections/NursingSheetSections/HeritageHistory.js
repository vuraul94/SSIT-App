import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";

const HeritageHistory = ({ name, heritageHistory, handleHeritageHistory }) => {
  const [isSwitchHeritageHistoryOn, setIsSwitchHeritageHistoryOn] = useState(
    heritageHistory.find((history) => history !== "")
  );

  const [checkEyeDisease, setEyeDisease] = useState(heritageHistory[heritageHistory.length-2]!=="");
  const [checkOtherHeritageHistory, setOtherHeritageHistory] = useState(heritageHistory[heritageHistory.length-1]!=="");

  const onToggleHeritageHistorySwitch = () =>
    setIsSwitchHeritageHistoryOn(!isSwitchHeritageHistoryOn);
  return (
    <>
      <Text>{name}</Text>
      <Switch
        value={isSwitchHeritageHistoryOn}
        onValueChange={onToggleHeritageHistorySwitch}
      />
      {isSwitchHeritageHistoryOn && (
        <>
          <Text>Glaucoma</Text>
          <Checkbox
            status={heritageHistory[0] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handleHeritageHistory(0, "Glaucoma");
            }}
          />
          <Text>Ceguera</Text>
          <Checkbox
            status={heritageHistory[1] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handleHeritageHistory(1, "Ceguera");
            }}
          />
          <Text>Ectasia Corneal</Text>
          <Checkbox
            status={heritageHistory[2] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handleHeritageHistory(2, "Ectasia Corneal");
            }}
          />
          <Text>Enfermedades Oculares</Text>
          <Checkbox
            status={checkEyeDisease ? "checked" : "unchecked"}
            onPress={() => {
              setEyeDisease(!checkEyeDisease);
            }}
          />
          {checkEyeDisease && (
            <TextInput
              label="Detalles"
              mode="outlined"
              value={heritageHistory[3]}
              onChangeText={(text) => handleHeritageHistory(3, text, true)}
            />
          )}
          <Text>Otros</Text>
          <Checkbox
            status={checkOtherHeritageHistory ? "checked" : "unchecked"}
            onPress={() => {
              setOtherHeritageHistory(!checkOtherHeritageHistory);
            }}
          />
          {checkOtherHeritageHistory && (
            <TextInput
              label="Detalles"
              mode="outlined"
              value={heritageHistory[4]}
              onChangeText={(text) => handleHeritageHistory(4, text, true)}
            />
          )}
        </>
      )}
    </>
  );
};

export default HeritageHistory;
