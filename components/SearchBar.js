import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Modal, Platform, Button, Text, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  const handleSearch = () => {
    // Lógica de búsqueda (todavia no funciona)
  };
  const navigation = useNavigation();
  const handlePlusPress = () => {
    navigation.navigate('NewObra');
}; 
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar obra..."
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.addButton} onPress={handlePlusPress}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '1.5%',
    marginTop: 30,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    paddingStart: 15,
    width: 200
  },
  datePickerButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  fechaInicioText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  createButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SearchBar;
