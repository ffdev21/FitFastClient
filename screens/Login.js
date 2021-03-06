import * as React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  TextInput,Dimensions
} from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import PasswordInputText from "react-native-hide-show-password-input";
import { login } from "../store/user";
import { ScrollView } from 'react-native';

class Login extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {
      email: "",
      password: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.loginDispatch(this.state.email, this.state.password);
  }

  render() {
    return (
      <View style={styles.background}>
        <ImageBackground
          source={require('../assets/images/fit_fast_background.jpg')}
          style={styles.image}
        >
          <View>
            <Image source={require("../assets/images/fit_fast_logo.png")} style={styles.logo} />
          </View>
          <View style={styles.loginBox}>
            <View>
              {this.props.error && this.props.error.response ? (
                <Text style={{ color: "red", fontFamily: "cabin" }}>
                  {this.props.error.response.data}
                </Text>
              ) : null}
            </View>

            <View style={styles.emailContainer}>
              <View style={styles.emailIcon}>
                <Ionicons name="md-person" size={30} color={"black"} />
              </View>
              <View style={styles.emailTextAndInput}>
                <Text style={styles.email}>Email</Text>
                <TextInput
                  style={styles.emailInput}
                  onChangeText={(text) => {
                    this.setState({ ...this.state, email: text });
                  }}
                />
              </View>
            </View>

            <View style={styles.passwordContainer}>
              <View style={styles.passwordIcon}>
                <Ionicons name="ios-lock-closed" size={32} color={"black"} />
              </View>
              <View style={styles.emailTextAndInput}>
                <Text style={styles.email}>Password</Text>
                <TextInput
                  secureTextEntry={true}
                  style={styles.emailInput}
                  value={this.state.password}
                  onChangeText={(text) => {
                    this.setState({ ...this.state, password: text });
                  }}
                  iconColor={"black"}
                  iconSize={24}
                  label={""}
                />
              </View>
            </View>

            <View>
              <Button
                title="Login"
                onPress={this.handleLogin}
                color="black"
                titleStyle={{
                  color: "white",
                  fontSize: 18,
                  lineHeight: 20,
                }}
                buttonStyle={{
                  backgroundColor: "black",
                  opacity: 1,
                  borderRadius: 20,
                  height: 40,
                  width: 150,
                  justifyContent: "center",
                  alignSelf: "center",
                  marginTop: 20,
                }}
              />
            </View>

            <View>
              <Button
                title="Create an Account"
                onPress={() => this.props.navigation.push("Signup")}
                titleStyle={{
                  color: "black",
                  fontSize: 15,
                  lineHeight: 20,
                }}
                buttonStyle={{
                  backgroundColor: "#FFFFFF00",
                  opacity: 1,
                  borderRadius: 20,
                  height: 40,
                  width: 150,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "column",
  },
  image: {
    flex: 1,
    width:'100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  logo:{
    width: width/2,
    height: width/2,
    marginTop: width/5
  },
  loginBox: {
    marginTop: 50,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    width: '85%',
    height: 290,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  emailContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    width: '95%',
    height: 75,
    padding: 5,
    marginTop: 5,
    borderRadius: 20,
    alignItems: "center",
  },
  emailIcon: {
    marginLeft: 20,
  },
  emailTextAndInput: {
    marginLeft: 20,
  },
  email: {
    fontFamily: "cabin",
    marginTop: 10,
  },
  emailInput: {
    width: '100%',
    fontFamily: "cabin",
    fontSize: 17,
    paddingBottom: 4,
    borderBottomWidth: 0.45,
    borderColor: "#808080",
  },
  passwordContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    width: '95%',
    height: 75,
    padding: 5,
    marginTop: 9,
    borderRadius: 20,
    alignItems: "center",
  },
  passwordIcon: {
    marginLeft: 20,
  },
  password: {
    fontFamily: "cabin",
    marginLeft: 5,
    marginBottom: 45,
  },
  passwordText: {
    marginTop: 10,
    marginLeft: 5,
    height: 20,
    width: '100%',
    fontSize: 17,

    fontFamily: "cabin",
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (email, password) => dispatch(login(email, password)),
});

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
export default ConnectedLogin;
