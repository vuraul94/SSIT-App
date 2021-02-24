import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Redirect } from "react-router-native";
import axios from "axios";
import { CONSTANTS } from "../../misc/constants";

const styles = StyleSheet.create({
  container: {},
  input: {
    margin: 12,
  },
  button:{
    width: "80%",
    marginTop: 10,
    marginLeft: "10%",
  }
});

/**
 * Login page in the app
 * receive the token "string or null"
 * receive the setToken "function"
 * receive the setTokenCreationTime "function"
 * receive the setSection "function"
 */
const Login = ({
  token,
  setToken,
  setTokenCreationTime,
  setSection,
  setCountryCatalog,
  setGenderCatalog,
  setPatientStatusCatalog,
  setPathologicalCatalog,
}) => {
  const [errorMsg, setErrorMsg] = useState();
  const [user, setUser] = useState("UserDev");
  const [pass, setPass] = useState("Dev123");


  useEffect(() => {
    setSection("Login");
  }, []);

  /**
   * Handle the button login and call the api to receive the authentication token
   */
  const handleLogin = () => {
    axios
      .post(`${CONSTANTS.API.URL}/api/Authentication/authenticate`, {
        Username: user,
        Password: pass,
      })
      .then((response) => {
        setErrorMsg(null);
        setTokenCreationTime(Date.now());
        getCatalog(response.data.Token);
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 401") {
          setErrorMsg("Credenciales equivocadas");
        } else {
          setErrorMsg("Algo ocurrio");
        }
      });
  };

  const getCatalog = (token) => {
    axios
      .get(`${CONSTANTS.API.URL}/api/CatalogController/GetAllCatalog`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const data = response.data.Response;
        setCountryCatalog(data.CountryCatalog);
        setGenderCatalog(data.GenderCatalog);
        setPatientStatusCatalog(data.PatientStatus);
        setPathologicalCatalog(data.PathologicalCatalog)
        setToken(token);
      });
  };

  return (
    <View style={styles.container}>
      {token && token !== "" && <Redirect to="/Search" />}

      <TextInput
        label="Username"
        style={styles.input}
        value={user}
        mode="outlined"
        onChangeText={(e) => {
          setUser(e);
        }}
      ></TextInput>

      <TextInput
        label="Password"
        secureTextEntry={true}
        style={styles.input}
        value={pass}
        mode="outlined"
        onChangeText={(e) => {
          setPass(e);
        }}
      ></TextInput>
      {errorMsg && <Text>{errorMsg}</Text>}
      <Button  style={styles.button} mode="contained" onPress={handleLogin}>Login</Button>
    </View>
  );
};

export default Login;
