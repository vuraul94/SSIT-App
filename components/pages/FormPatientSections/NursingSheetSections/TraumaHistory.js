import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";

const TraumaHistory = ({ name, traumaHistory, setTraumaHistory}) => {
  const [isSwitchTraumaHistoryOn, setIsSwitchTraumaHistoryOn] = useState(false);
  const onToggleTraumaHistorySwitch = () =>
    setIsSwitchTraumaHistoryOn(!isSwitchTraumaHistoryOn);

  const [checkTraumaHistory, setCheckTraumaHistory] = useState(false);

  return (
    <>
      <Text>{name}</Text>
      <Switch
        value={isSwitchTraumaHistoryOn}
        onValueChange={onToggleTraumaHistorySwitch}
      />
      {isSwitchTraumaHistoryOn && (
        <>
          <TextInput
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
