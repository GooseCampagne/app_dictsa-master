import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView,} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Asistencias = ({ route }) => {
  const { obraId } = route.params;
  const [nombre, setNombre] = useState('');
  const [dia, setDia] = useState('');
  const [fecha, setFecha] = useState('');
  const [cod, setCod] = useState('');
  const [num, setNum] = useState('');
  const navigation = useNavigation();

  const handleGuardarAsistencia = () => {
    if (!nombre || !dia || !fecha || !cod || !num) {
      Alert.alert('Error', 'Por favor, complete todos los campos del formulario');
      return;
    }

    const formData = {
      dia: dia,
      fecha: fecha,
      nombre: nombre,
      cod: cod,
      num: num,
      id_obra: obraId
    };

    axios.post('https://xe3oa8v2t8.execute-api.us-east-2.amazonaws.com/desarrollo/asistencias', formData)
      .then(response => {
        Alert.alert('Éxito', 'Datos de asistencia agregados exitosamente', [
          { text: 'Aceptar', onPress: () => navigation.goBack() }
        ]);
        // Realizar cualquier acción adicional después de guardar los datos
      })
      .catch(error => {
        console.error('Error al agregar los datos de asistencia:', error);
        // Manejar el error en caso de que ocurra
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nombre'
          value={nombre}
          onChangeText={text => setNombre(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Día'
          value={dia}
          onChangeText={text => setDia(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Fecha'
          value={fecha}
          onChangeText={text => setFecha(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder='Código'
          value={cod}
          onChangeText={text => setCod(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Número'
          value={num}
          onChangeText={text => setNum(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Obra (el espacio se rellena automaticamente)'
          value={obraId}
          editable={false}
        />
        <Button
          style={styles.buttonagregar}
          title="Guardar Asistencia"
          onPress={handleGuardarAsistencia}
        />
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    
  },

  input: {
    width: '99%',
  height: 60,
  backgroundColor: 'white',
  borderRadius: 10,
  marginBottom: 10,
  paddingHorizontal: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  paddingStart: 15
  },
  form: {
    marginTop: 20,
    marginStart: 4
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 16, 
  },
});

export default Asistencias;
