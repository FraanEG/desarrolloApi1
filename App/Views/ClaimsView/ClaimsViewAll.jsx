import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalApi from '../../Utils/GlobalApi';
import Colors from '../../Utils/Colors';

const ReclamoListScreen = () => {
    const [reclamos, setReclamos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchReclamos = async () => {
            try {
                const response = await GlobalApi.getReclamos();
                setReclamos(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchReclamos();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('claim-detail', { id: item.id })}>
            <Text style={styles.itemTitle}>Reclamo #{item.id}</Text>
            <Text style={styles.itemText}>Descripción: {item.descripcion || 'N/A'}</Text>
            <Text style={styles.itemText}>Estado: {item.estado || 'N/A'}</Text>
            <Text style={styles.itemText}>Sitio ID: {item.sitioId}</Text>
            <Text style={styles.itemText}>Desperfecto ID: {item.desperfectoId}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={reclamos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingBottom: 20,
        paddingTop: 20,
    },
    itemContainer: {
        backgroundColor: Colors.LIGHT_GRAY,
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        marginBottom: 5,
    },
    itemText: {
        fontSize: 14,
        color: Colors.GRAY,
    },
});

export default ReclamoListScreen;