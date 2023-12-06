import React, { useState, useEffect } from 'react';
import { View, Button, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';


const SelectScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('앨범 권한을 허용해야 사진을 선택할 수 있습니다!');
      }
    })();
  }, []);

  const albumButton = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri } = result;
      setSelectedImage(uri);
    }
  };

  const cameraButton = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri } = result;
      setSelectedImage(uri);
    }
  };

  const handleCheckButtonPress = () => {
    navigation.navigate('Load'); 
    setTimeout(() => {
    navigation.navigate('Result', { selectedImage: selectedImage }); 
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.previewContainer}>
          {selectedImage ? (
            <Image style={styles.image} source={{ uri: selectedImage }} />
          ) : (
            <Image
              style={styles.imagePlaceholder}
              source={require('../assets/placeholder.png')}
            />
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={albumButton}>
          <Image style={styles.buttonImage} source={require('../assets/placeholder.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={cameraButton}>
          <Image style={styles.buttonImage} source={require('../assets/camera.png')} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.checkButton} onPress={handleCheckButtonPress}>
        <Text style={styles.checkButtonText}>검사하기</Text>
      </TouchableOpacity>
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
  previewContainer: {
    width: '120%',
    height: '80%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    borderRadius: 50,
  },
  imagePlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 30,
    resizeMode: 'contain',
    marginTop: -20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 10,
    width: 200,
    height: 200,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginTop: -50,
  },
  checkButton: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 100,
    marginTop: -20,
  },
  checkButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SelectScreen;
