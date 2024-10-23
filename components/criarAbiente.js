import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, FlatList, ScrollView} from 'react-native';
import Menu from '../assets/menu';
import AntDesign from '@expo/vector-icons/AntDesign';
// import { database } from '@react-native-firebase/database'; // Importar o Firebase

const images = [
{ id: 1, url: 'https://petanjo.com/blog/wp-content/uploads/2023/10/gato-sorri.png' },
{ id: 2, url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Vulpes_vulpes_ssp_fulvus.jpg' },
{ id: 3, url: 'https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/4e17ec01-850d-4fda-a446-e68ff71854ba/German+Shepherds+dans+pet+care.jpeg' },
{ id: 4, url: 'https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/4e17ec01-850d-4fda-a446-e68ff71854ba/German+Shepherds+dans+pet+care.jpeg' },
  // ...
];
 

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const scrollViewRef = useRef(null);
 
  const navigation = useNavigation();
  
  // const handleSelectImage = (image) => {
  //   setSelectedImage(image);
  // }

  const handleSelectImage = (image) => {
    setSelectedImage(image);
    setErrorImagem(''); // Limpar o erro ao selecionar uma imagem
  };

  const [ambienteNome, setAmbienteNome] = useState('');
  const [ambienteTipo, setAmbienteTipo] = useState('');
  const [errorNome, setErrorNome] = useState('');
  const [errorTipo, setErrorTipo] = useState('');
  const [errorImagem, setErrorImagem] = useState('');

  const handleConcluir = () => {
    // Reset error messages
    setErrorNome('');
    setErrorTipo('');

    // Validate inputs
    let valid = true;
    if (!ambienteNome) {
      setErrorNome('Nome do ambiente é obrigatório.');
      valid = false;
    }
    if (!ambienteTipo) {
      setErrorTipo('Classificação do ambiente é obrigatória.');
      valid = false;
    }
    if (!selectedImage) {
      setErrorImagem('Selecione uma imagem.');
      valid = false;
    }
    // If valid, save data to Firebase
    if (valid) {
      const newAmbiente = {
        nome: ambienteNome,
        tipo: ambienteTipo,
        imagem: selectedImage ? selectedImage.url : null, // Adiciona a URL da imagem selecionada
      };

      // Salvar no Firebase
      const ambientesRef = database().ref('ambientes'); // Substitua 'ambientes' pelo seu caminho desejado
      ambientesRef.push(newAmbiente)
        .then(() => {
          console.log('Dados salvos com sucesso!');
          navigation.navigate('Home');
        })
        .catch(error => {
          console.error('Erro ao salvar dados: ', error);
        });
    }
  };

  // const handleConcluir = () => {
  //   // Reset error messages
  //   setErrorNome('');
  //   setErrorTipo('');

  //   // Validate inputs
  //   let valid = true;
  //   if (!ambienteNome) {
  //     setErrorNome('Nome do ambiente é obrigatório.');
  //     valid = false;
  //   }
  //   if (!ambienteTipo) {
  //     setErrorTipo('Classificação do ambiente é obrigatória.');
  //     valid = false;
  //   }

  //   // If valid, proceed with navigation or other actions
  //   if (valid) {
  //     console.log('Concluir');
  //     navigation.navigate('Home');
  //     // You can navigate or perform other actions here
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.logo} source={require('../assets/imagens/alertBlack.png')} />
      </View>
      <View style={styles.voltarContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <AntDesign name="arrowleft" size={34} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={styles.texto}>Criar Ambientes </Text>
      </View>
      <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
        > 
      <View style={styles.contInputs}>
        <View style={styles.inputSeparado}>
          <Text style={styles.titulo}>Nome do ambiente:</Text>
          <TextInput
            style={styles.input}
            value={ambienteNome}
            onChangeText={setAmbienteNome}
            placeholder="Digite o nome do ambiente"
          />
          {errorNome ? <Text style={styles.errorText}>{errorNome}</Text> : null}
        </View>

        <View style={styles.inputSeparado}>
          <Text style={styles.titulo}>Classificação do ambiente:</Text>
          <TextInput
            style={styles.input}
            value={ambienteTipo}
            onChangeText={setAmbienteTipo}
            placeholder="Digite a classificação do ambiente"
          />
          {errorTipo ? <Text style={styles.errorText}>{errorTipo}</Text> : null}
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        > 
      <FlatList
        data={images}
        style={styles.flatList}
        numColumns={6}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectImage(item)}>
            <View style={styles.imagemViewer}>
              <Image source={{ uri: item.url }} style={{ width: 75, height: 75, borderRadius: 10 }} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
              />
              {errorImagem ? <Text style={styles.errorText}>{errorImagem}</Text> : null}
        {selectedImage && (
        <View style={styles.contViewer}>
          <Image source={{ uri: selectedImage.url }} style={{ width: 200, height: 200, borderRadius: 20 }} />
        </View>
      )}
      </ScrollView>
      </View>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={handleConcluir}>
          <Text style={styles.buttonText}> Concluir </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

      <Menu />
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
    fontSize: 30,
    fontWeight: 700,
    textAlign: 'center'
  },
  voltarContainer: {
    marginTop: 20,
    left: 25,
  },
  contInputs: {
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputSeparado: {
    marginTop: 20,
  },
  input: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#D64A33',
    padding: 10,
    paddingLeft: 15,
    fontSize: 17,
  },
  titulo: {
    marginBottom: 20,
    fontSize: 20,
  },
  button: {
    padding: 10,
    width: '45%',
    marginTop: 30,
    borderRadius: 10,
    borderColor: '#D64A33',
    borderWidth: 2,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D64A33',
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    marginTop: 5,
  },

  // Parte das imagens 
  flatList: {
    gap: 10,
    alignItems: 'center',
    marginTop: 30, 
    justifyContent: 'space-between'
  },
  imagemViewer: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'column',
    marginBottom: 10,
    gap: 10,
  },
  contViewer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;