import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AuthContext from "../../store/AuthContext";
import Color from "../../constants/color";
import Icon from "react-native-vector-icons/FontAwesome5";
import BaseContainer from "../../components/BaseComponents/BaseContainer";

const LoginScreen = (props) => {
  const { signIn } = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pressHandler = async () => {
    setError(false);
    const success = await signIn({ email, password });
    if (!success) {
      setError(true);
    }
  };

  return (
    <BaseContainer style={styles.screen}>
      <View style={styles.keyWrapper}>
        <Icon name="key" size={30} color={Color.orange} />
      </View>

      <View style={styles.loginForm}>
        <View style={styles.emailInputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
            placeholder="Email"
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
          placeholder="Password"
        />
        {error && (
          <Text style={styles.errorMessage}>
            Wrong email or password. Please try again
          </Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={pressHandler}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#dedede",
    height: 50,
    borderRadius: 6,
    paddingLeft: 10,
  },
  loginForm: {
    backgroundColor: Color.secondaryDark,
    width: "90%",
    paddingVertical: 60,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderBottomWidth: 10,
    borderBottomColor: Color.blue,

    // Works only on IOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,

    // Works only on Android
    elevation: 5,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  button: {
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    fontSize: 20,
  },
  emailInputWrapper: {
    marginBottom: 40,
  },
  keyWrapper: {
    backgroundColor: Color.secondaryDark,
    height: 90,
    width: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: -50,
    zIndex: 2,

    // Works only on IOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.26,

    // Works only on Android
    elevation: 10,
  },
  errorMessage: {
    color: Color.orange,
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default LoginScreen;
