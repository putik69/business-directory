import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onCategoryPress(category)}>
        <Image source={{ uri: category.icon }} style={styles.icon} />

        <Text style={styles.name}>{category.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 3,
  },
  name: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "outfit-medium",
  },
});
