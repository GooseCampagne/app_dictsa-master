import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

const AvancesScreen = ({ route }) => {
  const [avances, setAvances] = useState([]);
  const { obraId } = route.params;
  const [selectedDayAvances, setSelectedDayAvances] = useState('');
  const [selectedDayIncidencias, setSelectedDayIncidencias] = useState('');
  const navigation = useNavigation();
  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
    fetchAvances();
    fetchIncidencias();
  }, []);

  const fetchAvances = async () => {
    try {
      const response = await axios.get(`https://xe3oa8v2t8.execute-api.us-east-2.amazonaws.com/desarrollo/avances?id_obra=${obraId}`);
      setAvances(response.data);
    } catch (error) {
      console.error('Error al obtener los avances:', error);
    }
  };

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

  const daysOfWeek = [
    { day: 'Lunes', value: 'lunes' },
    { day: 'Martes', value: 'martes' },
    { day: 'Miércoles', value: 'miercoles' },
    { day: 'Jueves', value: 'jueves' },
    { day: 'Viernes', value: 'viernes' },
    { day: 'Sabado', value: 'sabado' },
    { day: 'Domingo', value: 'domingo' },
  ];

  const renderDayButtonAvances = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dayButton,
        selectedDayAvances === item.value && styles.selectedDayButton,
      ]}
      onPress={() => setSelectedDayAvances(item.value)}
    >
      <Text
        style={[
          styles.dayButtonText,
          selectedDayAvances === item.value && styles.selectedDayButtonText,
        ]}
      >
        {item.day}
      </Text>
    </TouchableOpacity>
  );

  const renderDayButtonIncidencias = ({ item }) => (
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

  return (
    <View style={styles.container}>
      <Header /> 
      <Text style={styles.heading}>Avances</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <FlatList
          horizontal
          data={daysOfWeek}
          renderItem={renderDayButtonAvances}
          keyExtractor={(item) => item.value}
          showsHorizontalScrollIndicator={false}
        />
        {avances
          .filter((avance) => avance.dia_semana.toLowerCase() === selectedDayAvances)
          .map((avance) => (
            <View key={avance.id_avance} style={styles.card}>
              <Text style={styles.text}>Avances del día {avance.dia_semana}</Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Tarea:</Text>
                <Text style={styles.cardMaterials}>{avance.tarea}</Text>
                <Text style={styles.title}>Material:</Text>
                <Text style={styles.cardMaterials}>{avance.material}</Text>
                <Text style={styles.title}>Cantidad:</Text>
                <Text style={styles.cardMaterials}>{avance.cantidad}</Text>
                <Text style={styles.title}>Resultados:</Text>
                <Text style={styles.cardMaterials}>{avance.resultados}</Text>
                <Text style={styles.title}>Observaciones:</Text>
                <Text style={styles.cardMaterials}>{avance.observaciones}</Text>
              </View>
            </View>
          ))}
        <Text style={styles.heading}>Incidencias</Text>
        <FlatList
          horizontal
          data={daysOfWeek}
          renderItem={renderDayButtonIncidencias}
          keyExtractor={(item) => item.value}
          showsHorizontalScrollIndicator={false}
        />
        {incidencias
          .filter((incidencia) => incidencia.dia.toLowerCase() === selectedDayIncidencias)
          .map((incidencia) => (
            <View key={incidencia.id} style={styles.card}>
              <Text style={styles.text}>Incidencia</Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Dia:</Text>
                <Text style={styles.cardMaterials}>{incidencia.dia}</Text>
                <Text style={styles.title}>Fecha:</Text>
                <Text style={styles.cardMaterials}>{incidencia.fecha}</Text>
                <Text style={styles.title}>Nombre:</Text>
                <Text style={styles.cardMaterials}>{incidencia.nombre}</Text>
                <Text style={styles.title}>cod:</Text>
                <Text style={styles.cardMaterials}>{incidencia.cod}</Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 0,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10

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
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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

export default AvancesScreen;