import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const InfoScreen = ({ route }) => {
  const { selectedImage } = route.params;

  const buttonSize = Dimensions.get('window').width * 0.2; // 버튼 크기를 화면 너비의 20%로 설정
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.selectedImage} source={{ uri: selectedImage }} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.circleButton}>
        <Image source={require('../assets/Personality.png')} style={[styles.buttonImage, { width: buttonSize * 1, height: buttonSize * 1.2 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
        <Image source={require('../assets/HOBBY.png')} style={[styles.buttonImage, { width: buttonSize * 1, height: buttonSize * 1.2 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
        <Image source={require('../assets/Eyes.png')} style={[styles.buttonImage, { width: buttonSize * 1, height: buttonSize * 1.2 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
        <Image source={require('../assets/Mouth.png')} style={[styles.buttonImage, { width: buttonSize * 1, height: buttonSize * 1.2 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
        <Image source={require('../assets/Nose.png')} style={[styles.buttonImage, { width: buttonSize * 1, height: buttonSize * 1.2 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
        <Image source={require('../assets/Skin.png')} style={[styles.buttonImage, { width: buttonSize * 1, height: buttonSize * 1.2}]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
        <Image source={require('../assets/Eat.png')} style={[styles.buttonImage, { width: buttonSize * 1, height: buttonSize * 1.2 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
        <Image source={require('../assets/Leg.png')} style={[styles.buttonImage, { width: buttonSize * 1, height: buttonSize * 1.2 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
        <Image source={require('../assets/act.png')} style={[styles.buttonImage, { width: buttonSize * 1, height: buttonSize * 1.2 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
        <Image source={require('../assets/Ear.png')} style={[styles.buttonImage, { width: buttonSize * 1, height: buttonSize * 1.2 }]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImage: {
    width: '65%',
    height: '65%',
    resizeMode: 'contain',
    marginTop: -110,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginTop: -180, 
  },
  circleButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'transparent',
    margin: 10,
  },
});

export default InfoScreen;


