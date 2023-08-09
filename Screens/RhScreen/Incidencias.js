import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Incidencias = () => {
  const [obras, setObras] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchObras();
  }, []);

  // Mandar a traer las obras
  const fetchObras = async () => {
    try {
      const response = await axios.get('https://xe3oa8v2t8.execute-api.us-east-2.amazonaws.com/desarrollo/obras');
      setObras(response.data);
    } catch (error) {
      console.error('Error al obtener las obras:', error);
    }
  };

  // Redireccionar a la pantalla de avances
  const handleObraPress = (obraId) => {
    navigation.navigate('asistencias', { obraId });
  };

  return (
    <View>
      {/* <Header /> */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          {obras.map((obra) => (
            <View key={obra.id_obra} style={styles.card}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => handleObraPress(obra.id_obra)}
              >
                <Text style={styles.title}>{obra.nombre_obra}</Text>
                <Text>Encargado: {obra.encargado}</Text>
                <Text>Fecha de inicio: {obra.fecha_inicio}</Text>
                <Text>Fecha de cierre: {obra.fecha_cierre}</Text>
                <Text>Status: {obra.status}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    height: 150,
    marginTop: 10,
    marginLeft: 6,
    marginRight: 6
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    flexGrow: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 16, 
  },
});

export default Incidencias