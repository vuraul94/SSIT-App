import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Redirect } from "react-router-native";
import axios from "axios";
import { CONSTANTS } from "../../misc/constants";

const styles = StyleSheet.create({
  container: {},
  input: {
    margin: 5,
  },
});

/**
 * Login page in the app
 * receive the token "string or null"
 * receive the setToken "function"
 * receive the setTokenCreationTime "function"
 * receive the setSection "function"
 */
const Login = ({ token, setToken, setTokenCreationTime, setSection }) => {
  const [errorMsg, setErrorMsg] = useState();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

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
      .then(function (response) {
        setErrorMsg(null);
        setTokenCreationTime(Date.now());
        setToken(response.data.Token);
      })
      .catch(function (error) {
        if (error.message === "Request failed with status code 401") {
          setErrorMsg("Credenciales equivocadas");
        } else {
          setErrorMsg("Algo ocurrio");
        }
        console.log(error);
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
      <Button onPress={handleLogin}>Login</Button>
    </View>
  );
};

export default Login;
