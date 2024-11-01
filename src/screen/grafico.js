import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Menu from '../../components/menu';
import BleManager from 'react-native-ble-manager';
import { PermissionsAndroid } from 'react-native';

//const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'; //  UUID doserviço
//const VALOR_SENSOR_GAS_UUID = '731b4eda-de7a-43ed-91e2-578700a5fa5e'; //  UUID dacaracterística

const Grafico = () => {
    const scrollViewRef = useRef(null);
    //const [sensorData, setSensorData] = useState([]);
    //const [isConnected, setIsConnected] = useState(false);
    //const deviceId = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'; // UUID do ESP32

    
    // useEffect(() => {
    //     const initBLE = async () => {
    //         console.log('Iniciando BLE...');
    //         try {
    //             const result = await BleManager.start({ showAlert: false });
    //             console.log('BLE Initialized:', result);
    //             const permission = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    //             );
    //             console.log('Bluetooth permission:', permission);
    //             if (permission === PermissionsAndroid.RESULTS.GRANTED) {
    //                 console.log('Bluetooth permission granted');
    //                 connectToDevice(deviceId);
    //             } else {
    //                 console.warn('Bluetooth permission denied');
    //             }
    //         } catch (error) {
    //             console.error('BLE Initialization Error:', error);
    //         }
    //     };
    //     initBLE();
    // }, []);
    

    // const handleDiscoverPeripheral = (peripheral) => {
    //     console.log('Discovered peripheral:', peripheral);
    //     if (peripheral.id === deviceId) { // Verifica se é o dispositivo desejado
    //         console.log('Found target device, attempting to connect...');
    //         connectToDevice(deviceId);
    //     }
    // };

    // const connectToDevice = (deviceId) => {
    //     console.log('Connecting to device:', deviceId);
    //     BleManager.connect(deviceId)
    //         .then(() => {
    //             console.log('Connected to', deviceId);
    //             setIsConnected(true);
    //             readData(deviceId);
    //         })
    //         .catch((error) => {
    //             console.log('Connection error', error);
    //         });
    // };
    
    

    // const readData = (deviceId) => {
    //     BleManager.retrieveServices(deviceId).then(() => {
    //         BleManager.startNotification(deviceId, SERVICE_UUID, VALOR_SENSOR_GAS_UUID)
    //             .then(() => {
    //                 console.log('Notification started');
    //             })
    //             .catch((error) => {
    //                 console.error('Notification Error:', error);
    //             });
    //     });
    
    //     // Escute os dados recebidos
    //     BleManager.on('characteristicValueChange', (data) => {
    //         console.log('Characteristic value changed:', data);
    //         const sensorValue = parseInt(data.value, 10); // Adicione a base 10
    //         console.log('Parsed sensor value:', sensorValue);
    //         if (!isNaN(sensorValue)) {
    //             setSensorData(prevData => [...prevData, sensorValue]);
    //         } else {
    //             console.warn('Received invalid sensor value:', data.value);
    //         }
    //     });
    // };
    

    // const formatDataForChart = () => {
    //     const validData = sensorData.filter(data => typeof data === 'number' && !isNaN(data));
    //     return {
    //         labels: validData.map((_, index) => index + 1), // Labels como 1, 2, 3...
    //         datasets: [{
    //             data: validData,
    //         }]
    //     };
    // };
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.logo} source={require('../../assets/imagens/inAlert.png')} />
            </View>
            <View style={{ width: '80%', padding: 20, marginBottom: 10 }}>
                <Text style={styles.texto}>Gráfico</Text>
            </View>

            {/* Exibir o gráfico linear */}
            <LineChart
                data={formatDataForChart()}
                width={Dimensions.get("window").width}
                height={300}
                yAxisLabel='$'
                yAxisSuffix='k'
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(57, 145, 167, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(214,74,51, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#3991A7',
                    }
                }}
                bezier style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />

            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                showsVerticalScrollIndicator={true}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.botaoRedondo}>
                        <MaterialCommunityIcons name="play" size={30} color="#fff" style={styles.icons} />
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 24 }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}> Exibir arquivo txt </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}> Último registro </Text>
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
        fontSize: 25,
        fontWeight: '700',
    },
    botaoRedondo: {
        padding: 10,
        width: 90,
        height: 90,
        marginTop: 30,
        borderRadius: 50,
        backgroundColor: '#D64A33',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        padding: 10,
        width: '35%',
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: '#3991A7',
        alignSelf: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff'
    },
});

export default Grafico;
