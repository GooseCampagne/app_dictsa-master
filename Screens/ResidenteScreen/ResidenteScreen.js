import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

const ResidenteScreen = ({ route }) => {
  const [obra, setCards] = useState([]);
  const { workerid } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`https://xe3oa8v2t8.execute-api.us-east-2.amazonaws.com/desarrollo/cards?workerid=${workerid}`);
      setCards(response.data);
    } catch (error) {
      console.error('Error al obtener las cards:', error);
    }
  };

  const handleObraPress = (obraId) => {
    navigation.navigate('ResidenteAvances', { obraId });
  };
  const handleProfile = () => {
    navigation.navigate('profile', { workerid });
  };

  return (
    <ScrollView>
    <Header /> 
    {obra.map((obraItem) => (
      <TouchableOpacity
        key={obraItem.id}
        onPress={() => handleObraPress(obraItem.id_obra)}
      >
        <View key={`obra-${obraItem.id}`} style={styles.card}>
          <Text style={styles.title}>{obraItem.nombre_obra}</Text>
          <Text>
            Encargado: <Text>{obraItem.encargado}</Text>
          </Text>
          <Text>
            Fecha de inicio: <Text>{obraItem.fecha_inicio}</Text>
          </Text>
          <Text>
            Fecha de cierre: <Text>{obraItem.fecha_cierre}</Text>
          </Text>
          <Text>
            Status: <Text>{obraItem.status}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    ))}
    <TouchableOpacity style={styles.buttonContainer} onPress={handleProfile}>
      <View style={styles.Button}>
        <Text style={styles.buttonText}>Perfil</Text>
      </View>
    </TouchableOpacity>
  </ScrollView>
);
};

export default ResidenteScreen

const styles = StyleSheet.create({
    WelcomeText:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 400
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
    Button:{
      width: 70,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 50,
      borderWidth: 2,
      borderColor: '#007AFF',
      justifyContent: 'center',
   },
   buttonText:{
      justifyContent: 'center',
      textAlign: 'center',
      color: '#007AFF',
      fontWeight: '700'
   },
   buttonContainer:{
    alignItems: 'flex-end',
      marginTop: 10
   }
})