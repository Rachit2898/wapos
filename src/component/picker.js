import React, { Component, useState } from "react";
import { View, TouchableOpacity, Modal, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomPicker = ({ items, selectedValue, onValueChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setShowModal(false);
    onValueChange(item.value);
  };
  console.log({ selectedValue });

  return (
    <View style={{ marginLeft: 80 }}>
      <TouchableOpacity style={styles.picker} onPress={openModal}>
        <Text style={styles.selectedItemText}>
          {selectedItem ? selectedItem.label : selectedValue}
        </Text>
        <Ionicons
          name="chevron-down-outline"
          size={24}
          color="#44c7f3"
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalContent}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.modalItem}
                onPress={() => selectItem(item)}
              >
                <Text style={styles.modalItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  picker: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 30,
  },
  selectedItemText: {
    color: "#44c7f3",
    fontWeight: "bold",
    fontSize: 15,
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 180,
    paddingLeft: 180,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 150,
    maxWidth: 300,
  },
  modalItem: {
    paddingVertical: 8,
  },
  modalItemText: {
    fontSize: 18,
    color: "#44c7f3",
  },
});
