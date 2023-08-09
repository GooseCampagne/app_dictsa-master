import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoToHomeButton = () => {
  const navigation = useNavigation();
  const goToRes = () => {
    navigation.navigate('Home'); // Reemplaza 'Home' con el nombre de la pantalla de inicio en tu navegación
  };
  const goToHome = () => {
    navigation.navigate('Residente'); // Reemplaza 'Home' con el nombre de la pantalla de inicio en tu navegación
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToHome} style={styles.button}>
        <Text style={styles.buttonText}>Ir a Residente</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToRes} style={styles.button}>
        <Text style={styles.buttonText}>Regresar al admin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoToHomeButton;
