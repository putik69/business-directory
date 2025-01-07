import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function About({ business }) {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "white",
        marginTop: -10,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 15,
          marginTop: -5,
        }}
      >
        About
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          lineHeight: 25,
        }}
      >
        {business?.about}
      </Text>
    </View>
  );
}
