import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';


const IncidenciaForm = () => {
  const [obra, setObra] = useState('');
  const [workerid, setWorkerid] = useState('');


  const handleAddIncidencia = async () => {
    // Validacion de los campos
    if (!obra || !workerid) {
      Alert.alert('CAMPOS INCOMPLETOS', 'Por favor complete todos los campos e inténtelo de nuevo');
      return;
    }
    try {
      const response = await axios.post('http://192.168.1.2:3000/agregar-incidencia', {
        obra,
        workerid,
      });
  
      // Reiniciar los campos del formulario
      setObra('');
      setWorkerid('');
  
    } catch (error) {
      console.error('Error al agregar la incidencia:', error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Obra"
        value={obra}
        onChangeText={setObra}
      />
      <TextInput
        style={styles.input}
        placeholder="Residente"
        value={workerid}
        onChangeText={setWorkerid}
      />
      <Button title="Agregar Incidencia" onPress={handleAddIncidencia} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default IncidenciaForm;
