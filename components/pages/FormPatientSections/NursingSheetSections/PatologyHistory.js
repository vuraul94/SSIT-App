import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";
import CheckTab from "../../../ui/CheckTab";

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: "16%",
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

const PatologyHistory = ({
  name,
  patologicalHistory,
  handlePatology,
  checkTab,
  setCheckTab,
}) => {
  const [checkOtherPatology, setOtherPatology] = useState(
    patologicalHistory[patologicalHistory.length - 1] !== ""
  );

  return (
    <>
      <CheckTab name={name} checkOn={checkTab} setCheckOn={setCheckTab }>
        <View style={styles.innerContainer}>
          <Checkbox
            status={patologicalHistory[0] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(0, "DM-2");
            }}
          />
          <Text style={styles.innerText}>DM-2</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={patologicalHistory[1] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(1, "HTA");
            }}
          />
          <Text style={styles.innerText}>HTA</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={patologicalHistory[2] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(2, "Hipotiroidismo");
            }}
          />
          <Text style={styles.innerText}>Hipotiroidismo</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={patologicalHistory[3] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(3, "AR");
            }}
          />
          <Text style={styles.innerText}>AR</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={patologicalHistory[4] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(4, "Enfermedades Inmunológicas");
            }}
          />
          <Text style={styles.innerText}>Enfermedades Inmunológicas</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={patologicalHistory[5] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(5, "LES");
            }}
          />
          <Text style={styles.innerText}>LES</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={patologicalHistory[6] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(6, "Asma");
            }}
          />
          <Text style={styles.innerText}>Asma</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={patologicalHistory[7] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(7, "Dicromatopsias");
            }}
          />
          <Text style={styles.innerText}>Dicromatopsias</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={patologicalHistory[8] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePatology(8, "Cáncer");
            }}
          />
          <Text style={styles.innerText}>Cáncer</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={checkOtherPatology ? "checked" : "unchecked"}
            onPress={() => {
              setOtherPatology(!checkOtherPatology);
            }}
          />
          <Text style={styles.innerText}>Otros</Text>
        </View>
        {checkOtherPatology && (
          <TextInput
            style={styles.input}
            label="Detalles"
            mode="outlined"
            value={patologicalHistory[9]}
            onChangeText={(text) => handlePatology(9, text, true)}
          />
        )}
      </CheckTab>
    </>
  );
};

export default PatologyHistory;
