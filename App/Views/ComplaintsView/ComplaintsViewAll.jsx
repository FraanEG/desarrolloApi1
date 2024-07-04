import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';

const ComplaintsViewAll = () => {
    const [denuncias, setDenuncias] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchDenuncias = async () => {
            try {
                const response = await GlobalApi.getMeVecino();
                setDenuncias(response.denuncias);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDenuncias();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('complaint-detail', { id: item.id })}>
            <Text style={styles.itemTitle}>Denuncia #{item.id}</Text>
            <Text style={styles.itemText}>Descripción: {item.descripcion || 'N/A'}</Text>
            <Text style={styles.itemText}>Estado: {item.estado || 'N/A'}</Text>
            <Text style={styles.itemText}>Sitio: {item.sitio.descripcion}</Text>
            <Text style={styles.itemText}>Documento: {item.documento}</Text>
            <Text style={styles.itemText}>Acepta Responsabilidad: {item.aceptaResponsabilidad ? 'Sí' : 'No'}</Text>
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
                data={denuncias || []}
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
        paddingTop:40,
        paddingBottom: 10,
    },
    itemContainer: {
        backgroundColor: Colors.PRIMARY_LIGHT,
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
        color: Colors.BLACK,
    },
});

export default ComplaintsViewAll;