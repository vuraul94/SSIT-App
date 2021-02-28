import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";

const TraumaHistory = ({ name, traumaHistory, setTraumaHistory }) => {
  const [isSwitchTraumaHistoryOn, setIsSwitchTraumaHistoryOn] = useState(
    traumaHistory !== ""
  );
  const onToggleTraumaHistorySwitch = () =>
    setIsSwitchTraumaHistoryOn(!isSwitchTraumaHistoryOn);

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
      marginTop: 20,
      marginBottom: 10,
      left: 10,
    },
    input: {
      marginLeft: 15,
      marginBottom: 20,
      marginRight: 15,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
        <Switch
          style={styles.switch}
          value={isSwitchTraumaHistoryOn}
          onValueChange={onToggleTraumaHistorySwitch}
        />
      </View>
      {isSwitchTraumaHistoryOn && (
        <>
          <TextInput
            style={styles.input}
            label="Detalles"
            mode="outlined"
            value={traumaHistory}
            onChangeText={(text) => setTraumaHistory(text)}
          />
        </>
      )}
    </>
  );
};

export default TraumaHistory;
