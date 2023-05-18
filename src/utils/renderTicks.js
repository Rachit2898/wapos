import React from "react";
import { Text } from "react-native";

const RenderTicks = ({ currentMessage, currentUserId }) => {
  if (currentMessage && currentMessage.user._id === currentUserId) {
    return (
      <Text
        style={{
          color: currentMessage.status == "sent" ? "lightgray" : "#34B7F1",
          fontSize: 12,
        }}
      >
        {currentMessage.status == "viewed" ? "✓✓" : "✓"}
      </Text>
    );
  } else {
    return null;
  }
};

export default RenderTicks;
