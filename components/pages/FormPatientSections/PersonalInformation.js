import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput, RadioButton, Menu } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const PersonalInformation = ({
  gender,
  setGender,
  birthDate,
  setBirthDate,
  occupation,
  setOccupation,
  status,
  setStatus,
  patientStatusCatalog,
  genderCatalog,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [visbleStatus, setVisibleStatus] = useState();

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
        {genderCatalog &&
          genderCatalog.map((genderItem) => (
            <React.Fragment key={`gender_${genderItem.GenderId}`}>
              <Text>{genderItem.Name}</Text>
              <RadioButton
                value={genderItem.GenderId}
                status={
                  genderItem.GenderId === gender ? "checked" : "unchecked"
                }
              />
            </React.Fragment>
          ))}
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
        {birthDate === ""
          ? `Fecha de nacimiento`
          : moment(birthDate).format("DD/MM/YYYY")}
      </Button>

      <TextInput
        label="Ocupación"
        mode="outlined"
        multiline
        numberOfLines={5}
        value={occupation}
        onChangeText={setOccupation}
      />

      <Text>Estado del paciente</Text>
      <Menu
        visible={visbleStatus}
        onDismiss={() => setVisibleStatus(false)}
        anchor={
          <Button onPress={() => setVisibleStatus(true)} mode="outlined">
            {status !== 0
              ? patientStatusCatalog[status - 1].Name
              : "Estado del paciente"}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setStatus(0);
            setVisibleStatus(false);
          }}
          title="Estado del paciente"
        />
        {patientStatusCatalog &&
          patientStatusCatalog.map((statusItem) => (
            <Menu.Item
              key={`status_${statusItem.PatientStatusId}`}
              onPress={() => {
                setStatus(statusItem.PatientStatusId);
                setVisibleStatus(false);
              }}
              title={statusItem.Name}
            />
          ))}
      </Menu>
    </>
  );
};

export default PersonalInformation;
