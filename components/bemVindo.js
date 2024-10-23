import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const App = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/imagens/inAlert.png')} style={styles.logo} />
        <View style={{ flexDirection: 'row', gap:20, }}>
          <Text style={styles.title2}>Bem-vindo</Text>
          <Text style={styles.title}>ao</Text>
        </View>
        
        <View style={styles.titleCont}>
          <Text style={styles.title}>ao aplicativo do InAlert!</Text>
        </View>
        <Image
        source={require('../assets/imagens/arduino.png')} // Substitua por sua imagem do Arduino
        style={styles.arduinoImage}
      />
        <Text style={styles.description}>
          Aqui você poderá monitorar todas as detecções de gases inflamáveis pelos ambientes que você passou, tendo a possibilidade de verificar o horário e o ambiente em que um vazamento foi detectado.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Iniciar aplicativo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: '12%',
    width: '80%',
    // justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 110,
    height: 20,
    marginBottom: 50,
  },
  titleCont: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    color: '#000',
  },
  title2: {
    fontSize: 24,
    color: '#D64A33',
  },
  description: {
    fontSize: 19,
    marginBottom: 40,
    textAlign: 'justify',
    marginTop: 20,
  },
  arduinoImage: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#071E22',
    padding: 15,
    width: '80%',
    marginTop: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;