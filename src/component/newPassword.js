import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  CheckBox,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
  Picker,
} from "react-native";
const { width: WIDTH } = Dimensions.get("window");
// import { CheckBox } from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import GradientButton from "../utils/GradientButton";
var radio_props = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
export default class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      Password: "",
      ischecked: false,
    };
  }

  render() {
    const { ischecked } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/BG.jpg")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="stretch"
        >
          <View style={{ marginTop: wp("10%"), padding: 30 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ width: "10%", marginTop: 6 }}
                  onPress={() => this.props.navigation.goBack(null)}
                >
                  <Image
                    style={styles.back}
                    source={require("../../assets/images/icon/back.png")}
                  />
                </TouchableOpacity>
                <View style={{ width: "40%", marginLeft: 10, marginRight: 10 }}>
                  <View>
                    {/* <Image style={styles.logo} source={require('./../image/icon/createblog.png')} /> */}
                  </View>
                </View>
              </View>

              <Image
                style={styles.logo}
                source={require("../../assets/images/icon/lock.png")}
              />

              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                New Password
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  color: "#8f92a1",
                  marginTop: 10,
                }}
              >
                Your new password must be different from previous used password
              </Text>

              <View
                style={{
                  marginTop: wp("10%"),
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <KeyboardAvoidingView behavior="padding">
                  <Text
                    style={{
                      color: "#88888B",
                      fontSize: 15,
                      marginLeft: wp("8%"),
                      fontWeight: "bold",
                      marginTop: wp("6%"),
                    }}
                  >
                    PASSWORD
                  </Text>
                  <View style={styles.firstInput}>
                    <TextInput
                      style={styles.input}
                      placeholder={"* * * * * * * * *"}
                      value={this.state.Password}
                      onChangeText={(Password) => this.setState({ Password })}
                      secureTextEntry={true}
                    />
                  </View>

                  <Text
                    style={{
                      color: "#88888B",
                      fontSize: 15,
                      marginLeft: wp("8%"),
                      fontWeight: "bold",
                      marginTop: wp("6%"),
                    }}
                  >
                    CONFIRM PASSWORD
                  </Text>
                  <View style={styles.firstInput}>
                    <TextInput
                      style={styles.input}
                      placeholder={"* * * * * * * * *"}
                      value={this.state.cPassword}
                      onChangeText={(cPassword) => this.setState({ cPassword })}
                      secureTextEntry={true}
                    />
                  </View>
                </KeyboardAvoidingView>

                <GradientButton
                  onPress={() => this.props.navigation.navigate("verified")}
                  text={"Reset Password"}
                  color1={"#2145FE"}
                  color2={"#2145FE"}
                  marginTop={30}
                  borderRadius={10}
                  width={280}
                  height={50}
                />

                {/* <GradientButton
                                    style={{ marginVertical: 8., marginTop: 60, alignSelf: 'center' }}
                                    text="Reset Password"
                                    textStyle={{ fontSize: 17 }}
                                    gradientBegin="#2145FE"
                                    gradientEnd="#2145FE"
                                    gradientDirection="diagonal"
                                    height={60}
                                    width={280}
                                    radius={10}
                                    impact
                                    impactStyle='Light'
                                    onPressAction={() => this.props.navigation.navigate('verified')}
                                /> */}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 5,
    alignSelf: "center",
  },
  imgpicker: {
    width: 290,
    height: 130,
    alignSelf: "center",
    marginTop: 20,
  },
  search: {
    width: 40,
    height: 40,
    marginBottom: wp("10%"),
  },
  back: {
    width: 30,
    height: 30,
    marginBottom: wp("10%"),
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: wp("10%"),
    margin: 10,
  },
  block: {
    margin: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 10,
    padding: 10,
  },
  profile: {
    width: 70,
    height: 70,
    marginBottom: wp("10%"),
  },
  dot: {
    width: 25,
    height: 10,
    marginTop: wp("2%"),
    marginLeft: 5,
  },
  commentimg: {
    width: 30,
    height: 30,
    // marginBottom: wp('10%')
  },
  logintext: {
    width: 300,
    height: 130,
    marginBottom: wp("10%"),
    marginTop: wp("10%"),
  },
  headerText: {
    fontSize: 30,
    color: "white",
    alignSelf: "center",
  },
  button: {
    marginTop: hp("3%"),
    alignItems: "center",
    backgroundColor: "#E0C800",
    borderRadius: wp("2%"),
    height: 40,
    marginHorizontal: wp("13%"),
  },
  buttonText: {
    fontSize: 20,
    color: "#000",
    marginTop: hp("1%"),
  },
  signupView: {
    alignItems: "center",
    marginTop: hp("35%"),
  },
  alresdy: {
    fontSize: hp("2.5%"),
    color: "#666666",
  },
  signupText: {
    fontSize: hp("2.5%"),
    marginTop: hp("1%"),
    color: "#00cb9c",
    fontWeight: "bold",
  },
  firstInput: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 25,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 5,
  },
  secondInput: {
    flexDirection: "row",
    marginBottom: 30,
    marginTop: 40,
    borderBottomColor: "#EAEAEAEA",
    borderBottomWidth: 1,
    marginHorizontal: 25,
  },
  checkboxcontainer: {
    flexDirection: "row",
    marginTop: wp("5%"),
    marginLeft: wp("5%"),
  },
  checkbox: {
    alignSelf: "center",
  },
  input: {
    width: WIDTH - 85,
    height: 40,
    padding: 10,
    marginBottom: 0,
    backgroundColor: "transparent",
    color: "black",
    fontSize: 15,
  },
});
