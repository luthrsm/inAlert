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

  // Inicialização do BLE
  const connectToDevice = async (deviceId) => {
    try {
      // Conecta ao dispositivo
      const connected = await BleManager.connect(deviceId);
      console.log('Connected to', deviceId);

      // Descubra serviços e características
      const peripheralInfo = await BleManager.retrieveServices(deviceId);
      console.log('Peripheral info:', peripheralInfo);

      // Lê a característica do sensor de gás
      BleManager.read(deviceId, SERVICE_UUID, VALOR_SENSOR_GAS_UUID)
        .then((data) => {
          console.log('Sensor gas value:', data); // Aqui você terá o valor do sensor
        })
        .catch((error) => {
          console.error('Error reading characteristic:', error);
        });
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  // No useEffect que inicializa o BLE, chame connectToDevice
  useEffect(() => {
    const initBLE = async () => {
      try {
        const result = await BleManager.start();
        console.log('BLE Initialized:', result);

        // Solicita permissão para Bluetooth
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
        );

        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Bluetooth permission granted');
          connectToDevice(deviceId);
        } else {
          console.warn('Bluetooth permission denied');
        }
      } catch (error) {
        console.error('BLE Initialization Error:', error);
      }
    };

    initBLE();
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
          <Stack.Screen name="Grafico" component={Grafico} />
          <Stack.Screen name="Espacos" component={Espacos} />
          <Stack.Screen name="CriarEspaco" component={CriarEspaco} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
