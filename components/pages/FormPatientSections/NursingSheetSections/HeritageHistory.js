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
  innerContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  switch: {
    marginTop: 20,
    position: "absolute",
    marginBottom: 30,
    right: 10,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    left: 10,
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

const HeritageHistory = ({ name, heritageHistory, handleHeritageHistory }) => {
  const [isSwitchHeritageHistoryOn, setIsSwitchHeritageHistoryOn] = useState(
    heritageHistory.find((history) => history !== "")
  );

  const [checkEyeDisease, setEyeDisease] = useState(
    heritageHistory[heritageHistory.length - 2] !== ""
  );
  const [checkOtherHeritageHistory, setOtherHeritageHistory] = useState(
    heritageHistory[heritageHistory.length - 1] !== ""
  );

  const onToggleHeritageHistorySwitch = () =>
    setIsSwitchHeritageHistoryOn(!isSwitchHeritageHistoryOn);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
        <Switch
          style={styles.switch}
          value={isSwitchHeritageHistoryOn}
          onValueChange={onToggleHeritageHistorySwitch}
        />
      </View>
      {isSwitchHeritageHistoryOn && (
        <>
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
        </>
      )}
    </>
  );
};

export default HeritageHistory;
