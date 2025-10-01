import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function GettingStarted() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/a.png")} style={styles.image} />
      <Text style={styles.title}>Welcome to Sporter Store</Text>
      <Text style={styles.desc}>
        A premium online store for sporters and their stylish choice
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  image: { width: 220, height: 220, resizeMode: "contain", marginBottom: 30 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  desc: { fontSize: 16, color: "#555", marginBottom: 30, textAlign: "center" },
  button: { backgroundColor: "#007AFF", paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
