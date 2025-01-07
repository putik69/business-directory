import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/home", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Handle other actions (signIn, signUp) here
      }
    } catch (err) {
      console.error(
        "Error during authentication flow:",
        JSON.stringify(err, null, 2)
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require("./../assets/images/login.jpg")}
          style={styles.image}
        />
      </View>

      {/* Text and Button Section */}
      <View style={styles.subContainer}>
        <Text style={styles.heading}>
          Your Ultimate{" "}
          <Text style={styles.highlightedText}>
            Community Business Directory
          </Text>{" "}
          App
        </Text>
        <Text style={styles.description}>Find Your Business Near You</Text>

        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={styles.btnText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  image: {
    width: 220,
    height: 450,
    borderRadius: 20,
    borderWidth: 8,
    borderColor: "#000",
  },
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
    width: "90%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow effect
  },
  heading: {
    fontSize: 30,
    fontFamily: "outfit-bold",
    textAlign: "center",
  },
  highlightedText: {
    color: "blue",
  },
  description: {
    fontSize: 15,
    fontFamily: "outfit",
    textAlign: "center",
    marginVertical: 15,
    color: "gray",
  },
  btn: {
    backgroundColor: "blue",
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  },
  btnText: {
    textAlign: "center",
    fontFamily: "outfit",
    color: "#fff",
  },
});
