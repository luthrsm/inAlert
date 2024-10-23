import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//icons
import { FontAwesome6 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

const MenuDoador = () => {
  
  const navigation = useNavigation();

    return (
      <SafeAreaView style={styles.menuContainer}>
        <TouchableOpacity style={styles.divLink} onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="home" size={28} color="#D64A33" style={styles.icons} />
            <Text style={styles.txtMenu}> Home</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.divLink} onPress={() => navigation.navigate('Grafico')}>
            <MaterialCommunityIcons name="trending-up" size={30} color="#D64A33" style={styles.icons} />
            <Text style={styles.txtMenu}> Grafico </Text>
          </TouchableOpacity>
    
        </SafeAreaView>
    )
}

export default MenuDoador

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: '#000',
    height: 80,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    
    marginTop: 'auto',
  },
  txtMenu: {
    color: '#EEF0EB',
    fontSize: 13,
    textAlign: 'center',
  },
  icons: {
    textAlign: 'center'
  }
});