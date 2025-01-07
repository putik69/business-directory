import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { db } from "./../../config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Mybusiness() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetUserBusiness();
    }
  }, [user]);

  const GetUserBusiness = async () => {
    try {
      const q = query(
        collection(db, "BusinessList"),
        where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    } catch (error) {
      console.error("Error fetching business data:", error);
    }
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        My Business
      </Text>
    </View>
  );
}
