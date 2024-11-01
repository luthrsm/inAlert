import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const BemVindo = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/imagens/inAlert.png')} style={styles.logo} />
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>
                        <Text style={styles.Vermelho}> Bem Vindo</Text> ao aplicativo do <Text style={styles.Azul}>In</Text><Text style={styles.Vermelho}>Alert</Text>!
                    </Text>


                </View>

                <Image
                    source={require('../../assets/imagens/arduino.png')}
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
        marginTop: -50,
        width: '80%',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 110,
        height: 30,
        marginTop: 60
    },
    titleCont: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins-Regular',
        color: '#000',
        textAlign: 'center'

    },
    Vermelho: {
        color: '#D64A33',
        fontFamily: 'Poppins-Bold',
    },
    Azul: {
        color: '#3991A7',
        fontFamily: 'Poppins-Bold',
    },
    description: {
        fontSize: 19,
        marginBottom: 40,
        textAlign: 'justify',
        marginTop: 20,
        fontFamily: 'Inter-Regular'
    },
    arduinoImage: {
        width: 200,
        height: 150,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#071E22',
        height: 40,
        width: '80%',
        marginTop: 30,
        borderRadius: 10,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Inter-Regular',
        textAlign: 'center',
    },
});

export default BemVindo;