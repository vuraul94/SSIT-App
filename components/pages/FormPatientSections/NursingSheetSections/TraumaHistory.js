import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";
import CheckTab from "../../../ui/CheckTab";

const TraumaHistory = ({
  name,
  traumaHistory,
  setTraumaHistory,
  checkTab,
  setCheckTab,
}) => {
  const styles = StyleSheet.create({
    input: {
      marginLeft: 15,
      marginBottom: 20,
      marginRight: 15,
      paddingHorizontal: "4%",
    },
  });

  return (
    <>
      <CheckTab name={name} checkOn={checkTab} setCheckOn={setCheckTab}>
        <>
          <TextInput
            style={styles.input}
            label="Detalles"
            mode="outlined"
            value={traumaHistory}
            onChangeText={(text) => setTraumaHistory(text)}
          />
        </>
      </CheckTab>
    </>
  );
};

export default TraumaHistory;
