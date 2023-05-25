import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
const { width: WIDTH } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Device from "expo-device";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as firebase from "firebase";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";
import GradientButton from "../utils/GradientButton";
import { googleLogin, getCurrentUser, pushNotifications } from "../api/helper";

WebBrowser.maybeCompleteAuthSession();

export default function Login(props) {
  const [loading, setLoading] = useState(true);
  const responseListener = useRef();
  const [accessToken, setAccessToken] = React.useState(null);
  const [userIds, setUser] = React.useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "447919629992-kb0tbb7k67h3thrfr9m6mkb7sfpbbgfa.apps.googleusercontent.com",
    androidClientId:
      "447919629992-54cajcrnkt8pnna90gjln5etluh30ppu.apps.googleusercontent.com",
    iosClientId:
      "447919629992-afaicloopdif4uck9klo15j7bs1af0p7.apps.googleusercontent.com",
  });

  const checkAuthRegister = async (user) => {
    let idToken = await user.getIdToken(true);

    googleLogin(idToken)
      .then((response) => response.json())
      .then((responseJson) => {
        checkUserDetails(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    registerForPushNotificationsAsync = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          alert("Notifications permission denied");
          return;
        } else {
          var token = (await Notifications.getDevicePushTokenAsync()).data;

          if (!!token) {
            await pushNotifications(token);
          }

          const db = firebase.firestore();

          if (!!userIds) {
            const userRef = db.collection("users").doc(userIds);

            const newData = {
              sender_id: userIds,

              expoPushToken: token,
            };

            userRef
              .set(newData, { merge: true })
              .then(() => {
                alert("update sucess");
                console.log("Document updated or created successfully");
              })
              .catch((error) => {
                console.error("Error updating or creating document:", error);
              });
          }
        }
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {});

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    };

    registerForPushNotificationsAsync();
  }, [userIds, accessToken]);

  const checkUserDetails = async (user) => {
    let idToken = await user.getIdToken(true);

    getCurrentUser(idToken)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error == undefined) {
          let UID = `${responseJson.data.id}`;
          AsyncStorage.removeItem("currentUserFirstName");
          AsyncStorage.removeItem("currentUserLastName");
          AsyncStorage.removeItem("currentUserImage");
          AsyncStorage.removeItem("currentUserFirebaseToken");
          AsyncStorage.removeItem("currentUserFirebaseID");
          AsyncStorage.removeItem("currentUserID");
          AsyncStorage.removeItem("currentUserEmail");
          AsyncStorage.removeItem("currentUserCountry");
          AsyncStorage.removeItem("currentUserStates");
          AsyncStorage.removeItem("currentUserRating");
          AsyncStorage.removeItem("currentUserStatus");
          setUser(responseJson.data.firebase_user_uid);

          AsyncStorage.setItem("currentUserFirebaseToken", idToken);
          AsyncStorage.setItem(
            "currentUserFirebaseID",
            responseJson.data.firebase_user_uid
          );
          AsyncStorage.setItem("currentUserID", UID);
          AsyncStorage.setItem(
            "currentUserFirstName",
            `${responseJson.data.first_name}`
          );
          AsyncStorage.setItem(
            "currentUserLastName",
            `${responseJson.data.last_name}`
          );
          AsyncStorage.setItem(
            "currentUserEmail",
            `${responseJson.data.email}`
          );
          AsyncStorage.setItem(
            "currentUserCountry",
            `${responseJson.data.country}`
          );
          AsyncStorage.setItem(
            "currentUserStates",
            `${responseJson.data.states}`
          );
          AsyncStorage.setItem(
            "currentUserImage",
            `${responseJson.data.profile_picture}`
          );
          AsyncStorage.setItem(
            "currentUserRating",
            `${responseJson.data.rating}`
          );
          AsyncStorage.setItem(
            "currentUserStatus",
            `${responseJson.data.status}`
          );

          setLoading(false);
          props.navigation.navigate("Search");
        } else {
          alert(responseJson.error);
          setLoading(false);
          props.navigation.navigate("login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkAuth = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        checkUserDetails(user);
      } else {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    checkAuth();

    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);

      firebase
        .auth()
        .signInWithCredential(credential)
        .then((user) => {
          if (user) {
            if (user.additionalUserInfo.isNewUser == false) {
              checkUserDetails(user.user);
            } else {
              checkAuthRegister(user.user);
            }
          }
        });
    }
  }, [response]);

  const login = () => {
    props.navigation.navigate("#");
  };

  const renderButton = () => {
    if (loading) {
      <View></View>;
    }
    return (
      <View style={{ marginTop: 5, marginBottom: 15 }}>
        <ActivityIndicator color="#2145FE" size={"large"} animating={loading} />
      </View>
    );
  };

  if (loading == true) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={"#44c7f3"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
      <ImageBackground
        source={require("../../assets/images/icon/loginbg.jpg")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="stretch"
      >
        <View style={{ marginTop: wp("10%"), padding: 30 }}>
          <ScrollView>
            <Image
              style={styles.logintext}
              source={require("../../assets/images/icon/logo.png")}
            />

            <View
              style={{
                marginTop: wp("0%"),
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {loading == false ? null : renderButton()}

              <GradientButton
                onPress={() => login()}
                text={"Continue as a guest"}
                color1={"#44c7f3"}
                color2={"#2a78bc"}
                marginTop={0}
              />

              <GradientButton
                onPress={() => props.navigation.navigate("signupuser")}
                text={"Create account"}
                color1={"transparent"}
                color2={"transparent"}
                marginTop={10}
                borderRadius={50}
                width={280}
                height={45}
                borderWidth={2}
                borderColor={"#44c7f3"}
                textColor={"#44c7f3"}
              />

              <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={() => props.navigation.navigate("loginwithemail")}
              >
                <Text
                  style={{
                    color: "#a1a2a4",
                    alignSelf: "center",
                    fontSize: 17,
                    marginTop: wp("5%"),
                  }}
                >
                  Already have account?{" "}
                  <Text style={{ color: "#44c7f3", fontWeight: "bold" }}>
                    Login
                  </Text>
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={{ marginTop: 50 }}>
                                <ImageBackground source={require('./../image/fb_bg.png')} borderRadius={50} style={{ width: 280, height: 50 }} resizeMode='stretch'>
                                    <View style={{ width: 270, borderRadius: 100, flexDirection: 'row', padding: 15, }}>
                                        <Image style={{ width: 20, height: 20, marginLeft: 10 }} source={require('./../image/fb.png')} />
                                        <Text style={{ color: "white", paddingLeft: 30 }}>Sign in with facebook</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity> */}

              <TouchableOpacity
                onPress={() => promptAsync()}
                style={{ marginTop: "15%" }}
              >
                <ImageBackground
                  source={require("../../assets/images/gp_bg.png")}
                  borderRadius={50}
                  style={{ width: 280, height: 50 }}
                  resizeMode="stretch"
                >
                  <View
                    style={{
                      width: 270,
                      borderRadius: 100,
                      flexDirection: "row",
                      padding: 15,
                    }}
                  >
                    <Image
                      style={{ width: 18, height: 18, marginLeft: 10 }}
                      source={require("../../assets/images/gp.png")}
                    />
                    <Text style={{ color: "white", paddingLeft: 30 }}>
                      Sign in with Google+
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  // buttonText: {

  //     fontSize: 20,
  //     color: '#000',
  //     marginTop: hp('1%'),
  // },
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
  input: {
    width: WIDTH - 85,
    height: 40,
    padding: 10,
    marginBottom: 0,
    backgroundColor: "transparent",
    color: "black",
    fontSize: 15,
  },

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});
