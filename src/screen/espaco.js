import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../Services/firebaseConfig';
import AntDesign from '@expo/vector-icons/AntDesign';

import Menu from '../../components/menu';


const Espacos = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { ambienteId, ambienteNome } = route.params; // Pega o ID do ambiente
    const [espacos, setEspacos] = useState([]);

    useEffect(() => {
        const espacosRef = query(collection(db, 'espacos'), where('ambienteId', '==', ambienteId));
        
        // Listener em tempo real para atualizar a lista de espaços
        const unsubscribe = onSnapshot(espacosRef, (snapshot) => {
            const espacosList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEspacos(espacosList);
        });
    
        // Limpar o listener ao sair do componente
        return () => unsubscribe();
    }, [ambienteId]);

    
    const RenderItem = ({ item }) => (
        <View style={styles.espacoCard}>
            <ImageBackground
                source={{ uri: item.imagem }}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Grafico')}>
                    <Text style={styles.espacoTitle}>{item.nome}</Text>
                    <Text style={styles.espacoDescription}>{ambienteNome}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.logo} source={require('../../assets/imagens/inAlert.png')} />
            </View>
            <View style={styles.voltarContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <AntDesign name="arrowleft" size={34} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.texto}>Espaços</Text>
                <FlatList
                    data={espacos}
                    renderItem={RenderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.espacosList}
                />

            </View>
            <View style={styles.espacoCriar}>
                <TouchableOpacity
                    style={styles.createSpaceButton}
                    onPress={() => {
                        console.log('Navegando para CriarEspaco com:', { ambienteId, ambienteNome });
                        navigation.navigate('CriarEspaco', { ambienteId, ambienteNome });
                    }}
                >

                    <AntDesign name="plus" size={50} color="black" />
                </TouchableOpacity>
            </View>
            <Menu />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    voltarContainer: {
        marginTop: 20,
        left: 25,
    },
    headerContainer: {
        backgroundColor: '#000000',
        height: '9%',
        width: '100%',
        padding: 20,
        paddingLeft: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        width: 100,
        height: 20,
    },
    texto: {
        fontSize: 30,
        fontFamily: 'Poppins-Bold',
        paddingHorizontal: 20,
        marginTop: 30,
        marginBottom: 15
    },
    contentContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    espacosList: {
        paddingBottom: 20,
    },
    espacoCard: {
        width: '100%',
        height: 150,
        marginBottom: 10,
        borderRadius: 15, 
        overflow: 'hidden', 
    },
    
    button: {
        backgroundColor: '#3991A780',
        paddingTop: 24,
        paddingLeft: 16,
        alignItems: 'left',
        flex: 1,
        width: '100%',

    },
    espacoTitle: {
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Inter-Bold'
    },
    espacoDescription: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Inter-Medium'
    },
    imageBackground: {
        flex: 1, // Permite que o ImageBackground preencha o espaço do pai
        justifyContent: 'center', // Ajuste conforme necessário
        alignItems: 'center', // Ajuste conforme necessário
    },
    
    createSpaceButton: {
        backgroundColor: '#d64a33',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        height: 90,
        width: 90,
        justifyContent: 'center',
    },
    espacoCriar: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        zIndex: 1,
    }
});

export default Espacos;
