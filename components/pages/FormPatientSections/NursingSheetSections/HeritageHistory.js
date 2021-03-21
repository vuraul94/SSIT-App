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

const HeritageHistory = ({
  name,
  heritageHistory,
  handleHeritageHistory,
  checkTab,
  setCheckTab,
}) => {
  const [checkEyeDisease, setEyeDisease] = useState(
    heritageHistory[heritageHistory.length - 2] !== ""
  );
  const [checkOtherHeritageHistory, setOtherHeritageHistory] = useState(
    heritageHistory[heritageHistory.length - 1] !== ""
  );

  return (
    <>
      <CheckTab name={name} checkOn={checkTab} setCheckOn={setCheckTab}>
        <View style={styles.innerContainer}>
          <Checkbox
            status={heritageHistory[0] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handleHeritageHistory(0, "Glaucoma");
            }}
          />
          <Text style={styles.innerText}>Glaucoma</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={heritageHistory[1] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handleHeritageHistory(1, "Ceguera");
            }}
          />
          <Text style={styles.innerText}>Ceguera</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={heritageHistory[2] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handleHeritageHistory(2, "Ectasia Corneal");
            }}
          />
          <Text style={styles.innerText}>Ectasia Corneal</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={checkEyeDisease ? "checked" : "unchecked"}
            onPress={() => {
              setEyeDisease(!checkEyeDisease);
            }}
          />
          <Text style={styles.innerText}>Enfermedades Oculares</Text>
        </View>
        {checkEyeDisease && (
          <TextInput
            style={styles.input}
            label="Detalles"
            mode="outlined"
            value={heritageHistory[3]}
            onChangeText={(text) => handleHeritageHistory(3, text, true)}
          />
        )}
        <View style={styles.innerContainer}>
          <Checkbox
            status={checkOtherHeritageHistory ? "checked" : "unchecked"}
            onPress={() => {
              setOtherHeritageHistory(!checkOtherHeritageHistory);
            }}
          />
          <Text style={styles.innerText}>Otros</Text>
        </View>
        {checkOtherHeritageHistory && (
          <TextInput
            style={styles.input}
            label="Detalles"
            mode="outlined"
            value={heritageHistory[4]}
            onChangeText={(text) => handleHeritageHistory(4, text, true)}
          />
        )}
      </CheckTab>
    </>
  );
};

export default HeritageHistory;
