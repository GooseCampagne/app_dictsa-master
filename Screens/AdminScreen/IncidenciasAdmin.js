import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const IncidenciasAdmin = ({ route }) => {
  const [incidencias, setIncidencias] = useState([]);
  const { obraId } = route.params;
  const [selectedDayIncidencias, setSelectedDayIncidencias] = useState('');
  const daysOfWeek = [
    { day: 'Lunes', value: 'lunes' },
    { day: 'Martes', value: 'martes' },
    { day: 'Miércoles', value: 'miercoles' },
    { day: 'Jueves', value: 'jueves' },
    { day: 'Viernes', value: 'viernes' },
    { day: 'Sábado', value: 'sabado' },
  ];

  const renderDayButtonIncidencias = ({ item }) => ( // Función de renderizado de botones de día para incidencias
    <TouchableOpacity
      style={[
        styles.dayButton,
        selectedDayIncidencias === item.value && styles.selectedDayButton,
      ]}
      onPress={() => setSelectedDayIncidencias(item.value)}
    >
      <Text
        style={[
          styles.dayButtonText,
          selectedDayIncidencias === item.value && styles.selectedDayButtonText,
        ]}
      >
        {item.day}
      </Text>
    </TouchableOpacity>
  );
  useEffect(() => {
    fetchIncidencias();
  }, []);

  const fetchIncidencias = async () => {
    try {
      const response = await axios.get(
        `https://xe3oa8v2t8.execute-api.us-east-2.amazonaws.com/desarrollo/incidencias-admin?id_obra=${obraId}`
      );
      setIncidencias(response.data);
    } catch (error) {
      console.error('Error al obtener las incidencias:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
          horizontal
          data={daysOfWeek}
          renderItem={renderDayButtonIncidencias}
          keyExtractor={(item) => item.value}
          showsHorizontalScrollIndicator={false}
        />
      {incidencias
      .filter((avance) => avance.dia.toLowerCase() === selectedDayIncidencias)
      .map((incidencia) => (
      <ScrollView contentContainerStyle={styles.scrollViewContent}> 
        <Text style={styles.heading}>Avances</Text>
        <View style={styles.card}>       
            <View key={incidencia.id}>
              <Text style={styles.title}>Dia:</Text>
              <Text>{incidencia.dia}</Text>
              <Text style={styles.title}>Fecha:</Text>
              <Text>{incidencia.fecha}</Text>
              <Text style={styles.title}>Nombre:</Text>
              <Text>{incidencia.nombre}</Text>
              <Text style={styles.title}>cod:</Text>
              <Text>{incidencia.cod}</Text>
            </View>
        </View>
      </ScrollView>
      ))}
    </View>
  );
};

export default IncidenciasAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 0,
    alignItems: 'center',
    paddingTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dayButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedDayButton: {
    backgroundColor: '#ccc',
  },
  dayButtonText: {
    fontSize: 16,
  },
  selectedDayButtonText: {
    fontWeight: 'bold',
  },
  card: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardMaterials: {
    fontSize: 14,
    marginBottom: 5,
  },
});
