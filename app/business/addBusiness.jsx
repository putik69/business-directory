import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { db } from "./../../config/FirebaseConfig";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const { user } = useUser();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });
    GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result?.assets[0]?.uri);
    }
  };

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  const saveBusinessDetail = async () => {
    if (!name || !address || !contact || !category || !about) {
      ToastAndroid.show("Please fill all fields!", ToastAndroid.LONG);
      return;
    }

    setLoading(true);

    try {
      const businessId = Date.now().toString(); // Unique ID
      const businessData = {
        name,
        address,
        contact,
        website,
        category,
        about,
        username: user?.fullName || "Anonymous",
        userEmail: user?.primaryEmailAddress?.emailAddress || "Unknown",
        imageUrl: image || "",
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "BusinessList", businessId), businessData);

      ToastAndroid.show("Business added successfully!", ToastAndroid.LONG);
      setLoading(false);

      setName("");
      setAddress("");
      setContact("");
      setWebsite("");
      setAbout("");
      setCategory("");
      setImage(null);
    } catch (error) {
      console.error("Error saving business:", error);
      ToastAndroid.show(
        "Failed to add business. Try again.",
        ToastAndroid.LONG
      );
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Add New Business
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          color: "gray",
        }}
      >
        Fill all details to add a new business.
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
        }}
        onPress={onImagePick}
      >
        {!image ? (
          <Image
            source={require("./../../assets/images/logoexpress.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(v) => setName(v)}
          style={{
            padding: 15,
            borderRadius: 5,
            borderWidth: 1,
            fontSize: 15,
            marginTop: 10,
            fontFamily: "outfit",
            backgroundColor: "white",
            borderColor: "gray",
          }}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={(v) => setAddress(v)}
          style={{
            padding: 15,
            borderRadius: 5,
            borderWidth: 1,
            fontSize: 15,
            marginTop: 10,
            fontFamily: "outfit",
            backgroundColor: "white",
            borderColor: "gray",
          }}
        />
        <TextInput
          placeholder="Contact"
          value={contact}
          onChangeText={(v) => setContact(v)}
          style={{
            padding: 15,
            borderRadius: 5,
            borderWidth: 1,
            fontSize: 15,
            marginTop: 10,
            fontFamily: "outfit",
            backgroundColor: "white",
            borderColor: "gray",
          }}
        />
        <TextInput
          placeholder="Website"
          value={website}
          onChangeText={(v) => setWebsite(v)}
          style={{
            padding: 15,
            borderRadius: 5,
            borderWidth: 1,
            fontSize: 15,
            marginTop: 10,
            fontFamily: "outfit",
            backgroundColor: "white",
            borderColor: "gray",
          }}
        />
        <TextInput
          placeholder="About"
          value={about}
          onChangeText={(v) => setAbout(v)}
          multiline
          numberOfLines={5}
          style={{
            padding: 15,
            borderRadius: 5,
            borderWidth: 1,
            fontSize: 15,
            marginTop: 10,
            fontFamily: "outfit",
            backgroundColor: "white",
            borderColor: "gray",
            height: 100,
          }}
        />
        <View
          style={{
            borderRadius: 5,
            borderWidth: 1,
            marginTop: 10,
            fontFamily: "outfit",
            backgroundColor: "white",
            borderColor: "gray",
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={categoryList}
            value={category}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={saveBusinessDetail}
        disabled={loading}
        style={{
          padding: 10,
          backgroundColor: loading ? "gray" : "#ADD8E6",
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            color: "white",
            textAlign: "center",
          }}
        >
          {loading ? "Saving..." : "Add New Business"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
