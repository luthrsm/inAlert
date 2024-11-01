import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Menu from '../../components/menu';

// Firebase imports
import { db, storage } from '../Services/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const CriarEspaco = ({ route }) => {
    const { ambienteId, ambienteNome } = route.params; // Pega o ID do ambiente
    //console.log('Ambiente Nome:', ambienteNome);
    const [selectedImage, setSelectedImage] = useState(null);
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();

    const [espacoNome, setEspacoNome] = useState('');
    const [espacoTipo, setEspacoTipo] = useState('');
    const [errorNome, setErrorNome] = useState('');
    const [errorTipo, setErrorTipo] = useState('');
    const [errorImagem, setErrorImagem] = useState('');

    // Função para pedir permissão de acesso à galeria
    useEffect(() => {
        const requestPermission = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão necessária', 'Conceda permissão para acessar a galeria.');
            }
        };
        requestPermission();
    }, []);

    // Função para abrir a galeria e selecionar uma imagem
    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao selecionar imagem. Tente novamente.');
            console.error('Erro ao selecionar imagem:', error);
        }
    };

    const handleConcluir = async () => {
        setErrorNome('');
        setErrorTipo('');
        setErrorImagem('');

        let valid = true;
        if (!espacoNome) {
            setErrorNome('Nome do espaço é obrigatório.');
            valid = false;
        }
        if (!selectedImage) {
            setErrorImagem('Selecione uma imagem.');
            valid = false;
        }

        if (valid) {
            try {
                // Salvar a imagem no Firebase Storage
                const response = await fetch(selectedImage);
                const blob = await response.blob();
                const imageRef = ref(storage, `espacos/${Date.now()}_${espacoNome}`); // Adicionando timestamp ao nome da imagem
                await uploadBytes(imageRef, blob);

                // Obtém a URL da imagem armazenada
                const imageUrl = await getDownloadURL(imageRef);

                const newEspaco = {
                    nome: espacoNome,
                    imagem: imageUrl,
                    ambienteId: ambienteId, // Associar o espaço ao ambiente
                };

                // Salvar o espaço no Firestore
                await addDoc(collection(db, 'espacos'), newEspaco);
                navigation.navigate('Espacos', { ambienteId });
            } catch (error) {
                Alert.alert('Erro', 'Erro ao salvar o espaço. Tente novamente.');
                console.error('Erro ao salvar o espaço:', error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.logo} source={require('../../assets/imagens/inAlert.png')} />
            </View>
            <View style={styles.voltarContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Espacos', { ambienteId })}>
                    <AntDesign name="arrowleft" size={34} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 10 }}>
                <Text style={styles.texto}>Criar Espaços</Text>
            </View>
            <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={true}>
                <View style={styles.contInputs}>
                    <View style={styles.inputSeparado}>
                        <Text style={styles.titulo}>Nome do espaço:</Text>
                        <TextInput
                            style={styles.input}
                            value={espacoNome}
                            onChangeText={setEspacoNome}
                            placeholder="Digite o nome do espaço"
                        />
                        {errorNome ? <Text style={styles.errorText}>{errorNome}</Text> : null}
                    </View>

                    <View style={styles.inputSeparado}>
                        <Text style={styles.titulo}>Ambiente:</Text>
                        <TextInput
                            style={styles.input}
                            value={ambienteNome} // Usando o estado para mostrar o nome do ambiente
                            editable={false} // Não permite edição
                            placeholder="Nome do ambiente" // Placeholder que aparece se não houver valor
                        />
                    </View>

                    <View style={styles.inputSeparado}>
                        <Text style={styles.titulo}>Imagem do espaço:</Text>
                        <TouchableOpacity style={styles.selectImageButton} onPress={pickImage}>
                            {selectedImage ? (
                                <Image source={{ uri: selectedImage }} style={styles.selectedImageInButton} />
                            ) : (
                                <>
                                    <FontAwesome6 name="image" size={64} color="#000" />
                                    <Text style={styles.selectImageText}>Selecionar imagem</Text>
                                </>
                            )}
                        </TouchableOpacity>
                        {errorImagem ? <Text style={styles.errorText}>{errorImagem}</Text> : null}
                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={handleConcluir}>
                        <Text style={styles.buttonText}>Concluir</Text>
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
        padding: 20,
        paddingLeft: 30,
        marginTop: 'auto',
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
        fontFamily: 'Poppins-Bold',
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
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#D64A33',
        padding: 10,
        paddingLeft: 15,
        fontSize: 17,
        fontFamily: 'Inter-Regular'
    },
    titulo: {
        marginBottom: 10,
        fontSize: 20,
        fontFamily: 'Inter-Regular'
    },
    selectImageButton: {
        padding: 10,
        borderRadius: 10,
        paddingLeft: 15,
        backgroundColor: '#f5f5f5',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectImageText: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'Inter-Regular'
    },
    selectedImageInButton: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    button: {
        padding: 10,
        width: '45%',
        marginTop: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#D64A33',
        alignSelf: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        textAlign: 'center',
        color: '#d64a33',
    },
    errorText: {
        color: 'red',
        fontSize: 15,
        marginTop: 5,
    },
});

export default CriarEspaco;
