import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput, RadioButton, Checkbox } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PersonalInformation = ({
  gender,
  setGender,
  bornDate,
  setBornDate,
  ocupation,
  setOcupation,
  healthcare,
  setHealthcare,
}) => {
  const [checked, setChecked] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setDatePickerVisibility(false);
  };

  return (
    <>
      <Text>Género</Text>
      <RadioButton.Group
        onValueChange={(newValue) => setGender(newValue)}
        value={gender}
      >
        <View>
          <Text>Masculino</Text>
          <RadioButton value="masculino" />
        </View>
        <View>
          <Text>Femenino</Text>
          <RadioButton value="femenino" />
        </View>
      </RadioButton.Group>
      <Text>Fecha de nacimiento</Text>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <Button mode="contained" onPress={() => setDatePickerVisibility(true)}>
        Pick time
      </Button>

      <TextInput
        label="Ocupación"
        mode="outlined"
        multiline
        numberOfLines={5}
      />
      <Text>Seguro de salud</Text>
      <Checkbox
        status={checked ? "checked" : "unchecked"}
        onPress={() => {
          setChecked(!checked);
        }}
      />
    </>
  );
};

export default PersonalInformation;
