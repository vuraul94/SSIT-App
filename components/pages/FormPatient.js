import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-native";
import Paginator from "../utils/Paginator";
import { Text } from "react-native";
import { Button, TextInput } from "react-native-paper";

const FormPatient = ({ setSection, token }) => {
  useEffect(() => {
    setSection("Crear");
  }, []);

  const formSections = [
      <>
        <TextInput label="Nombre" mode="outlined"/>
        <TextInput label="Apellido" mode="outlined"/>
      </>,
      <Text>2</Text>,
      <Text>3</Text>
  ]
  return <>{(!token || token === "") && <Redirect to="/" />}
  <Paginator sections={formSections}></Paginator>
  </>;
};

export default FormPatient;
