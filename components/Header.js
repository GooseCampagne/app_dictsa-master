import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Header = ({ route }) => {
  const { workerid } = route.params;
  const navigation = useNavigation();

   const handleCardPress = () => {
     navigation.navigate('profile',{ workerid });
   };

//QUERIA HACER UNA PARTE DONDE SE MOSTRARA UNA FOTO O ALGO ASI PERO HASTA QUE NO TERMINEMOS LO DEMAS, LO DESCARTAMOS
//por mientras solo hay que usar los headers de react
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Button
        style={styles.buttonagregar}
        title="Perfil "
        onPress={handleCardPress}
      />
        <Text style={styles.headerText}>DiCTSA</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    
   
  },
  headerContainer: {
    height: 69,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 30,
    position: 'absolute',
    bottom: 0,
    top: 29

  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
  },
  logo: {
    height: 30,
    width: 30,
    position: 'absolute',
    bottom: 0,
    top: 25
  },
  pfpContainer: {
    marginLeft: 320,
    position: 'absolute',
    bottom: 0,
    top: 31,
    
  },
  pfp: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  Text:{
    fontWeight: '700'
  }
});

export default Header;