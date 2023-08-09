import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, RefreshControl } from 'react-native';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ObrasScreen = () => {
  const [obras, setObras] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
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
    navigation.navigate('Avances', { obraId });
  };

  const handleEditIconPress = (obraId) => {
    navigation.navigate('Avances', { obraId });
  };

  // Manejar la acción de refrescar
  const handleRefresh = () => {
    setRefreshing(true);
    fetchObras();
    setRefreshing(false);
    
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
           <Header /> 
    <View style={styles.fondo}>
 
      
        <SearchBar />
        <View style={styles.content}>
          {obras.map((obra) => (
            <View key={obra.id_obra} style={styles.card}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => handleObraPress(obra.id_obra)}
              >
                <View style={styles.insideCard}>
                  <Text style={styles.title}>{obra.nombre_obra}</Text>
                  <TouchableOpacity
                    style={styles.usericonright}
                    onPress={() => handleEditIconPress(obra.id_obra)} // Manejar el toque del ícono "edit"
                  >
                    <Icon name="edit" size={25} color="black" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.data}>Encargado: {obra.encargado}</Text>
                <Text style={styles.data}>Fecha de inicio: {obra.fecha_inicio}</Text>
                <Text style={styles.data}>Fecha de cierre: {obra.fecha_cierre}</Text>
                <Text style={styles.data}>Status: {obra.status}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
  
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40
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
    height: 160,
    marginTop: 10,
    marginLeft: 6,
    marginRight: 6,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black'
  },
  content: {
    flexGrow: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 16, 
  },
  insideCard:{
    backgroundColor: 'white',
    width: 353,
    height: 30,
    position: 'absolute',
    borderRadius: 5,
    borderBottomWidth: 2,
    borderColor: 'black'
  },
  data:{
    fontSize: 15,
    fontWeight: '500',
    color: 'black'
  },
  usericonright:{
    position: 'absolute',
    right: 3
  },
  fondo:{
    
  }
});

export default ObrasScreen;