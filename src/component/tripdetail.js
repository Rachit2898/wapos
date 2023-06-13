import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Alert,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import { FontAwesome5 } from "@expo/vector-icons";
import GradientButton from "../utils/GradientButton";
import { StackActions } from "react-navigation";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { getFlightDetails } from "../api/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: WIDTH, height: Height } = Dimensions.get("window");

const Tripdetail = ({ navigation, route }) => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [arrivalDestinationDate, setArrivalDestinationDate] = useState("");
  const [arrivalDestinationAirport, setArrivalDestinationAirport] =
    useState("");
  const [pnrNumber, setPnrNumber] = useState("");
  const [data, setData] = useState(null);
  const [isVisibleTo, setIsVisibleTo] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );

    if (route.params !== undefined) {
      const { editdata } = route.params;
      setData(editdata);
      if (editdata.length > 0) {
        setTicketNumber(editdata[0].ticket_number);
        setArrivalDestinationDate(editdata[0].arrival_date_at_destination);
        setArrivalDestinationAirport(editdata[0].destination_airport);
        setPnrNumber(editdata[0].pnr_number);
      }
    }

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackButton = () => {
    // Add your code for handling the back button press
    return true; // Return `true` to prevent default back button behavior
  };

  const handlePicker = (datetime) => {
    setArrivalDestinationDate(moment(datetime).format(""));
    setIsVisibleTo(false);
  };

  const hidePicker = () => {
    setIsVisibleTo(false);
  };

  const showPicker = () => {
    setIsVisibleTo(true);
  };

  const move = () => {
    if (ticketNumber === "") {
      Alert.alert("Empty Field!", "Please enter your ticket number");
    } else if (arrivalDestinationDate === "") {
      Alert.alert(
        "Empty Field!",
        "Please enter your arrival date at destination"
      );
    } else if (arrivalDestinationAirport === "") {
      Alert.alert("Empty Field!", "Please enter your destination airport");
    } else if (pnrNumber === "") {
      Alert.alert("Empty Field!", "Please enter your PNR number");
    } else {
      navigation.navigate("tripdetail2", {
        ticketNumber,
        arrivalDestinationDate,
        arrivalDestinationAirport,
        pnrNumber,
        editdata: data,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>

      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <ImageBackground
            source={require("../../assets/images/icon/bgw.jpg")}
            style={{
              width: "100%",
              height: Platform.OS == "android" ? "100%" : Height,
            }}
            resizeMode="stretch"
          >
            <View style={{ flexDirection: "row", marginTop: wp("12%") }}>
              <TouchableOpacity
                style={{ width: "30%" }}
                onPress={() => navigation.goBack()}
              >
                <Image
                  style={styles.menuicon}
                  source={require("../../assets/images/icon/left-arrow.png")}
                />
              </TouchableOpacity>
              <View style={{ width: "40%" }}></View>
            </View>

            <Text
              style={{
                textAlign: "left",
                marginLeft: 30,
                color: "white",
                fontSize: 35,
                fontWeight: "bold",
                marginTop: 30,
              }}
            >
              Trip Details
            </Text>

            <View style={{ marginTop: wp("0%"), padding: 0 }}>
              <View
                style={[
                  styles.firstInput,
                  { marginTop: wp(30), alignSelf: "center" },
                ]}
              >
                <Pressable onPress={() => console.log("Ticket number")}>
                  <TextInput
                    style={styles.input}
                    label="ENTER YOUR TICKET NUMBER"
                    mode="outlined"
                    keyboardType="phone-pad"
                    theme={{
                      colors: {
                        primary: "#c8c8c8",
                        outlineColor: "#ffffff",
                      },
                      roundness: 15,
                    }}
                    placeholder={"Ticket number"}
                    value={ticketNumber}
                    onChangeText={setTicketNumber}
                    right={
                      <TextInput.Icon
                        name={() => (
                          <FontAwesome5
                            name="search"
                            size={20}
                            style={{ marginTop: 0 }}
                            color="#D9D9D9"
                          />
                        )}
                      />
                    }
                  />
                </Pressable>
              </View>

              <TouchableOpacity
                onPress={showPicker}
                style={[
                  styles.firstInput,
                  { marginTop: 10, alignSelf: "center" },
                ]}
              >
                <TextInput
                  onPress={showPicker}
                  style={styles.input}
                  label="ARRIVAL DATE AT DESTINATION"
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: "#c8c8c8",
                      outlineColor: "#ffffff",
                    },
                    roundness: 15,
                  }}
                  placeholder={"ARRIVAL DATE AT DESTINATION"}
                  value={`${
                    arrivalDestinationDate == ""
                      ? ""
                      : moment(arrivalDestinationDate).format(
                          "MMMM Do YYYY, h:mm:ss A"
                        )
                  }`}
                  onChangeText={setArrivalDestinationDate}
                  right={
                    <TextInput.Icon
                      onPress={showPicker}
                      name={() => (
                        <FontAwesome5
                          name="calendar"
                          size={20}
                          style={{ marginTop: 0 }}
                          color="#D9D9D9"
                        />
                      )}
                    />
                  }
                  editable={false}
                />

                <DateTimePickerModal
                  isVisible={isVisibleTo}
                  onConfirm={handlePicker}
                  onCancel={hidePicker}
                  mode={"datetime"}
                  date={
                    arrivalDestinationDate
                      ? new Date(arrivalDestinationDate)
                      : new Date()
                  }
                  datePickerModeAndroid={"spinner"}
                />
              </TouchableOpacity>

              <View
                style={[
                  styles.firstInput,
                  { marginTop: 10, alignSelf: "center" },
                ]}
              >
                <TextInput
                  style={styles.input}
                  label="DESTINATION AIRPORT"
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: "#c8c8c8",
                    },
                    roundness: 15,
                    outlineColor: "#ffffff",
                  }}
                  placeholder={"DESTINATION AIRPORT"}
                  value={arrivalDestinationAirport}
                  onChangeText={setArrivalDestinationAirport}
                  right={
                    <TextInput.Icon
                      name={() => (
                        <FontAwesome5
                          name="search"
                          size={20}
                          style={{ marginTop: 0 }}
                          color="#D9D9D9"
                        />
                      )}
                    />
                  }
                />
              </View>

              <View
                style={[
                  styles.firstInput,
                  { marginTop: 10, alignSelf: "center", marginBottom: 10 },
                ]}
              >
                <TextInput
                  style={styles.input}
                  label="ENTER YOUR PNR NUMBER"
                  mode="outlined"
                  keyboardType="phone-pad"
                  theme={{
                    colors: {
                      primary: "#c8c8c8",
                      outlineColor: "#ffffff",
                    },
                    roundness: 15,
                  }}
                  placeholder={"Ticket number"}
                  value={pnrNumber}
                  onChangeText={setPnrNumber}
                  right={
                    <TextInput.Icon
                      name={() => (
                        <FontAwesome5
                          name="search"
                          size={20}
                          style={{ marginTop: 0 }}
                          color="#D9D9D9"
                        />
                      )}
                    />
                  }
                />
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>

      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          left: 0,
          bottom: 5,
        }}
      >
        <View style={{ width: "50%" }}>
          <GradientButton
            onPress={() => navigation.navigate("Search")}
            text={"Cancel"}
            color1={"transparent"}
            color2={"transparent"}
            borderRadius={50}
            width={"90%"}
            height={45}
            borderWidth={2}
            borderColor={"#44c7f3"}
            textColor={"#44c7f3"}
          />
        </View>
        <View style={{ width: "50%" }}>
          <GradientButton
            onPress={move}
            text={"Next"}
            color1={"#44c7f3"}
            color2={"#2a78bc"}
            borderRadius={50}
            width={"90%"}
            height={45}
            marginTop={10}
          />
        </View>
      </View>
    </View>
  );
};

export default Tripdetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 130,
    height: 50,
    marginBottom: wp("10%"),
  },
  logintext: {
    width: 220,
    height: 85,
    marginBottom: wp("40%"),
    marginTop: wp("20%"),
    alignSelf: "center",
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
    marginTop: 15,
    marginHorizontal: 20,
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
  input: {
    width: 310,

    backgroundColor: "#ffffff",
    fontSize: 15,
  },

  menuicon: {
    width: 30,
    height: 30,
    marginLeft: 20,
  },
  col: {
    width: "90%",
    padding: 0,
    paddingTop: 25,
    paddingBottom: 25,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    alignSelf: "center",
  },

  switchAlignStyle: {
    alignContent: "center",
    marginTop: 15,
  },
});
