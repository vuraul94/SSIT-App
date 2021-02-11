import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-native";
import Paginator from "../utils/Paginator";
import { View, Text } from "react-native";
import { Button, TextInput, RadioButton, Checkbox} from "react-native-paper";


const FormPatient = ({ setSection, token }) => {
  useEffect(() => {
    setSection("Crear");
  }, []);

const [value, setValue] = React.useState('masculino');

const [checked, setChecked] = React.useState(false);

const formSections = [
  <>
    <TextInput label="Nombre" mode="outlined"/>
    <TextInput label="Primer Apellido" mode="outlined"/>
    <TextInput label="Segudo Apellido" mode="outlined"/>
  </>,
  <>
    <TextInput label="Numero de teléfono" mode="outlined"/>
    <TextInput label="Correo" mode="outlined"/>
    
    <View style={{flexDirection:"row"}}>
      <Text style={{justifyContent: 'flex-start'}}>Provincia</Text>
      <TextInput mode="outlined" style={{justifyContent: 'flex-end'}}/>
    </View>
    <View style={{flexDirection:"row"}}>
    <Text style={{justifyContent: 'flex-start'}}>Cantón</Text>
      <TextInput mode="outlined" style={{justifyContent: 'flex-end'}}/>
    </View>
    <View style={{flexDirection:"row"}}>
      <Text style={{justifyContent: 'flex-start'}}>Distrito</Text>
      <TextInput mode="outlined" style={{justifyContent: 'flex-end'}}/>
    </View>

      <TextInput label="Dirección" mode="outlined" multiline numberOfLines={5}/>
    </>,
    <>
      <Text>Género</Text>
      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
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
      <TextInput label="Ocupación" mode="outlined" multiline numberOfLines={5}/>
      <Text>Seguro de salud</Text>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
      />
    </>   
  ]
  return <>{(!token || token === "") && <Redirect to="/" />}
  <Paginator sections={formSections}></Paginator>
  </>;
};

export default FormPatient;
