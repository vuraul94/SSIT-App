import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  switch: {
    marginTop: 20,
    position: "absolute",
    marginBottom: 30,
    right: 10,
  },
  text: {
    marginTop: 15,
    marginBottom: 10,
    left: 10,
  },
  input: {
    marginLeft: 15,
    marginBottom: 20,
    marginRight: 15,
  },
});

const MedicamentHistory = ({
  name,
  medicamentHistory,
  setMedicamentHistory,
}) => {
  const [isSwitchMedicamentOn, setIsSwitchMedicamentOn] = useState(
    medicamentHistory !== ""
  );
  const onToggleMedicamentSwitch = () =>
    setIsSwitchMedicamentOn(!isSwitchMedicamentOn);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
        <Switch
          style={styles.switch}
          value={isSwitchMedicamentOn}
          onValueChange={onToggleMedicamentSwitch}
        />
      </View>
      {isSwitchMedicamentOn && (
        <>
          <Text style={styles.text}>
            Gotas, cremas, inhaladores, pastillas de uso crónico:
          </Text>
          <TextInput
            style={styles.input}
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
