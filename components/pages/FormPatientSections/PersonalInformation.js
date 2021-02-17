import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput, RadioButton, Checkbox } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PersonalInformation = ({
  gender,
  setGender,
  birthDate,
  setBirthDate,
  occupation,
  setOccupation,
  health,
  setHealth,
}) => {

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
        value={occupation}
        onChangeText={setOccupation}
      /> 

      <Text>Seguro de salud</Text>
      <Checkbox
        status={health === 1 ? "checked" : "unchecked"}
        onPress={() => {
          if (health === 0) {
            setHealth(1);
          } else {
            setHealth(0);
          }
        }}
      />
    </>
  );
};

export default PersonalInformation;
