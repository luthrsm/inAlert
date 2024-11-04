import { StatusBar } from 'expo-status-bar';
import { PermissionsAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';
import BleManager from 'react-native-ble-manager'; // Importa o BLE Manager

import CriarAmbiente from './src/screen/criarAmbiente';
import Home from './src/screen/home';
import BemVindo from './src/screen/bemVindo';
import Grafico from './src/screen/grafico';
import Espacos from './src/screen/espaco';
import CriarEspaco from './src/screen/criarEspaco';

enableScreens();

// ID do dispositivo (UUID do ESP32)
const deviceId = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';

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
        'Inter-Medium': require('./assets/fonts/inter/Inter_18pt-Medium.ttf'),
        'Inter-Regular': require('./assets/fonts/inter/Inter_18pt-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="BemVindo" component={BemVindo} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CriarAmbiente" component={CriarAmbiente} />
          <Stack.Screen name="Espacos" component={Espacos} />
          <Stack.Screen name="CriarEspaco" component={CriarEspaco} />
          <Stack.Screen name="Grafico" component={Grafico} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
