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
import { LinearGradient } from "expo-linear-gradient";

export default class Addautomotive extends React.Component {
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
                  <Image
                    style={styles.logo}
                    source={require("../../assets/images/icon/createblog.png")}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                marginTop: wp("0%"),
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
                  }}
                >
                  TITLE
                </Text>
                <View style={styles.firstInput}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Name"}
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
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
                  Description
                </Text>
                <View style={styles.firstInput}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Text"}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                  />
                </View>

                <TouchableOpacity>
                  <Image
                    style={styles.imgpicker}
                    source={require("../../assets/images/icon/imgpicker.png")}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    color: "#88888B",
                    fontSize: 15,
                    marginLeft: wp("8%"),
                    fontWeight: "bold",
                    marginTop: 20,
                  }}
                >
                  CATEGORY
                </Text>
                <View style={styles.firstInput}>
                  <Picker
                    style={{
                      backgroundColor: "#fff",
                      width: "100%",
                      alignSelf: "center",
                      color: "#BFBFBF",
                      marginTop: 0,
                      marginLeft: 10,
                    }}
                    selectedValue={this.state.gender}
                    onValueChange={(itemValue) =>
                      this.setState({ gender: itemValue })
                    }
                  >
                    <Picker.Item label="Choose category" value="" />
                    <Picker.Item value="1" label="Category 1" />
                    <Picker.Item value="1" label="Category 2" />
                    <Picker.Item value="1" label="Category 3" />
                  </Picker>
                </View>
              </KeyboardAvoidingView>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("#")}
              >
                <LinearGradient
                  colors={["#00CC33", "#00CC33"]}
                  style={{
                    marginVertical: 8,
                    marginTop: 20,
                    alignSelf: "center",
                    borderWidth: 2,
                    borderColor: "#00CC33",
                    height: 60,
                    width: 280,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: "transparent",
                      color: "#44c7f3",
                      fontSize: 17,
                    }}
                  >
                    Publish
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    width: 160,
    height: 35,
    marginBottom: wp("10%"),
    marginTop: 5,
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
