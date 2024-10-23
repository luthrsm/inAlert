import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
// import { database } from '@react-native-firebase/database';

import Menu from '../assets/menu';

const ambientesData = [
  {
    id: '1',
    title: 'Etec de Taboão da Serra',
    description: 'Ambiente de trabalho',
    //image: require('../assets/etec.png'), // Replace with your image
  },
  {
    id: '2',
    title: 'Universidade de São Paulo',
    description: 'Ambiente de estudo',
    //image: require('../assets/etec.png'), // Replace with your image
  },
  {
    id: '3',
    title: 'Feira do bairro',
    description: 'Ambiente externo',
    //image: require('../assets/etec.png'), // Replace with your image
  },
  // ... add more ambientes
];

const App = () => {
  const [ambientes, setAmbientes] = useState(ambientesData);

  const scrollViewRef = useRef(null);

  const navigation = useNavigation();
  
  // Estruturação do código com banco de dados
  // const [ambientes, setAmbientes] = useState([]);

  // useEffect(() => {
  //   const dadosRef = database().ref('seu_caminho_aqui'); // Substitua 'seu_caminho_aqui' pelo caminho real no seu banco de dados
  //   dadosRef.on('value', snapshot => {
  //     const dadosList = [];
  //     snapshot.forEach(child => {
  //       dadosList.push({
  //         key: child.key,
  //         ...child.val(),
  //       });
  //     });
  //     setAmbientes(dadosList);
  //   });
  // }, []);

  // You can add logic here to fetch data from an API if needed

  const renderItem = ({ item }) => (
      <View style={styles.ambienteCard}>
      <Image source={require('../assets/imagens/etec.png')} style={styles.ambienteImage} />
      <View style={styles.ambienteInfo}>
        <Text style={styles.ambienteTitle}>{item.title}</Text>
        <Text style={styles.ambienteDescription}>{item.description}</Text>
      </View>
    </View>
    
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.logo} source={require('../assets/imagens/alertBlack.png')} />
      </View>
      <View style={{width: '80%', padding: 20, marginBottom: 10,}}>
        <Text style={styles.texto}>Ambientes</Text>
      </View>
      <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
        > 
        <View style={{alignItems: 'center'}}>
          <View style={styles.cards}>
            <FlatList
            data={ambientes}
            renderItem={renderItem}
            style={styles.cards3}
            keyExtractor={(item) => item.id}
            numColumns={2} // Display in two columns
            contentContainerStyle={styles.ambientesList} // Add space between columns
            showsHorizontalScrollIndicator={true}
            />


          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CriarAmbiente')}>
            <Text style={styles.buttonText}> Criar novo ambiente </Text>
          </TouchableOpacity>
        
          </View>
      
        </View>
      </ScrollView>
      
      <Menu/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#000000',
    height: '9%',
    width: '100%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 20,
    paddingLeft: 30,
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
  },
  logo: {
    width: 100,
    height: 20,
  },
  texto: {
    fontSize: 25,
    fontWeight: 700,
  },
  ambienteCard: {
    width: '47%',
    height: 290,
    backgroundColor: '#3991A7',
    marginBottom: 20,
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
    marginRight: 20,
    borderRadius: 20,
  },
  ambienteImage: {
    width: '100%',
    height: 110,
    borderRadius: 20,
  },
  cards: {
    padding: 0,
    width: '90%',
  },
  ambienteInfo: {
    alignSelf: 'center',
    gap: 10,
    marginTop: 15,
  },
  ambienteTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 600,
    color: "#FFF"
  },
  ambienteDescription: {
    fontSize: 13,
    color: "#FFF",
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    width: '75%',
    marginTop: 30,
    borderRadius: 20,
    borderColor: '#D64A33',
    borderWidth: 2,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D64A33'
  },
});

export default App;