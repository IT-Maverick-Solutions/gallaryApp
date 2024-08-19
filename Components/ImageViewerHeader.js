import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

export default function ImageViewerHeader({ imageName, goToHomePage }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => goToHomePage()} style={styles.backButtonContainer}>
        <Image
          source={require('../assets/left-arrow.png')} // replace with your actual image path
          style={styles.backButton}
        />
        <Text style={styles.imageName}>{imageName}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,  
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    height: 20,  
    width: 20,   
    marginRight: 8, 
  },
  imageName: {
    color: 'white', 
    fontSize: 16,   
  },
});
