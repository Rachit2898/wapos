import React from "react";
import {
  StyleSheet,
  Picker,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
const { width: WIDTH } = Dimensions.get("window");
import { ScrollView } from "react-native-gesture-handler";
import { TouchableRipple } from "react-native-paper";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Ionicons,
  FontAwesome,
  AntDesign,
  EvilIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
  Icon,
} from "@expo/vector-icons";
import GradientButton from "../utils/GradientButton";

var radio_props = [
  { value: 0, label: "Male" },
  { value: 1, label: "Female" },
];
export default class Servicetracking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ marginTop: hp("0%"), backgroundColor: "#EAAA00" }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "15%" }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack(null)}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 25,
                      marginTop: hp("5%"),
                      margin: 10,
                    }}
                    source={require("../../assets/images/icon/back.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: "70%" }}></View>
              <View style={{ width: "15%" }}>
                <TouchableOpacity onPress={() => console.log("#")}>
                  <Image
                    style={{
                      width: 35,
                      height: 25,
                      marginTop: hp("5%"),
                      margin: 10,
                    }}
                    source={require("../../assets/images/icon/notification.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "black",
              paddingBottom: 0,
              borderBottomLeftRadius: 140,
              borderBottomRightRadius: 140,
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontSize: 18,
                marginTop: wp("10%"),
                marginBottom: wp("0%"),
              }}
            >
              SERVICE TRAKING
            </Text>

            <View>
              <View
                style={{
                  backgroundColor: "white",
                  margin: 20,
                  borderRadius: 10,
                }}
              >
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 17, textAlign: "center" }}>
                    PLUMBER SERVICE
                  </Text>
                </View>

                <View style={{ padding: 10, flexDirection: "row" }}>
                  <View style={{ width: "20%" }}>
                    <Image
                      style={{ width: 120, height: 120 }}
                      source={require("../../assets/images/icon/imguser.png")}
                    />
                  </View>
                  <View style={{ width: "20%" }}></View>
                  <View style={{ width: "40%" }}>
                    <Text style={{ fontSize: 15, marginTop: wp("4%") }}>
                      HIMMAT KHAN
                    </Text>
                    <Text style={{ fontSize: 15 }}>0341000000</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          marginTop: 13,
                          marginLeft: 5,
                        }}
                        source={require("../../assets/images/icon/star.png")}
                      />
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          marginTop: 13,
                          marginLeft: 5,
                        }}
                        source={require("../../assets/images/icon/star.png")}
                      />
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          marginTop: 13,
                          marginLeft: 5,
                        }}
                        source={require("../../assets/images/icon/star.png")}
                      />
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          marginTop: 13,
                          marginLeft: 5,
                        }}
                        source={require("../../assets/images/icon/star.png")}
                      />
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          marginTop: 13,
                          marginLeft: 5,
                        }}
                        source={require("../../assets/images/icon/star2.png")}
                      />
                    </View>
                  </View>
                  <View style={{ width: "20%" }}>
                    <TouchableOpacity>
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={require("../../assets/images/icon/whatsapp.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text
                  style={{ fontSize: 17, textAlign: "center", padding: 30 }}
                >
                  YOUR SERVICE REQUEST HAS BEEN VERIFIED. PLEASE FOLLOW THE
                  ENGINEER DETAILS
                </Text>

                <GradientButton
                  onPress={() => this.props.navigation.navigate("#")}
                  text={"REPORT ISSUE"}
                  color1={"#000000"}
                  color2={"#000000"}
                  marginTop={0}
                  borderRadius={10}
                  width={280}
                  height={50}
                />

                {/* <GradientButton
                                    style={{ marginVertical: 8., marginTop: 0, marginBottom: 10, alignSelf: 'center' }}
                                    text="REPORT ISSUE"
                                    textStyle={{ fontSize: 17 }}
                                    gradientBegin="#000000"
                                    gradientEnd="#000000"
                                    gradientDirection="diagonal"
                                    height={50}
                                    width={280}
                                    radius={10}
                                    impact
                                    impactStyle='Light'
                                    onPressAction={() => this.props.navigation.navigate('#')}
                                /> */}

                <GradientButton
                  onPress={() => this.props.navigation.navigate("rate")}
                  text={"COMPLETE SERVICE"}
                  color1={"#EAAA00"}
                  color2={"#EAAA00"}
                  marginTop={0}
                  borderRadius={10}
                  width={280}
                  height={50}
                />

                {/* <GradientButton
                                    style={{ marginVertical: 8., marginTop: 0, marginBottom: 10, alignSelf: 'center' }}
                                    text="COMPLETE SERVICE"
                                    textStyle={{ fontSize: 17 }}
                                    gradientBegin="#EAAA00"
                                    gradientEnd="#EAAA00"
                                    gradientDirection="diagonal"
                                    height={50}
                                    width={280}
                                    radius={10}
                                    impact
                                    impactStyle='Light'
                                    onPressAction={() => this.props.navigation.navigate('rate')}
                                /> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: "white",
    paddingTop: wp("15%"),
    paddingLeft: wp("12%"),
  },
  headerText2: {
    fontSize: 20,
    color: "white",
    paddingLeft: wp("12%"),
  },
  firstInput: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 35,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
  },
  inputadd: {
    width: WIDTH - 115,
    height: 300,
    padding: 10,
    marginBottom: 10,
  },
  headerText3: {
    fontSize: 16,
    color: "white",
    alignSelf: "center",
    padding: 10,
    marginTop: wp("5%"),
  },
  card1: {
    backgroundColor: "#a12d98",
    paddingTop: 16,
    paddingBottom: 16,
    marginRight: 1,
    marginBottom: 1,
    width: "50%",
  },
  card2: {
    backgroundColor: "#a12d98",
    paddingTop: 16,
    paddingBottom: 16,
    marginRight: 1,
    marginBottom: 1,
    width: "50%",
  },
  searchInput: {
    margin: 4,
    fontSize: 15,
    marginLeft: 20,
    width: "100%",
    marginRight: -80,
    color: "#fff",
  },
});
