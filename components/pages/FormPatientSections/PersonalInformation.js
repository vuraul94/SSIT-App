import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput, RadioButton, Checkbox } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PersonalInformation = ({
  gender,
  setGender,
  birthDate,
  setBirthDate,
  ocupation,
  setOcupation,
  health,
  setHealth,
}) => {
  const [checked, setChecked] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleBirthDate = (date) => {
    setBirthDate(date);
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
          <RadioButton value={1} />
        </View>
        <View>
          <Text>Femenino</Text>
          <RadioButton value={0} />
        </View>
      </RadioButton.Group>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleBirthDate}
        onCancel={() => setDatePickerVisibility(false)}
        value={birthDate}
      />

      <Button
        mode="outlined"
        onPress={() => {
          setDatePickerVisibility(true);
        }}
      >
        Fecha de nacimiento
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
