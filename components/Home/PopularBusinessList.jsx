import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PopularBusinesscard from "./PopularBusinesscard";

export default function PopularBusinessList() {
  const [popularBusinessList, setPopularBusinessList] = useState([]);

  useEffect(() => {
    GetBusinessList();
  }, []);

  const GetBusinessList = async () => {
    setPopularBusinessList([]);
    try {
      const q = query(collection(db, "BusinessList"));

      const querySnapshot = await getDocs(q);
      const businesses = [];
      querySnapshot.forEach((doc) => {
        businesses.push({ id: doc.id, ...doc.data() }); // Include the document ID
      });
      setPopularBusinessList(businesses);
    } catch (error) {
      console.error("Error fetching businesslist data:", error);
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Business</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>

      <FlatList
        data={popularBusinessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PopularBusinesscard business={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    paddingLeft: 20,
    marginTop: 10,
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  viewAll: {
    color: "blue",
    fontFamily: "outfit-medium",
  },
});
