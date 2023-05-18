import React from "react";
import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import MyApp from "./src/route/sideMenu";
import * as Updates from "expo-updates";
//Database import
import * as firebase from "firebase";
require("firebase/auth");
var firebaseConfig = {
  apiKey: "AIzaSyDNQGi5FNRyaOf1NJddH3u4XhGG85TBU6E",
  authDomain: "wapos-f5180.firebaseapp.com",
  projectId: "wapos-f5180",
  storageBucket: "wapos-f5180.appspot.com",
  messagingSenderId: "447919629992",
  appId: "1:447919629992:web:943940b16b6ca994ac049d",
  measurementId: "G-PSZWC84V3G",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  componentDidMount = async () => {
    this.reactToUpdates();
  };
  reactToUpdates = async () => {
    Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        // Alert.alert("EaseSalotto", "A new update is available we restart this application for a update.");
        Updates.reloadAsync();
      }
    });
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor={"#ffffff"} />
        <MyApp />
      </>
    );
  }
}
