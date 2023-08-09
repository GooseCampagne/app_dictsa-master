import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Header = ({ workerid }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('profile', { workerid });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>DiCTSA</Text>
        <TouchableOpacity style={styles.pfpContainer} onPress={handleCardPress}>
          {/* Replace the image source with your profile picture */}
          <Image source={require('../assets/icon.png')} style={styles.pfp} />
        </TouchableOpacity>
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
    flexDirection: 'row', // Align logo, text, and profile button horizontally
    alignItems: 'center', // Vertically center items
    justifyContent: 'space-between', // Distribute items evenly along the header
    paddingHorizontal: 10, // Add padding to the sides
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
  },
  logo: {
    height: 30,
    width: 30,
  },
  pfpContainer: {},
  pfp: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
});

export default Header;
