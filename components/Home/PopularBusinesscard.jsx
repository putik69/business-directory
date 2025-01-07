import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function PopularBusinesscard({ business }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/businessdetail/${business.id}`)} // Navigate to dynamic route
      style={styles.card}
    >
      <Image source={{ uri: business?.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{business.name}</Text>
        <Text style={styles.address}>{business.address}</Text>
        <View style={styles.row}>
          <View style={styles.rating}>
            <Image
              source={require("./../../assets/images/star.png")}
              style={styles.starIcon}
            />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
          <Text style={styles.category}>{business.Category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 15,
  },
  info: {
    marginTop: 7,
    gap: 5,
  },
  name: {
    fontFamily: "outfit-bold",
    fontSize: 16,
  },
  address: {
    fontFamily: "outfit",
    fontSize: 16,
    color: "gray",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rating: {
    flexDirection: "row",
    gap: 5,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  ratingText: {
    fontFamily: "outfit-medium",
  },
  category: {
    fontFamily: "outfit",
    backgroundColor: "purple",
    color: "#fff",
    padding: 3,
    fontSize: 10,
    borderRadius: 10,
  },
});
