import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 10,
        padding: 20,
        backgroundColor: "#ADD8E6",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
          }}
        />
        <View>
          <Text
            style={{
              color: "#fff",
            }}
          >
            WELCOME.
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 19,
              fontFamily: "outfit-medium",
            }}
          >
            {user?.firstName}
          </Text>
        </View>
      </View>
      {/* Search Bar*/}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 5,
          marginVertical: 10,
          marginTop: 10,
          borderRadius: 10,
        }}
      >
        <Ionicons name="search" size={24} color="#ADD8E6" />
        <TextInput
          placeholder="Search..."
          style={{
            fontFamily: "outfit",
            fontSize: 16,
            width: "90%",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
