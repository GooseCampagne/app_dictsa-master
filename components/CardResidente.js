import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


//ESTO YA NO SIRVE SOLO ERA ESTETICO, TODO SE HACE DESDE SUS SCREENS



const CardResidente = () => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('ResidenteAvances');
  };

  return (
      <TouchableOpacity style={styles.container} onPress={handleCardPress}>
        <View>
         <Text style={styles.obraNombre}>Aguas Municipales </Text>
         <Text style={styles.residenteEncargado}>Juan Perez </Text>
         <Text style={styles.fechaInicio}>24/07/2023 </Text>
         <Text style={styles.obraStatus}>Activa </Text>
        </View>
      </TouchableOpacity>
    );
  };


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 20,
      marginVertical: 19,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      marginHorizontal: '1.5%', // 85% de margen en total (7.5% a cada lado)
    },
    obraNombre: {
      fontSize: 18,
      fontWeight: 'bold',
      justifyContent: 'center',
      textAlign: 'center'
    },
    residenteEncargado: {
      marginTop: 5,
      fontSize: 16,
      textAlign: 'center'
    },
    fechaInicio: {
      marginTop: 5,
      fontSize: 14,
      color: 'gray',
      textAlign: 'center'
    },
    obraStatus: {
      fontSize: 14,
      fontWeight: 'bold',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: 5
    },
  });
export default CardResidente;
