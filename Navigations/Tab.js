import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, Selectscreen, ListScreen } from '../Screen';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Image, Modal, View, TouchableOpacity, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const openCamera = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        mediaType: 'photo',
        cropping: true,
      });

      console.log(image);
      // Do something with the captured image
    } catch (error) {
      console.log(error);
      // Handle camera capture error
    }
  };

  const openSelectScreen = () => {
    if (selectedAnimal) {
      setModalVisible(false);
      navigation.navigate('Selectscreen', { animal: selectedAnimal });
    } else {
      console.log('Please select an animal');
    }
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/home.png')}
              style={{ width: 100, height: 100 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cameras"
        component={Selectscreen}
        options={{
          tabBarLabel: 'Cameras',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/camera.png')}
              style={{ width: 100, height: 100 }}
            />
          ),
          tabBarOnPress: ({ navigation }) => {
            setModalVisible(true);
          },
        }}
      />
      <Tab.Screen
        name="Album"
        component={ListScreen}
        options={{
          tabBarLabel: 'Album',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/placeholder.png')}
              style={{ width: 100, height: 100 }}
            />
          ),
          tabBarOnPress: ({ navigation }) => {
            navigation.navigate('List');
          },
        }}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setSelectedAnimal('dog')}>
            <Text>Select Dog</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedAnimal('cat')}>
            <Text>Select Cat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openSelectScreen}>
            <Text>Go to Selectscreen</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Tab.Navigator>
  );
};

export default TabNav;
