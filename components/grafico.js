import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
// import RNFS from 'react-native-fs'; // Importando a biblioteca para manipulação de arquivos
// import { LineChart } from 'react-native-chart-kit';

import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Menu from '../assets/menu';

const App = () => {

  // const [sensorAtivo, setSensorAtivo] = useState(false);
  // const [dadosSensor, setDadosSensor] = useState([]);

  const scrollViewRef = useRef(null);

  const navigation = useNavigation();

  // Possível código para ligar e desligar o sensor e configurar o gráfico. N sei se esta certo pq n consigo rodar
  // const toggleSensor = () => {
  //   setSensorAtivo(!sensorAtivo);
  // };

  // // Simulação de dados do sensor
  // useEffect(() => {
  //   if (sensorAtivo) {
  //     const interval = setInterval(() => {
  //       // Simule a coleta de dados do sensor
  //       const novoDado = Math.floor(Math.random() * 100);
  //       setDadosSensor(prevDados => [...prevDados, novoDado]);
  //     }, 1000); // Coleta a cada segundo

  //     return () => clearInterval(interval);
  //   }
  // }, [sensorAtivo]);


  // const dadosGrafico = {
  //   labels: dadosSensor.map((_, index) => index + 1), // Eixo X
  //   datasets: [
  //     {
  //       data: dadosSensor,
  //       color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //       strokeWidth: 2,
  //     },
  //   ],
  // };

  // const configGrafico = {
  //   backgroundColor: '#fff',
  //   decimalPlaces: 2,
  //   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //   style: {
  //     borderRadius: 16,
  //   },
  // };

  // Possível código para salvar o arquivo txt
  // const salvarArquivoTxt = async () => {
  //   const path = `${RNFS.DocumentDirectoryPath}/dados_sensor.txt`; // Caminho para salvar o arquivo
  //   const conteudo = dadosSensor.join('\n'); // Convertendo os dados para string

  //   try {
  //     await RNFS.writeFile(path, conteudo, 'utf8'); // Escrevendo o arquivo
  //     Alert.alert('Sucesso', 'Arquivo salvo com sucesso!', [{ text: 'OK' }]);
  //   } catch (error) {
  //     Alert.alert('Erro', 'Não foi possível salvar o arquivo.', [{ text: 'OK' }]);
  //     console.error(error);
  //   }
  // };

  // Função para salvar o último registro em um arquivo txt
  // const salvarUltimoRegistro = async () => {
  //   if (dadosSensor.length === 0) {
  //     Alert.alert('Erro', 'Nenhum dado disponível para salvar.', [{ text: 'OK' }]);
  //     return;
  //   }

  //   const ultimoRegistro = dadosSensor[dadosSensor.length - 1]; // Pega o último dado
  //   const path = `${RNFS.DocumentDirectoryPath}/ultimo_registro.txt`; // Caminho para salvar o arquivo
  //   const conteudo = `Último registro: ${ultimoRegistro}\n`; // Formatação do conteúdo

  //   try {
  //     await RNFS.writeFile(path, conteudo, 'utf8'); // Escrevendo o arquivo
  //     Alert.alert('Sucesso', 'Último registro salvo com sucesso!', [{ text: 'OK' }]);
  //   } catch (error) {
  //     Alert.alert('Erro', 'Não foi possível salvar o arquivo.', [{ text: 'OK' }]);
  //     console.error(error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.logo} source={require('../assets/imagens/alertBlack.png')} />
      </View>
      <View style={{width: '80%', padding: 20, marginBottom: 10,}}>
        <Text style={styles.texto}>Grafico</Text>
      </View>

      {/* Exibir o gráfico linear */}
        {/* <View style={{ alignItems: 'center', marginTop: 20 }}>
          <LineChart
            data={dadosGrafico}
            width={400}
            height={220}
            chartConfig={configGrafico}
            style={{ marginVertical: 8 }}
          />
        </View> */}

      <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
        > 
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {/* Botão de pausar ou ligar o esp32
          <TouchableOpacity style={styles.botaoRedondo} onPress={toggleSensor}>
            <MaterialCommunityIcons
              name={sensorAtivo ? "pause" : "play"}
              size={30}
              color={sensorAtivo ? "#D64A33" : "#000"}
              style={styles.icons}
            /> */}
          <TouchableOpacity style={styles.botaoRedondo} onPress={() => navigation.navigate('Home')}>
            <MaterialCommunityIcons name="play" size={30} color="#D64A33" style={styles.icons} />
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: '5%'}}>
          
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}> Exibir arquivo txt </Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}> Último registro </Text>
          </TouchableOpacity>
    
      
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
  // graph: {
  //   backgroundColor: '#000'
    
  // },
  botaoRedondo: {
    padding: 10,
    width: 80,
    height: 80,
    marginTop: 30,
    borderRadius: 80/2,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    padding: 10,
    width: '35%',
    marginTop: 30,
    borderRadius: 20,
    borderColor: '#D64A33',
    borderWidth: 2,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D64A33'
  },
});

export default App;