import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import PaymentScreen from './screens/PaymentScreen';
import DetailScreen from './screens/DetailScreen';
import BookingScreen from './screens/BookingScreen';
 // Make sure this path is correct

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Detail" component={DetailScreen}/>
        <Stack.Screen name="Booking" component={BookingScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
