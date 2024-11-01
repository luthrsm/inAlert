import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';

//icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';

//navigation
import { useNavigation } from '@react-navigation/native';


const MenuDoador = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.menuContainer}>
            <TouchableOpacity style={styles.divLink} onPress={() => navigation.navigate('Home')}>
                <Image source={require('../assets/imagens/home.png')} style={styles.icons} />

            </TouchableOpacity>
            <TouchableOpacity style={styles.divLink} onPress={() => navigation.navigate('Grafico')}>
                <Image source={require('../assets/imagens/gráfico.png')} style={styles.icons} />

            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default MenuDoador

const styles = StyleSheet.create({
    menuContainer: {
        backgroundColor: '#000',
        height: 60,
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: 24,
        marginTop: 'auto',
        marginLeft: 32,
        marginRight: 32,
        width: '90%',
        alignSelf: 'center'
    },
    txtMenu: {
        color: '#EEF0EB',
        fontSize: 13,
        textAlign: 'center',
    },
    icons: {
        textAlign: 'center',
        height: 28,
        width: 28,
        alignSelf: 'center'
    }
});