import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  editItem?: any;
}

export default function BikeModal({ visible, onClose, onSubmit, editItem }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setPrice(editItem.price);
      setDesc(editItem.desc);
    } else {
      setName("");
      setPrice("");
      setDesc("");
    }
  }, [editItem]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{editItem ? "Edit Bike" : "Add New Bike"}</Text>

          <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
          <TextInput placeholder="Description" value={desc} onChangeText={setDesc} style={styles.input} />

          <View style={styles.row}>
            <TouchableOpacity onPress={onClose} style={[styles.btn, { backgroundColor: "#aaa" }]}>
              <Text style={{ color: "#fff" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onSubmit({ name, price, desc })}
              style={[styles.btn, { backgroundColor: "#007AFF" }]}
            >
              <Text style={{ color: "#fff" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" },
  box: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "80%" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  btn: { padding: 12, borderRadius: 8, flex: 1, marginHorizontal: 4, alignItems: "center" },
});
