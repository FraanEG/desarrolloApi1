import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';

const ClaimsViewOne = () => {
    const [reclamo, setReclamo] = useState(null);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        const fetchReclamos = async () => {
            try {
                const response = await GlobalApi.getReclamos();
                setReclamo(response.filter(x => x.id === id)[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchReclamos();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
        );
    }

    if (!reclamo) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No se encontró el reclamo</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reclamo #{reclamo.id}</Text>
            <Text style={styles.label}>Descripción:</Text>
            <Text style={styles.value}>{reclamo.descripcion || 'N/A'}</Text>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>{reclamo.estado || 'N/A'}</Text>
            <Text style={styles.label}>Sitio:</Text>
            <Text style={styles.value}>{reclamo.sitio ? reclamo.sitio.descripcion : 'N/A'}</Text>
            <Text style={styles.value}>Encargado: {reclamo.sitio ? reclamo.sitio.aCargoDe : 'N/A'}</Text>
            <Text style={styles.value}>Dirección: {reclamo.sitio ? `${reclamo.sitio.calle} ${reclamo.sitio.numero}, entre ${reclamo.sitio.entreCalleA} y ${reclamo.sitio.entreCalleB}` : 'N/A'}</Text>
            <Text style={styles.value}>Horario: {reclamo.sitio ? `${reclamo.sitio.apertura} - ${reclamo.sitio.cierre}` : 'N/A'}</Text>
            <Text style={styles.value}>Comentarios: {reclamo.sitio ? reclamo.sitio.comentarios : 'N/A'}</Text>
            <Text style={styles.label}>Desperfecto:</Text>
            <Text style={styles.value}>{reclamo.desperfecto ? reclamo.desperfecto.descripcion : 'N/A'}</Text>
            <Text style={styles.value}>Descripcion rubro: {reclamo.desperfecto ? reclamo.desperfecto.rubro.descripcion : 'N/A'}</Text>
            <Text style={styles.label}>Identificacion creador</Text>
            <Text style={styles.value}>{reclamo.documento || reclamo.personalId || 'N/A'}</Text>
            <Text style={styles.label}>Reclamo Unificado ID:</Text>
            <Text style={styles.value}>{reclamo.reclamoUnificadoId || 'N/A'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display:'flex',
        justifyContent:'center',
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

export default ClaimsViewOne;