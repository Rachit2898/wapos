import { StyleSheet, Text, View } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import React from "react";

const RenderBubble = (props) => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: "white",
        },
      }}
      wrapperStyle={{
        right: {
          backgroundColor: "#1E90FF",
        },
      }}
    />
  );
};

export default RenderBubble;

const styles = StyleSheet.create({});
