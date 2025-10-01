import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  item: any;
  onPress: () => void;
  onDelete: () => void;
}

export default function BikeCard({ item, onPress, onDelete }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={require("../assets/b.png")} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <Text style={{ color: "white" }}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: "#f9f9f9", borderRadius: 10, padding: 12, marginBottom: 16, alignItems: "center" },
  image: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 14, fontWeight: "bold", marginBottom: 6, textAlign: "center" },
  price: { color: "#007AFF", fontWeight: "600" },
  deleteBtn: { backgroundColor: "red", padding: 8, borderRadius: 6, marginTop: 6 },
});
