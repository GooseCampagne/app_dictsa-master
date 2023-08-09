import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Pressable, Alert, BackHandler, ScrollView } from 'react-native';
import axios from 'axios';

const AddUsers = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [privilege, setPrivilege] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [numTrabajador, setNumTrabajador] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handlePrivilegeSelection = (selectedPrivilege) => {
    setPrivilege(selectedPrivilege);
    setModalVisible(false);
  };

  const handleAgregarUsuario = async () => {
    // Validacion de los campos
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !numTrabajador || !contrasena || !privilege) {
      Alert.alert('CAMPOS INCOMPLETOS', 'Por favor complete todos los campos e inténtelo de nuevo');
      return;
    }
    //ruta para agregar los datos
    try {
      const response = await axios.post('https://xe3oa8v2t8.execute-api.us-east-2.amazonaws.com/desarrollo/agregar-usuario', {
        workerid: numTrabajador,
        nombre: nombre,
        Apellido_paterno: apellidoPaterno,
        Apellido_materno: apellidoMaterno,
        pass: contrasena,
        privilege: privilege,
      });

      // alerta
      Alert.alert('Éxito', 'Usuario agregado exitosamente');

      // limpiar despues de enviar
      setNombre('');
      setApellidoPaterno('');
      setApellidoMaterno('');
      setNumTrabajador('');
      setContrasena('');
      setPrivilege('');
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.form}>
        <Text style={styles.formText}>Nombre</Text>
        <TextInput
          placeholder="NOMBRE"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.formText}>Apellido paterno</Text>
        <TextInput
          placeholder="APELLIDO PATERNO"
          style={styles.input}
          value={apellidoPaterno}
          onChangeText={setApellidoPaterno}
        />

        <Text style={styles.formText}>Apellido materno</Text>
        <TextInput
          placeholder="APELLIDO MATERNO"
          style={styles.input}
          value={apellidoMaterno}
          onChangeText={setApellidoMaterno}
        />

        <Text style={styles.formText}>Numero de trabajador</Text>
        <TextInput
          placeholder="No. Trabajador"
          style={styles.input}
          value={numTrabajador}
          onChangeText={setNumTrabajador}
        />

        <Text style={styles.formText}>Contraseña</Text>
        <TextInput
          placeholder="CONTRASEÑA"
          style={styles.input}
          value={contrasena}
          onChangeText={setContrasena}
        />

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>{privilege || 'Seleccionar privilegio'}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAgregarUsuario}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              AGREGAR
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancelar}>
          <View style={styles.buttonCancelar}>
            <Text style={styles.buttonText2}>
              CANCELAR
            </Text>
          </View>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Pressable style={styles.modalOption} onPress={() => handlePrivilegeSelection('admin')}>
                <Text style={styles.modalOptionText}>Admin</Text>
              </Pressable>
              <Pressable style={styles.modalOption} onPress={() => handlePrivilegeSelection('user')}>
                <Text style={styles.modalOptionText}>User</Text>
              </Pressable>
              <Pressable style={styles.modalOption} onPress={() => handlePrivilegeSelection('rh')}>
                <Text style={styles.modalOptionText}>RH</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      </ScrollView>
    </View>
  );
};

export default AddUsers

const styles = StyleSheet.create({
    Text:{
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5
    },
    form:{
        backgroundColor: 'white',
        width: '99%',
        height: '94%',
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    container:{
        paddingHorizontal: 5,
    },
    input:{
      width: '100%',
      height: 60,
      backgroundColor: 'white',
      borderRadius: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      paddingStart: 15

    },
    formText:{
        fontWeight: '700',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10
    },
    button:{
        backgroundColor: '#007AFF',
        height: 50,
        width: '99%',
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 10
      },
    buttonText:{
        textAlign: 'center',
        color: 'white',
        fontWeight: '700',
      },
      buttonCancelar:{
        backgroundColor: 'white',
        height: 50,
        width: '99%',
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 10,
        borderWidth: 3,
        borderColor: 'red',
      },
    buttonText2:{
        textAlign: 'center',
        color: 'red',
        fontWeight: '700',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
      },
      modalOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
      },
      modalOptionText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      inputText: {
        color: 'gray',
      },
      modalOptionText:{
      },
      inputText:{
        fontSize: 18,
        color: 'blue'
      },
      inputContainer:{
      width: '100%',
      height: 60,
      backgroundColor: 'white',
      borderRadius: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      paddingStart: 15,
      justifyContent: 'center'
      }
})