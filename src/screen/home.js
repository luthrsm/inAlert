import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';


//firebase
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../Services/firebaseConfig';


import Menu from '../../components/menu'

const Home = () => {
    const navigation = useNavigation();
    const [ambientes, setAmbientes] = useState([]); // Inicializa como um array vazio

    useEffect(() => {
        const ambientesRef = collection(db, 'ambientes');
        
        // Listener em tempo real para atualizar a lista de ambientes
        const unsubscribe = onSnapshot(ambientesRef, (snapshot) => {
            const ambientesList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAmbientes(ambientesList);
        });
    
        // Limpar o listener ao sair do componente
        return () => unsubscribe();
    }, []);
    

    const RenderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.ambienteCard} 
            onPress={() => navigation.navigate('Espacos', { ambienteId: item.id, ambienteNome: item.nome})} // Passa o ID do ambiente
        >
            <Image 
                source={{ uri: item.imagem }} 
                style={styles.ambienteImage} 
                onError={(e) => console.error("Erro ao carregar imagem", e.nativeEvent.error)} 
                onLoad={() => console.log('Imagem carregada:', item.imagem)} 
            />
            <View style={styles.ambienteInfo}>
                <Text style={styles.ambienteTitle}>{item.nome}</Text>
                <Text style={styles.ambienteDescription}>{item.tipo}</Text>
            </View>
        </TouchableOpacity>
    );
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.logo} source={require('../../assets/imagens/inAlert.png')} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.texto}>Ambientes</Text>

                <FlatList
                    data={[{ id: 'create', createNew: true }, ...ambientes]}
                    renderItem={({ item }) =>
                        item.createNew ? (
                            <TouchableOpacity style={styles.createNewCard} onPress={() => navigation.navigate('CriarAmbiente')}>
                                <Text style={styles.createNewTitle}>Criar novo ambiente</Text>
                                <Image source={require('../../assets/imagens/plus-button.png')} style={styles.plusButton} />
                            </TouchableOpacity>
                        ) : (
                            <RenderItem item={item} />
                        )
                    }
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.ambientesList}
                    showsVerticalScrollIndicator={false}
                />
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
        marginBottom: 20,
    },
    ambientesList: {
        gap: 20,
        marginBottom: 20

    },
    ambienteCard: {
        width: '47%',
        backgroundColor: '#3991A7',
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 7, // Espaço horizontal entre os cards
    },
    ambienteImage: {
        width: '100%',
        height: 120, // Mantenha uma altura razoável
        borderRadius: 10,
    },

    ambienteInfo: {
        marginTop: 10,
        alignItems: 'center',
    },
    ambienteTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        textAlign: 'center',
    },
    ambienteDescription: {
        fontSize: 13,
        color: '#FFF',
        textAlign: 'center',
    },
    createNewCard: {
        width: '47%',
        backgroundColor: '#3991A7',
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 7, // Espaço horizontal entre os cards

    },
    createNewTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    plusButton: {
        width: 60,
        height: 60,
        tintColor: '#FFF',
    },
});

export default Home;
