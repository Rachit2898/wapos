import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RenderDay = (props) => {
  const { currentMessage, previousMessage } = props;

  const currentMessageDate = new Date(currentMessage.createdAt);
  let currentDate = currentMessageDate.toLocaleDateString();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (
    !previousMessage ||
    currentDate !== new Date(previousMessage.createdAt).toLocaleDateString()
  ) {
    if (currentDate === today.toLocaleDateString()) {
      currentDate = "Today";
    } else if (currentDate === yesterday.toLocaleDateString()) {
      currentDate = "Yesterday";
    } else {
      currentDate = currentMessageDate.toLocaleDateString();
    }

    return (
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
    );
  }

  return null;
};

export default RenderDay;

const styles = StyleSheet.create({
  dateContainer: {
    backgroundColor: "lightgray", // Set your desired background color
    borderRadius: 8,
    padding: 8,
    alignSelf: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  dateText: {
    color: "black", // Set your desired text color
    fontWeight: "bold",
  },
});
