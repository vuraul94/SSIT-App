import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";
import CheckTab from "../../../ui/CheckTab";

const styles = StyleSheet.create({

  innerContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: "16%"
  },

  innerText: {
    marginTop: 8,
    marginBottom: 15,
    paddingRight: 50,
    left: 10,
  },
  input: {
    marginLeft: 15,
    marginBottom: 20,
    marginRight: 15,
  },
});

const AlergyHistory = ({ name, alergyHistory, handleAlergy }) => {
  const [isSwitchAlergyOn, setIsSwitchAlergyOn] = useState(
    alergyHistory.find((history) => history !== "")
  );
  const [checkAntibiotics, setCheckAntibiotics] = useState(
    alergyHistory[0] !== ""
  );
  const [checkFood, setCheckFood] = useState(
    alergyHistory[alergyHistory.length - 2] !== ""
  );
  const [checkOtherAlergies, setCheckOtherAlergies] = useState(
    alergyHistory[alergyHistory.length - 1] !== ""
  );

  const onToggleAlergySwitch = () => setIsSwitchAlergyOn(!isSwitchAlergyOn);

  return (
    <>
      <CheckTab
        name={name}
        checkOn={isSwitchAlergyOn}
        setCheckOn={onToggleAlergySwitch}
      >
        <View style={styles.innerContainer}>
          <Checkbox
            status={checkAntibiotics ? "checked" : "unchecked"}
            onPress={() => {
              setCheckAntibiotics(!checkAntibiotics);
            }}
          />
          <Text style={styles.innerText}>Antibióticos</Text>
        </View>
        {checkAntibiotics && (
          <TextInput
            style={styles.input}
            label="Detalles"
            placeholder="¿Cuáles antibioticos?"
            mode="outlined"
            value={alergyHistory[0]}
            onChangeText={(text) => handleAlergy(0, text, true)}
          />
        )}
        <View style={styles.innerContainer}>
          <Checkbox
            status={alergyHistory[1] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handleAlergy(1, "Sulfas");
            }}
          />
          <Text style={styles.innerText}>Sulfas</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={alergyHistory[2] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handleAlergy(2, "Aines");
            }}
          />
          <Text style={styles.innerText}>Aines</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={alergyHistory[3] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handleAlergy(3, "Anestésia");
            }}
          />
          <Text style={styles.innerText}>Anestésia</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={checkFood ? "checked" : "unchecked"}
            onPress={() => {
              setCheckFood(!checkFood);
            }}
          />
          <Text style={styles.innerText}>Alimentos</Text>
        </View>
        {checkFood && (
          <TextInput
            style={styles.input}
            label="Detalles"
            mode="outlined"
            value={alergyHistory[4]}
            onChangeText={(text) => handleAlergy(4, text, true)}
          />
        )}
        <View style={styles.innerContainer}>
          <Checkbox
            status={checkOtherAlergies ? "checked" : "unchecked"}
            onPress={() => {
              setCheckOtherAlergies(!checkOtherAlergies);
            }}
          />
          <Text style={styles.innerText}>Otros</Text>
        </View>
        {checkOtherAlergies && (
          <TextInput
            style={styles.input}
            label="Detalles"
            mode="outlined"
            value={alergyHistory[5]}
            onChangeText={(text) => handleAlergy(5, text, true)}
          />
        )}
      </CheckTab>
    </>
  );
};

export default AlergyHistory;
