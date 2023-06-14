import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  I18nManager,
} from "react-native";
import MyApp from "./src/route/sideMenu";
import * as Updates from "expo-updates";
import firebase from "firebase/app";
import * as Localization from "expo-localization";
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
    const deviceLanguage = Localization.locale.split("-")[0];
    console.log({ deviceLanguage }, Localization.getLocales()[0].textDirection);

    const { textDirection } = Localization.getLocales()[0];

    if (textDirection === "rtl") {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      Localization.locale = "en";
    } else {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      Localization.locale = "en";
    }
  }, []);

  const reactToUpdates = async () => {
    Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        Updates.reloadAsync();
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" />
      <MyApp />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
