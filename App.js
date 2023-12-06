import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, Selectscreen, LoadScreen, ResultScreen, InfoScreen, ListScreen, DetailScreen, SaveInputScreen } from './Screen';
import { Image } from 'react-native';
import { ImagePicker } from 'expo';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNav = () => (
<Stack.Navigator initialRouteName="Home">
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Picture" component={Selectscreen} />
<Stack.Screen name="Load" component={LoadScreen} />
<Stack.Screen name="Result" component={ResultScreen} />
<Stack.Screen name="Info" component={InfoScreen} />
<Stack.Screen name="SaveInput" component={SaveInputScreen} />
<Stack.Screen name="List" component={ListScreen} />
<Stack.Screen name="Detail" component={DetailScreen}/>
</Stack.Navigator>
);

const openCamera = async (navigation) => {
try {
const { cancelled, uri } = await ImagePicker.launchCameraAsync({
mediaTypes: ImagePicker.MediaTypeOptions.Images,
allowsEditing: true,
aspect: [1, 1],
quality: 1,
});
if (!cancelled) {
console.log(uri);
navigation.navigate('Picture', { selectedImage: uri });
}
} catch (error) {
console.log(error);
// Handle camera capture error
}
};

const TabNav = () => (
<Tab.Navigator>
<Tab.Screen
name="StackNav"
component={StackNav}
options={{ headerShown: false,
tabBarLabel: 'Home',
tabBarIcon: ({ color, size }) => (
<Image
source={require('./assets/home.png')}
style={{ width: 30, height: 30 }}
/>
),
}}
/>
<Tab.Screen
name="Camera"
component={Selectscreen}
options={{
tabBarLabel: 'Camera',
tabBarIcon: ({ color, size }) => (
<Image
source={require('./assets/camera.png')}
style={{ width: 50, height: 50 }}
/>
),
tabBarOnPress: ({ navigation }) => {
openCamera(navigation);
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
source={require('./assets/placeholder.png')}
style={{ width: 50, height: 50 }}
/>
),
}}
/>
</Tab.Navigator>
);

const App = () => (
<NavigationContainer>
<TabNav />
</NavigationContainer>
);

export default App;