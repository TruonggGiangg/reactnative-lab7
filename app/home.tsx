import React, { useEffect, useState } from "react";
import { 
  View, 
  Text,         // 👈 thêm dòng này
  TextInput, 
  FlatList, 
  SafeAreaView, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator 
} from "react-native";

import { useRouter } from "expo-router";
import BikeCard from "../components/BikeCard";
import BikeModal from "../components/BikeModal";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetch("https://6830d4dc6205ab0d6c3a907d.mockapi.io/api/bikes")
      .then(res => res.json())
      .then(json => {
        setData(json);
        setFilteredData(json);
        setLoading(false);
      });
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const newData = data.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  const handleDelete = (id: string) => {
    fetch(`https://6830d4dc6205ab0d6c3a907d.mockapi.io/api/bikes/${id}`, {
      method: "DELETE",
    }).then(() => {
      setData(prev => prev.filter(item => item.id !== id));
      setFilteredData(prev => prev.filter(item => item.id !== id));
    });
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <BikeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(newData) => {
          // POST
          fetch("https://6830d4dc6205ab0d6c3a907d.mockapi.io/api/bikes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
          })
            .then(res => res.json())
            .then(created => {
              setData(prev => [...prev, created]);
              setFilteredData(prev => [...prev, created]);
              setModalVisible(false);
            });
        }}
        editItem={editItem}
      />

      <TouchableOpacity
        onPress={() => { setEditItem(null); setModalVisible(true); }}
        style={styles.addButton}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>+ Add New Bike</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Search by name..."
        value={search}
        onChangeText={handleSearch}
        style={styles.searchBox}
      />

      <FlatList
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", gap: 12 }}
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BikeCard
            item={item}
            onPress={() => router.push({ pathname: "/details", params: item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  addButton: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8, margin: 16 },
  searchBox: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginHorizontal: 16, marginBottom: 16 },
});
