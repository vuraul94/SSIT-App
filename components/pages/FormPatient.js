import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import Paginator from "../utils/Paginator";
import { View, Text, StyleSheet } from "react-native";
import {
  Button,
  TextInput,
  RadioButton,
  Checkbox,
  Menu,
} from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { locations } from "../../misc/locations";

const styles = StyleSheet.create({});

const FormPatient = ({ setSection, token }) => {
  useEffect(() => {
    setSection("Crear");
  }, []);

  const [value, setValue] = useState("masculino");
  const [checked, setChecked] = useState(false);
  const [province, setProvince] = useState("");

  const [visibleProvince, setVisibleProvince] = useState(false);
  const [visibleCanton, setVisibleCanton] = useState(false);
  const [visibleDistrict, setVisibleDistrict] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setDatePickerVisibility(false);
  };

  const formSections = [
    <>
      <TextInput label="Nombre" mode="outlined" />
      <TextInput label="Primer Apellido" mode="outlined" />
      <TextInput label="Segudo Apellido" mode="outlined" />
    </>,
    <>
      <TextInput label="Numero de teléfono" mode="outlined" />
      <TextInput label="Correo" mode="outlined" />

      {/* <TextInput mode="outlined" style={{justifyContent: 'flex-end'}}/> */}
      <Menu
        visible={visibleProvince}
        onDismiss={() => setVisibleProvince(false)}
        anchor={
          <Button onPress={() => setVisibleProvince(true)} mode="outlined">
            {province!==""? locations.province[province] : "Provincia"}
          </Button>
        }
      >
        <Menu.Item onPress={() => {setProvince("")}} title="Provincia" />
        {Object.keys(locations.province).map((key) => (
          <Menu.Item key={`province_${key}`} onPress={() => {setProvince(key)}} title={locations.province[key]} />
        ))}
      </Menu>
      <Menu
        visible={visibleCanton}
        onDismiss={() => setVisibleCanton(false)}
        anchor={
          <Button onPress={() => setVisibleCanton(true)} mode="outlined">
            Cantón
          </Button>
        }
      >
        <Menu.Item onPress={() => {}} title="Cantón" />
      </Menu>
      <Menu
        visible={visibleDistrict}
        onDismiss={() => setVisibleDistrict(false)}
        anchor={
          <Button onPress={() => setVisibleDistrict(true)} mode="outlined">
            Distrito
          </Button>
        }
      >
        <Menu.Item onPress={() => {}} title="Distrito" />
      </Menu>

      <TextInput
        label="Dirección"
        mode="outlined"
        multiline
        numberOfLines={5}
      />
    </>,
    <>
      <Text>Género</Text>
      <RadioButton.Group
        onValueChange={(newValue) => setValue(newValue)}
        value={value}
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

      <Button onPress={() => setDatePickerVisibility(true)}>Pick time</Button>

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
    </>,
  ];
  return (
    <>
      {/* {(!token || token === "") && <Redirect to="/" />} */}
      <Paginator sections={formSections}></Paginator>
    </>
  );
};

export default FormPatient;
