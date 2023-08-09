import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';


const ProfileScreen = ({ route }) => {
  const { workerid } = route.params;
  const [perfiles, setPerfiles] = useState([]);
  const navigation = useNavigation();



  useEffect(() => {
    fetchPerfiles();
  }, []);



  const handlePasswordChange = () => {
    navigation.navigate('passwordReset', { workerid });
  };
  const fetchPerfiles = async () => {
    try {
      const response = await axios.get(`https://xe3oa8v2t8.execute-api.us-east-2.amazonaws.com/desarrollo/usuario-profile?workerid=${workerid}`);
      setPerfiles(response.data);
    } catch (error) {
      console.error('Error al obtener los perfiles:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header /> 
      <ScrollView>
        <View style={styles.profileCard}>
          <Image source={require('../../assets/pfp.png')} style={styles.pfp} />
        </View>
        {perfiles.map((perfil) => (
          <View key={perfil.id}>
            <Text style={styles.Text}>Nombre:</Text>
            <View style={styles.Card}>
              <Text>
                {perfil.Nombre} {perfil.Apellido_paterno} {perfil.Apellido_materno}
              </Text>
            </View>
            <Text style={styles.Text}>Numero de trabajador:</Text>
            <View style={styles.Card}>
              <Text>{perfil.workerid}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.buttonContainer} onPress={handlePasswordChange}>
          <View style={styles.Button}>
            <Text style={styles.buttonText}>Restablecer contraseña</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

 const styles = StyleSheet.create({
     profileCard: {
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
         marginVertical: '2.5%', 
         height: 300,
         justifyContent: 'center',
         alignContent: 'center',
         alignItems: 'center'
     },
     pfp:{
         height: 200,
         width: 200,
         borderRadius: 100
     },
     Text:{
         color: '#007AFF',
         fontWeight: '700',
         fontSize: 15,
         marginTop: 3,
         paddingHorizontal: 5
     },
     Card:{
       backgroundColor: '#fff',
       borderRadius: 5,
       padding: 20,
       marginVertical: 8,
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
       elevation: 2,
       marginHorizontal: '1.5%', // 85% de margen en total (7.5% a cada lado)
      
     },
     TextInfo:{
         color: '#007AFF',
         fontWeight: '700',
         fontSize: 15,
         paddingStart: 20
     },
     Button:{
        width: 180,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
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
        alignItems: 'center',
        marginTop: 10
     }
 });



export default ProfileScreen