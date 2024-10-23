import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'
import {StyleSheet} from 'react-native';


//telas Bando de imagens sem direito autoral
import BemVindo from './components/bemVindo';
import Home from './components/home';
import Grafico from './components/grafico';
import CriarAmbiente from './components/criarAbiente';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BemVindo" component={BemVindo} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CriarAmbiente" component={CriarAmbiente} />

        
  
        <Stack.Screen name="Grafico" component={Grafico} />

            
      </Stack.Navigator>
    </NavigationContainer>


  );
}

