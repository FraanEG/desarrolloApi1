import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Switch, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';

const postComercio = async (obj) => {
    try {
        const response = await GlobalApi.postComercio(obj);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear el comercio');
    }
};

export default function BusinessView() {
    const navigation = useNavigation();
    const [comercio, setComercio] = useState({
        nombre: '',
        telefono: '',
        imagenes:[],
        fechaIngreso: '',
        rubroId: '',
    });

    const [sitio, setSitio] = useState({
        latitud: '',
        longitud: '',
        calle: '',
        entreCalleA: '',
        entreCalleB: '',
        descripcion: '',
        aCargoDe: '',
        apertura: '',
        cierre: '',
        comentarios: '',
    });

    const [crearNuevoSitio, setCrearNuevoSitio] = useState(false);

    const pickImage = async () => {
        if (comercio.imagenes.length >= 5) {
            Alert.alert('Límite alcanzado', 'Puedes subir un máximo de 5 imágenes.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setComercio({ ...comercio, imagenes: [...comercio.imagenes, result.uri] });
        }
    };

    const handleCreateComercio = async () => {
        const comercioData = {
            ...comercio,
            rubroId: parseInt(comercio.rubroId),
            fechaIngreso: comercio.fechaIngreso ? new Date(comercio.fechaIngreso) : undefined,
            sitio: crearNuevoSitio ? { ...sitio, latitud:parseInt(sitio.latitud), longitud:parseInt(sitio.longitud)} : undefined,
            sitioId: !crearNuevoSitio && comercio.sitioId ? parseInt(comercio.sitioId) : undefined,
        };

        try {
            const data = await postComercio(comercioData);
            console.log('Comercio creado:', data);
            Alert.alert('Éxito', 'Comercio creado exitosamente');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al crear el comercio');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Crear Comercio</Text>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    value={comercio.nombre}
                    onChangeText={(text) => setComercio({ ...comercio, nombre: text })}
                />
                <Text style={styles.label}>Teléfono (opcional):</Text>
                <TextInput
                    style={styles.input}
                    value={comercio.telefono}
                    onChangeText={(text) => setComercio({ ...comercio, telefono: text })}
                />
                <Text style={styles.label}>Imágenes (máximo 5):</Text>
                <View style={styles.imageContainer}>
                    {comercio.imagenes?.map((uri, index) => (
                        <Image key={index} source={{ uri }} style={styles.image} />
                    ))}
                    {comercio.imagenes?.length < 5 && (
                        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                            <Text style={styles.imagePickerText}>Añadir Imagen</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={styles.label}>Fecha de Ingreso (opcional):</Text>
                <TextInput
                    style={styles.input}
                    value={comercio.fechaIngreso}
                    onChangeText={(text) => setComercio({ ...comercio, fechaIngreso: text })}
                    placeholder="YYYY-MM-DD"
                />
                <Text style={styles.label}>Rubro ID:</Text>
                <TextInput
                    style={styles.input}
                    value={comercio.rubroId}
                    onChangeText={(text) => setComercio({ ...comercio, rubroId: text })}
                    keyboardType="numeric"
                />
                <View style={styles.switchContainer}>
                    <Text style={styles.label}>¿Crear nuevo sitio?</Text>
                    <Switch
                        value={crearNuevoSitio}
                        onValueChange={setCrearNuevoSitio}
                    />
                </View>

                {crearNuevoSitio && (
                    <>
                        <Text style={styles.label}>Latitud:</Text>
                        <TextInput
                            style={styles.input}
                            value={sitio.latitud}
                            onChangeText={(text) => setSitio({ ...sitio, latitud: text })}
                            keyboardType="numeric"
                        />
                        <Text style={styles.label}>Longitud:</Text>
                        <TextInput
                            style={styles.input}
                            value={sitio.longitud}
                            onChangeText={(text) => setSitio({ ...sitio, longitud: text })}
                            keyboardType="numeric"
                        />
                        <Text style={styles.label}>Calle (opcional):</Text>
                        <TextInput
                            style={styles.input}
                            value={sitio.calle}
                            onChangeText={(text) => setSitio({ ...sitio, calle: text })}
                        />
                        <Text style={styles.label}>Entre Calle A (opcional):</Text>
                        <TextInput
                            style={styles.input}
                            value={sitio.entreCalleA}
                            onChangeText={(text) => setSitio({ ...sitio, entreCalleA: text })}
                        />
                        <Text style={styles.label}>Entre Calle B (opcional):</Text>
                        <TextInput
                            style={styles.input}
                            value={sitio.entreCalleB}
                            onChangeText={(text) => setSitio({ ...sitio, entreCalleB: text })}
                        />
                        <Text style={styles.label}>Descripción:</Text>
                        <TextInput
                            style={styles.input}
                            value={sitio.descripcion}
                            onChangeText={(text) => setSitio({ ...sitio, descripcion: text })}
                        />
                        <Text style={styles.label}>A cargo de:</Text>
                        <TextInput
                            style={styles.input}
                            value={sitio.aCargoDe}
                            onChangeText={(text) => setSitio({ ...sitio, aCargoDe: text })}
                        />
                        <Text style={styles.label}>Apertura:</Text>
                        <TextInput
                            style={styles.input}
                            value={sitio.apertura}
                            onChangeText={(text) => setSitio({ ...sitio, apertura: text })}
                        />
                        <Text style={styles.label}>Cierre:</Text>
                        <TextInput
                            style={styles.input}
                            value={sitio.cierre}
                            onChangeText={(text) => setSitio({ ...sitio, cierre: text })}
                        />
                        <Text style={styles.label}>Comentarios (opcional):</Text>
                        <TextInput
                            style={styles.input}
                            value={sitio.comentarios}
                            onChangeText={(text) => setSitio({ ...sitio, comentarios: text })}
                        />
                    </>
                )}

                <Button
                    title="Crear Comercio"
                    onPress={handleCreateComercio}
                    color={Colors.PRIMARY}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 20,
        paddingTop:40
    },
    content: {
        padding: 20,
        paddingBottom: 100, // Añade espacio extra al final
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        marginBottom: 20,
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
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
        marginBottom: 10,
    },
    imagePicker: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        backgroundColor: Colors.LIGHT_GRAY,
        marginRight: 10,
        marginBottom: 10,
    },
    imagePickerText: {
        color: Colors.GRAY,
        textAlign: 'center',
    },
});