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
export default class Servicehistory extends React.Component {
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
                <TouchableOpacity onPress={() => console.log("#")}>
                  <Image
                    style={{
                      width: 30,
                      height: 25,
                      marginTop: hp("5%"),
                      margin: 10,
                    }}
                    source={require("../../assets/images/icon/sidebar.png")}
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
              paddingBottom: 70,
              borderBottomLeftRadius: 140,
              borderBottomRightRadius: 140,
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontSize: 18,
                marginTop: wp("15%"),
                marginBottom: wp("5%"),
              }}
            >
              SERVICE DESCRIPTION
            </Text>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 18,
                marginTop: wp("5%"),
                marginBottom: wp("5%"),
              }}
            >
              PLEASE PROVIDE A BRIEF ABOUT {"\n"} YOUR SERVICE REQUEST
            </Text>

            <View style={styles.firstInput}>
              <TextInput
                style={styles.inputadd}
                placeholder={"ENTER DESCRIPTION "}
                value={this.state.address}
                onChangeText={(address) => this.setState({ address })}
                multiline={true}
              />
            </View>
          </View>
          <GradientButton
            onPress={() => this.props.navigation.navigate("#")}
            text={"SUBMIT"}
            color1={"#EAAA00"}
            color2={"#EAAA00"}
            marginTop={-10}
            borderRadius={10}
            width={280}
            height={50}
          />
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
