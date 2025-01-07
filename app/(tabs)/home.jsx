import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import Category from "@/components/Home/Category";
import PopularBusinessList from "../../components/Home/PopularBusinessList";
// import { ScrollView } from "react-native-web";

export default function home() {
  return (
    <ScrollView>
      {/*Header*/}
      <Header />

      {/*Slider*/}
      <Slider />

      {/*Category*/}
      <Category />

      {/*PopularBusinessList*/}
      <PopularBusinessList />
      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
}
