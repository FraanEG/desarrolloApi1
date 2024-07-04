import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';

const ComplaintsViewOne = () => {
    const [denuncia, setDenuncia] = useState(null);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        const fetchDenuncia = async () => {
            try {
                const response = await GlobalApi.getMeVecino();
                setDenuncia(response.denuncias.filter(x => x.id === id)[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDenuncia();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
        );
    }

    if (!denuncia) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No se encontró la denuncia</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Denuncia #{denuncia.id}</Text>
            <Text style={styles.label}>Descripción:</Text>
            <Text style={styles.value}>{denuncia.descripcion || 'N/A'}</Text>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>{denuncia.estado || 'N/A'}</Text>
            <Text style={styles.label}>Sitio:</Text>
            <Text style={styles.value}>{denuncia.sitio ? denuncia.sitio.descripcion : 'N/A'}</Text>
            <Text style={styles.value}>Encargado: {denuncia.sitio ? denuncia.sitio.aCargoDe : 'N/A'}</Text>
            <Text style={styles.value}>Dirección: {denuncia.sitio ? `${denuncia.sitio.calle} ${denuncia.sitio.numero}, entre ${denuncia.sitio.entreCalleA} y ${denuncia.sitio.entreCalleB}` : 'N/A'}</Text>
            <Text style={styles.value}>Horario: {denuncia.sitio ? `${denuncia.sitio.apertura} - ${denuncia.sitio.cierre}` : 'N/A'}</Text>
            <Text style={styles.value}>Comentarios: {denuncia.sitio ? denuncia.sitio.comentarios : 'N/A'}</Text>
            <Text style={styles.label}>Documento del Vecino:</Text>
            <Text style={styles.value}>{denuncia.documento || 'N/A'}</Text>
            <Text style={styles.label}>Acepta Responsabilidad:</Text>
            <Text style={styles.value}>{denuncia.aceptaResponsabilidad ? 'Sí' : 'No'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:150,
        padding: 20,
        backgroundColor: Colors.WHITE,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        color: Colors.GRAY,
        marginBottom: 10,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});

export default ComplaintsViewOne;