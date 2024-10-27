import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';


import BemVindo from './src/bemVindo';
import Home from './src/home';
import Grafico from './src/grafico';
import CriarAmbiente from './src/criarAbiente';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('./assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins-Medium': require('./assets/fonts/poppins/Poppins-Medium.ttf'),
        'Poppins-Bold': require('./assets/fonts/poppins/Poppins-Bold.ttf'),
        'Inter-Bold': require('./assets/fonts/inter/Inter_18pt-Bold.ttf'),
        'Inter-Medium':  require('./assets/fonts/inter/Inter_18pt-Medium.ttf'),
        'Inter-Regular':  require('./assets/fonts/inter/Inter_18pt-Regular.ttf'),


      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []); if (!fontsLoaded) {
    return null;
  }


  return (
    <>
      <StatusBar
      style="light-content"
      />
      <NavigationContainer>

        <Stack.Navigator screenOptions={{ headerShown: false }}>

          <Stack.Screen name="BemVindo" component={BemVindo} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CriarAmbiente" component={CriarAmbiente} />
          <Stack.Screen name="Grafico" component={Grafico} />





        </Stack.Navigator>
      </NavigationContainer>
    </>


  );
}

