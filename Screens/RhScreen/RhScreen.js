import { StyleSheet, Text, View,ScrollView, TouchableOpacity  } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


const RhScreen = () => {
  const navigation = useNavigation();




  const handleAgregarUsers = (obraId) => {
    navigation.navigate('addusers');
  };
  const handleRegistredUsers = (obraId) => {
    navigation.navigate('users');
  };
  const handleIncidencias = (obraId) => {
    navigation.navigate('incidencias');
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.container}>
      {/* <Text style={styles.WelcomeText}>Bienvenido al sistema DiCTSA</Text>
      <Text style={styles.WelcomeText2}>Administra las incidencias de los residentes!, agrega o eliminalos!</Text> */}
     
      <TouchableOpacity style={styles.card} onPress={handleAgregarUsers}>
        <View>
        <Icon name="plus" size={20} color="black" style={styles.usericon} />
        <Icon name="chevron-right" size={20} color="black" style={styles.usericonright} />
         <Text style={styles.usuarioscardtext}>Agregar usuarios</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleRegistredUsers}>
        <View>
        <Icon name="users" size={20} color="black" style={styles.usericon} />
        <Icon name="chevron-right" size={20} color="black" style={styles.usericonright} />
         <Text style={styles.usuarioscardtext}>Usuarios registrados</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleIncidencias}>
        <View>
        <Icon name="newspaper-o" size={20} color="black" style={styles.usericon} />
        <Icon name="chevron-right" size={20} color="black" style={styles.usericonright} />
         <Text style={styles.usuarioscardtext}>Incidencias</Text>
        </View>
      </TouchableOpacity>
    </View>
    </ScrollView>
  )
}

export default RhScreen

const styles = StyleSheet.create({
    WelcomeText:{
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 20,
        marginTop: 5
    },
    WelcomeText2:{
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 20,
        marginTop: 10
    },
    container:{
      backgroundColor: 'white',
      height: 1000,
      paddingHorizontal: 3
    },
    buttonText:{
      textAlign: 'center',
      color: 'white',
      fontWeight: '700',
    },
    button:{
      backgroundColor: '#007AFF',
      height: 50,
      width: '100%',
      borderRadius: 10,
      justifyContent: 'center',
      marginTop: 10
    },
    buttonEliminar:{
      backgroundColor: 'white',
      height: 50,
      width: '100%',
      borderRadius: 10,
      justifyContent: 'center',
      marginTop: 10,
      borderWidth: 3,
      borderColor: 'red'
    },
    buttonText2:{
      textAlign: 'center',
      color: 'red',
      fontWeight: '700',
    },
    card:{
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 20,
      marginVertical: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
      marginHorizontal: '1.5%', // 85% de margen en total (7.5% a cada lado)
      height: 60
    },
    usericon:{
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
    usuarioscardtext:{
      fontWeight: '700',
      paddingStart: 80
    },
    usericonright:{
      position: 'absolute',
      top: 0,
      right: 0,
      left: 300,
      bottom: 0,
    },
})