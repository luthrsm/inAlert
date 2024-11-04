import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Menu from '../../components/menu';
import supabase from '../Services/supabaseConfig';




const MyLineChart = React.memo(({ chartData }) => {
    return (
        <LineChart
            data={chartData}
            width={Dimensions.get("window").width}
            height={300}
            yAxisSuffix='ppm'
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
                },
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16,
                margin: 15
            }}
        />
    );
}, (prevProps, nextProps) => {
    // Comparar apenas os labels e datasets
    return (
        JSON.stringify(prevProps.chartData.labels) === JSON.stringify(nextProps.chartData.labels) &&
        JSON.stringify(prevProps.chartData.datasets[0].data) === JSON.stringify(nextProps.chartData.datasets[0].data)
    );
});

const Grafico = () => {
    const scrollViewRef = useRef(null);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ data: [] }]
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [monitoring, setMonitoring] = useState(false);
    const [iconName, setIconName] = useState('play');
    const [intervalId, setIntervalId] = useState(null);

    const fetchChartData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('teste')
            .select('nivelRisco, valorGas,time')
            .order('time', { ascending: true });
    
        setLoading(false);
    
        if (error) {
            console.error("Erro ao buscar dados:", error);
            setErrorMessage('Erro ao carregar dados.');
            return;
        }
    
        if (data && data.length > 0) {
            // Use 'nivelRisco' como labels no eixo X
            const newLabels = data.map(item => item.nivelRisco);
            const newValues = data.map(item => item.valorGas);
    
            setChartData({
                labels: newLabels,
                datasets: [{ data: newValues }]
            });
        } else {
            console.log("Nenhum dado encontrado.");
            setChartData({ labels: [], datasets: [{ data: [] }] });
        }
    };
    
    

    const startMonitoring = async () => {
        setMonitoring(true);
        setIconName('stop');
        
        await fetchChartData(); // Busca dados inicialmente

        const id = setInterval(fetchChartData, 30000);
        setIntervalId(id);
    };

    const stopMonitoring = async () => {
        setMonitoring(false);
        setIconName('play');
        setChartData({ labels: [], datasets: [{ data: [] }] });
    
        // Apagar todos os dados do Supabase
        try {
            const { error } = await supabase
                .from('teste')  // Substitua 'teste' pelo nome da sua tabela
                .delete()
                .neq('id', 0);  // Exclui todos os registros; ajuste conforme necessário
    
            if (error) {
                console.error("Erro ao deletar dados:", error);
                setErrorMessage('Erro ao deletar dados.');
            } else {
                console.log("Dados deletados com sucesso.");
            }
        } catch (err) {
            console.error("Erro na solicitação de exclusão:", err);
            setErrorMessage('Erro ao deletar dados.');
        }
    
        // Limpar o intervalo de atualização
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };
    

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    if (errorMessage) {
        return <Text>{errorMessage}</Text>;
    }

    const handleButtonPress = () => {
        if (monitoring) {
            stopMonitoring();
        } else {
            startMonitoring();
        }
    };
    
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.logo} source={require('../../assets/imagens/inAlert.png')} />
            </View>
            <View style={{ padding: 20, marginBottom: 10 }}>
                <Text style={styles.texto}>Monitoramento em Tempo real</Text>
            </View>

            {monitoring && chartData.labels.length > 0 ? (
                <MyLineChart chartData={chartData} /> // Usando o componente memoizado
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.text}>Clique no botão para iniciar o monitoramento do seu ambiente</Text>
                </View>
            )}

            <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={true}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.botaoRedondo} onPress={handleButtonPress}>
                        <MaterialCommunityIcons name={iconName} size={30} color="#fff" style={styles.icons} />
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        width: 100,
        height: 20,
    },
    texto: {
        fontSize: 23,
        fontFamily: 'Poppins-Bold',
        
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
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
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
    text:{
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        margin: 15,
        textAlign: 'center'
    }
});

export default Grafico;
