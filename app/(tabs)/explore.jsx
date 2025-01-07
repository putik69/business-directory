import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Category from "@/components/Home/Category";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function Explore() {
  const [businessList, setBusinessList] = useState([]); // Initialize as an empty array

  const GetBussinessByCatgeory = async (Category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("Category", "==", Category)
    );
    const querySnapshot = await getDocs(q);
    const businesses = []; // Temporary array to collect the businesses
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      businesses.push({ id: doc.id, ...doc.data() }); // Corrected doc.data()
    });
    setBusinessList(businesses); // Update state with the new list
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>
        Explore More
      </Text>

      {/* SearchBar */}
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
          borderWidth: 1,
          borderColor: "gray",
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

      {/* Category */}
      <Category
        explore={true}
        onCategorySelect={(Category) => GetBussinessByCatgeory(Category)}
      />

      {/* BusinessList */}
      <ExploreBusinessList businessList={businessList} />
    </View>
  );
}
