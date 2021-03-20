import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";
import CheckTab from "../../../ui/CheckTab";

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    paddingHorizontal: "4%",
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
      <CheckTab
        name={name}
        checkOn={isSwitchMedicamentOn}
        setCheckOn={onToggleMedicamentSwitch}
      >
        <View style={styles.innerContainer}>
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
        </View>
      </CheckTab>
    </>
  );
};

export default MedicamentHistory;
