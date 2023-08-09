import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const ChangePassword = ({ route }) => {
  const { workerid } = route.params;
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = async () => {
    if (newPassword.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa una nueva contraseña');
      return;
    }

    try {
      await axios.put(`http://192.168.1.2:3000/usuario-profile/${workerid}`, { pass: newPassword });
      Alert.alert('Éxito', 'La contraseña se ha restablecido correctamente');
      console.log('Contraseña actualizada exitosamente');
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      Alert.alert('Error', 'Ocurrió un error al restablecer la contraseña');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Cambiar contraseña</Text>
        <TextInput
          placeholder='Nueva contraseña'
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handlePasswordChange}>
          <View style={styles.Button}>
            <Text style={styles.buttonText}>Hecho</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword

const styles = StyleSheet.create({
    formContainer:{
        backgroundColor: 'white',
        width: '99%',
        height: 500,
        paddingStart: 5
        
    },
    input:{
        backgroundColor: 'white',
        width: '99%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        paddingStart: 10,
        marginTop: 10
    },
    text:{
        fontWeight: '700',
        fontSize: '20',
        textAlign: 'center',
        marginBottom: 10
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
})