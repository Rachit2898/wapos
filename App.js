import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import MyApp from "./src/route/sideMenu";
import * as Updates from "expo-updates";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNQGi5FNRyaOf1NJddH3u4XhGG85TBU6E",
  authDomain: "wapos-f5180.firebaseapp.com",
  projectId: "wapos-f5180",
  storageBucket: "wapos-f5180.appspot.com",
  messagingSenderId: "447919629992",
  appId: "1:447919629992:web:943940b16b6ca994ac049d",
  measurementId: "G-PSZWC84V3G",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  useEffect(() => {
    reactToUpdates();
  }, []);

  const reactToUpdates = async () => {
    Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        Updates.reloadAsync();
      }
    });
  };

  return (
    <>
      <StatusBar backgroundColor="#ffffff" />
      <MyApp />
    </>
  );
};

export default App;
