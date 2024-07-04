import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';

const postDenuncia = async (obj) => {
    try {
        const response = await GlobalApi.postDenuncia(obj);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear la denuncia');
    }
};

export default function ComplaintsView() {
    const navigation = useNavigation();
    const [sitioId, setSitioId] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('');
    const [aceptaResponsabilidad, setAceptaResponsabilidad] = useState(false);
    const [documento, setDocumento] = useState('');

    const handleCreateDenuncia = async () => {
        const denuncia = {
            sitioId: sitioId ? parseInt(sitioId) : undefined,
            descripcion: descripcion || undefined,
            estado: estado || undefined,
            aceptaResponsabilidad: aceptaResponsabilidad,
            documento: documento,
        };

        try {
            const data = await postDenuncia(denuncia);
            console.log('Denuncia creada:', data);
            Alert.alert('Éxito', 'Denuncia creada exitosamente');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al crear la denuncia');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>ID del Sitio:</Text>
            <TextInput
                style={styles.input}
                value={sitioId}
                onChangeText={setSitioId}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Descripción:</Text>
            <TextInput
                style={styles.input}
                value={descripcion}
                onChangeText={setDescripcion}
            />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Acepta Responsabilidad:</Text>
                <Switch
                    value={aceptaResponsabilidad}
                    onValueChange={setAceptaResponsabilidad}
                />
            </View>

            <Button
                title="Crear Denuncia"
                onPress={handleCreateDenuncia}
                color={Colors.PRIMARY}
                disabled={!aceptaResponsabilidad}
            />

            <Text>‎ ‎ ‎ ‎ ‎ ‎  </Text>
            <Button title="Ver todas tus Denuncias" onPress={()=>navigation.navigate('complaints')} color={Colors.PRIMARY} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:200,
        padding: 20,
        backgroundColor: Colors.WHITE,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: Colors.BLACK,
    },
    input: {
        height: 40,
        borderColor: Colors.LIGHT_GRAY,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.WHITE,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
});