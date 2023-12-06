import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();

  const Selectscreen = () => {
    navigation.navigate('Picture');
  };

  return (
    <View style={styles.container}>
      <View style={styles.halfContainer}>
        <Image
          style={styles.image}
          source={require('../assets/dog.jpg')}
        />
        <CustomButton title="검사하기" onPress={Selectscreen} />
      </View>
      <View style={styles.halfContainer}>
        <Image
          style={styles.image}
          source={require('../assets/cat.jpg')}
        />
        <CustomButton title="검사하기" onPress={Selectscreen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  halfContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: 'skyblue',
    width: 200,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  image: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    margin: 15,
    borderRadius: 30,
  },
});

export default HomeScreen;