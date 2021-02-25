import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";

const MedicamentHistory = ({
  name,
  medicamentHistory,
  setMedicamentHistory,
}) => {
  const [isSwitchMedicamentOn, setIsSwitchMedicamentOn] = useState(false);
  const onToggleMedicamentSwitch = () =>
    setIsSwitchMedicamentOn(!isSwitchMedicamentOn);

  return (
    <>
      <Text>{name}</Text>
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
            value={medicamentHistory}
            onChangeText={(text) => setMedicamentHistory(text)}
          />
        </>
      )}
    </>
  );
};

export default MedicamentHistory;
