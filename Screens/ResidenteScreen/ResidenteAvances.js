import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Button, Image, Modal } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../components/Header';


const diasSemana = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];

const ResidenteAvances = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const obraId = route.params?.obraId;

  const [dia, setDia] = useState('');
  const [tarea, setTarea] = useState('');
  const [material, setMaterial] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [unidad, setUnidad] = useState('');
  const [resultados, setResultados] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [horometro1, setHorometro1] = useState('');
  const [horometro2, setHorometro2] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [showModalDia, setShowModalDia] = useState(false);
  const [showModalActividad, setShowModalActividad] = useState(false);
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    // Llamar a la ruta para obtener la lista de actividades
    getActividades();
  }, []);

  const getActividades = async () => {
    try {
      const response = await axios.get(`https://xe3oa8v2t8.execute-api.us-east-2.amazonaws.com/desarrollo/actividades?id_obra=${obraId}`);
      setActividades(response.data);
    } catch (error) {
      console.error('Error al obtener las actividades:', error);
    }
  };

  const handleEnviar = async () => {
    try {
      const response = await axios.post('https://xe3oa8v2t8.execute-api.us-east-2.amazonaws.com/desarrollo/agregar-avance', {
        id_obra: obraId, // Agregar el id_obra al cuerpo de la solicitud
        dia_semana: dia,
        material,
        cantidad,
        resultados,
        observaciones,
        horometro1,
        horometro2,
        image1,
        image2,
        tarea
      });
      console.log('Avance enviado:', response.data);
      navigation.goBack();
    } catch (error) {
      console.error('Error al enviar el avance:', error);
    }
  };

  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.canceled) {
      setImage1(result.assets[0].uri); // Use the "assets" array to access the selected image
    }
  };
  
  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.canceled) {
      setImage2(result.assets[0].uri); // Use the "assets" array to access the selected image
    }
  };

  const handleSelectDia = (selectedDia) => {
    setDia(selectedDia);
    setShowModalDia(false);
  };

  const handleSelectActividad = (selectedActividad) => {
    setTarea(selectedActividad);
    setShowModalActividad(false);
  };

  return (
    
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: 'white' }]} behavior="padding" enabled>
      <Header /> 
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <Text style={styles.TextInput}>Dia: </Text>
        <TouchableOpacity onPress={() => setShowModalDia(true)}>
          <View style={styles.dia}>
            <Text style={styles.diaText}>{dia}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.TextInput}>Tarea:</Text>
        <TouchableOpacity onPress={() => setShowModalActividad(true)}>
        <View style={styles.dia}>
          <Text style={styles.diaText} value={tarea} onChangeText={setTarea}>{tarea}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.TextInput}>Material:</Text>
        <TextInput
          style={styles.input}
          placeholder="Material..."
          value={material}
          onChangeText={setMaterial}
        />
        <Text style={styles.TextInput}>Cantidad:</Text>
        <TextInput
          style={styles.input}
          placeholder="Cantidad..."
          value={cantidad}
          onChangeText={setCantidad}
        />
        <Text style={styles.TextInput}>Unidad:</Text>
        <TextInput
          style={styles.input}
          placeholder="Unidad..."
          value={unidad}
          onChangeText={setUnidad}
        />
        <Text style={styles.TextInput}>Resultados:</Text>
        <TextInput
          style={styles.input}
          placeholder="Resultados..."
          value={resultados}
          onChangeText={setResultados}
        />
        <Text style={styles.TextInput}>Bitacora:</Text>
        <TextInput
          style={styles.input}
          placeholder="Bitacora..."
          value={observaciones}
          onChangeText={setObservaciones}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Seleccionar imagen de la galería" onPress={pickImage1} value={horometro1} />
          {image1 && <Image source={{ uri: image1 }} style={{ width: 200, height: 200 }} />}
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Seleccionar imagen de la galería" onPress={pickImage2} value={horometro2} />
          {image2 && <Image source={{ uri: image2 }} style={{ width: 200, height: 200 }} />}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleEnviar}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>

        {/* Modal para seleccionar el DIA */}
        <Modal visible={showModalDia} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Seleccione un Día</Text>
            {diasSemana.map((dia) => (
              <TouchableOpacity key={dia} style={styles.optionButton} onPress={() => handleSelectDia(dia)}>
                <Text style={styles.optionButtonText}>{dia}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModalDia(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Modal para seleccionar la ACTIVIDAD */}
        <Modal visible={showModalActividad} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Seleccione una Actividad</Text>
            {actividades.map((actividad) => (
              <TouchableOpacity key={actividad.id} style={styles.optionButton} onPress={() => handleSelectActividad(actividad.actividad)}>
                <Text style={styles.optionButtonText}>{actividad.actividad}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModalActividad(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,

  },
  scrollContainer: {
    flexGrow: 1,
    padding: 0,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: '3.5%',
  },
  input: {
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 10,
    paddingStart: 10,
    paddingVertical: 10,
    borderColor: 'white',
    fontWeight: '500',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: '100%'
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  TextInput: {
    fontWeight: '700'
  },
  lastText: {
    marginBottom: 5,
  },
  lastInput: {
    marginBottom: 20,
  },
  TextInput: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 8,
    marginBottom: 8,
    width: 200,
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dia:{
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 10,
    paddingStart: 10,
    paddingVertical: 10,
    borderColor: 'white',
    fontWeight: '500',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: '100%'
  },
  diaText:{
    fontWeight: '700',
    color: 'blue'
  }
});

export default ResidenteAvances;
