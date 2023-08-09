import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://xe3oa8v2t8.execute-api.us-east-2.amazonaws.com/desarrollo/login', {
        workerid: username,
        pass: password,
      });

      const privilege = response.data.privilege;
      const workerid = response.data.workerid;
      const Nombre = response.data.Nombre; 

      // tipos de usuarios
      if (privilege === 'admin') {
        navigation.navigate('Home', { workerid });
      } else if (privilege === 'user') {
        navigation.navigate('Residente', { workerid });
      } else if (privilege === 'rh') {
        navigation.navigate('rh', { workerid });
      } else {
        // Manejo de caso no válido
      }

      // alerta si es correcta la sesion
      Alert.alert('Bienvenido', `¡Bienvenido ${Nombre}!`);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      // si son incorrectos 
      Alert.alert('Error', 'Datos incorrectos');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (text) => {
    // Filtrar caracteres no deseados
    const filteredText = text.replace(/[^a-zA-Z0-9]/g, '');
    setUsername(filteredText);
  };

  const handlePasswordChange = (text) => {
    // Filtrar caracteres no deseados
    const filteredText = text.replace(/[^a-zA-Z0-9]/g, '');
    setPassword(filteredText);
  };

  return (
    <ImageBackground
      source={require('../../assets/loginbackground.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.gradient} />
        <View style={styles.titleContainer}>
          <Text style={styles.Title}>DiCTSA</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={handleUsernameChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Contraseña</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity style={styles.showPasswordButton} onPress={toggleShowPassword}>
              <Text style={styles.showPasswordButtonText}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.inputContainerPassword}>
          <Text style={styles.textRecuperar}>Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent'
  },
  titleContainer: {
    flex: 1,
    position: 'absolute',
    right: 0,
    left: 90,
    top: 60,
    bottom: 0
  },
  Title: {
    fontSize: 55,
    fontWeight: '600',
    color: 'white'
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    paddingStart: 15
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 5,
    color: 'white'
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    opacity: 0.9,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  textRecuperar: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
    marginBottom: 10,
    color: 'white',
  },
  inputContainerPassword: {
    textAlign: 'right',
    marginLeft: 155
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    paddingStart: 15
  },
  showPasswordButton: {
    paddingHorizontal: 10,
    position: 'absolute',
    right: 5,
  },
  showPasswordButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'grey',
  }
});

export default LoginScreen;
