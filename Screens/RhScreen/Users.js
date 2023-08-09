import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from '../../components/Header';

const Users = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('https://xe3oa8v2t8.execute-api.us-east-2.amazonaws.com/desarrollo/usuarios-registrados');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      // Manejar el error al obtener los usuarios
    }
  };

  const handleEditUser = (workerid) => {
    navigation.navigate('editUser', { workerid: workerid });
  };


 // Manejar la acción de refrescar
  const handleRefresh = () => {
    setRefreshing(true);
    getUsers();
    setRefreshing(false);
    
  };
  return (
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    }>
      <Header /> 
      {users.map((user) => (
        <TouchableOpacity key={user.workerid} onPress={() => handleEditUser(user.workerid)}>
          <View style={styles.cardContent}>
            <Icon name="edit" size={20} color="black" style={styles.editIcon} />
            <Text style={styles.usuarioscardtext}>{user.nombre} {user.Apellido_paterno} {user.Apellido_materno}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


export default Users;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 60,
  },
  editIcon: {
    marginRight: 10,
  },
  usuarioscardtext: {
    fontSize: 16,
  },
});