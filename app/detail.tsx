import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Details() {
  const { name, price, desc } = useLocalSearchParams();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Image source={require("../assets/b.png")} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.desc}>{desc}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", height: 250, resizeMode: "cover" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  price: { fontSize: 20, color: "#007AFF", fontWeight: "600", marginBottom: 20 },
  desc: { fontSize: 16, color: "#555", lineHeight: 22, marginBottom: 20 },
  button: { backgroundColor: "#007AFF", padding: 14, borderRadius: 30, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
