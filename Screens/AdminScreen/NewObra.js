import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Modal, Alert, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import axios from 'axios';

const AgregarObraScreen = () => {
  const [codigoObra, setCodigoObra] = useState('');
  const [nombreObra, setNombreObra] = useState('');
  const [encargado, setEncargado] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaCierre, setFechaCierre] = useState('');
  const [status, setStatus] = useState('');
  const [showModalEncargado, setShowModalEncargado] = useState(false);
  const [showModalStatus, setShowModalStatus] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAgregarObra = async () => {
    if (!codigoObra || !nombreObra || !selectedUser || !fechaInicio || !fechaCierre || !status) {
      Alert.alert('CAMPOS INCOMPLETOS', 'Por favor complete todos los campos e intentelo de nuevo');
      return;
    }

    try {
      const response = await axios.post('https://xe3oa8v2t8.execute-api.us-east-2.amazonaws.com/desarrollo/agregar-obra', {
        codigo_obra: codigoObra,
        nombre_obra: nombreObra,
        encargado: selectedUser,
        fecha_inicio: fechaInicio,
        fecha_cierre: fechaCierre,
        status: status,
      });

      // Mostrar alerta de éxito
      Alert.alert('Éxito', 'Obra agregada exitosamente');

      // Limpiar los campos después de la inserción exitosa
      setCodigoObra('');
      setNombreObra('');
      setEncargado('');
      setFechaInicio('');
      setFechaCierre('');
      setStatus('');
      setSelectedUser(null);
    } catch (error) {
      console.error('Error al agregar la obra:', error);
      // Manejar el error al agregar la obra
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get('https://xe3oa8v2t8.execute-api.us-east-2.amazonaws.com/desarrollo/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      // Manejar el error al obtener los usuarios
    }
  };

  const selectUser = (user) => {
    setEncargado(user.workerid);
    setSelectedUser(user.workerid);
    setShowModalEncargado(false);
  };

  const handleStatusSelection = (selectedStatus) => {
    setStatus(selectedStatus);
    setShowModalStatus(false);
  };

  const validateAndAutocompleteDate = (text, inputName) => {
    const formattedText = text.replace(/[^0-9/]/g, ''); // Eliminar cualquier carácter que no sea número o slash
    let autocompletedText = formattedText;
    if (formattedText.length === 4 && inputName !== 'status') {
      autocompletedText += '/';
    } else if (formattedText.length === 7 && inputName !== 'status') {
      autocompletedText += '/';
    }
    return autocompletedText;
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.Text}>Codigo de la obra</Text>
          <TextInput
            style={styles.input}
            placeholder="Código de obra"
            value={codigoObra}
            onChangeText={setCodigoObra}
          />
          <Text style={styles.Text}>Nombre de la obra</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de obra"
            value={nombreObra}
            onChangeText={setNombreObra}
          />
          <TouchableOpacity style={styles.encargadoButton} onPress={() => {
            getUsers();
            setShowModalEncargado(true);
          }}>
            <Text style={styles.encargadoButtonText}>Seleccionar Encargado</Text>
          </TouchableOpacity>
          <View style={styles.selectedUserContainer}>
            {selectedUser && (
              <Text style={styles.selectedUserText}>
                {encargado}
              </Text>
            )}
          </View>
          <Text style={styles.Text}>Fecha de inicio</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY/MM/DD"
            value={fechaInicio}
            onChangeText={(text) => setFechaInicio(validateAndAutocompleteDate(text, 'fechaInicio'))}
            keyboardType="numeric"
          />
          <Text style={styles.Text}>Fecha de cierre</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY/MM/DD"
            value={fechaCierre}
            onChangeText={(text) => setFechaCierre(validateAndAutocompleteDate(text, 'fechaCierre'))}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={() => setShowModalStatus(true)}>
            <Text style={styles.buttonText}>Seleccionar Status</Text>
          </TouchableOpacity>
          <View style={styles.selectedStatusContainer}>
            {status && (
              <Text style={styles.selectedStatusText}>
                {status}
              </Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleAgregarObra}>
            <Text style={styles.buttonText}>Agregar Obra</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Modal para seleccionar el Encargado */}
      <Modal visible={showModalEncargado} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Seleccione un Encargado</Text>
          {users.map((user) => (
            <TouchableOpacity key={user.workerid} style={styles.userItem} onPress={() => selectUser(user)}>
              <Text style={styles.encargadoText}>{user.nombre} {user.apellido_paterno} {user.apellido_materno}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowModalEncargado(false)}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Modal para seleccionar el Status */}
      <Modal visible={showModalStatus} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Seleccione un Status</Text>
          <TouchableOpacity style={styles.optionButton} onPress={() => handleStatusSelection('Activo')}>
            <Text style={styles.optionButtonText}>ACTIVO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => handleStatusSelection('Inactivo')}>
            <Text style={styles.optionButtonText}>INACTIVO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => handleStatusSelection('Terminada')}>
            <Text style={styles.optionButtonText}>TERMINADO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowModalStatus(false)}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  Text: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    paddingStart: 15,
  },
  encargadoButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  encargadoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedUserContainer: {
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    paddingStart: 15,
    justifyContent: 'center',
  },
  selectedUserText: {
    fontSize: 19,
    fontWeight: '700',
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
  },
  closeButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  encargadoText: {
    color: 'blue',
    fontWeight: '700',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AgregarObraScreen;