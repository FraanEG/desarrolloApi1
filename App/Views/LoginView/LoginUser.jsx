import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import Colors from '../../Utils/Colors';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import GlobalApi from '../../Utils/GlobalApi';

export default function LoginUser() {
    const [document, setDocument] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await GlobalApi.postLoginVecino(document, password);
            
            if (response) {
                const user = await GlobalApi.getMeVecino();
                navigation.navigate('homeView', { token: response, data: user });
              }
          } catch (error) {
            Alert.alert('Login Failed', 'Documento o Contraseña invalido');
          }
    };

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY} />
        <Text style={styles.title}>Bienvenido Vecino!</Text>
        <TextInput
          style={styles.input}
          placeholder="Documento"
          placeholderTextColor={Colors.PRIMARY_LIGHT}
          value={document}
          onChangeText={setDocument}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={Colors.PRIMARY_LIGHT}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inspectorLink} onPress={() => navigation.navigate('loginInspector')}>
            <Text style={styles.inspectorText}>Soy inspector</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.guestLink} onPress={() => navigation.navigate('homeView', { token: null })}>
            <Text style={styles.guestText}>Ingresar como visitante</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.PRIMARY,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 32,
      color: Colors.WHITE,
      textAlign: 'center',
      marginBottom: 40,
      fontWeight: 'bold',
    },
    input: {
      backgroundColor: Colors.WHITE,
      borderRadius: 25,
      padding: 15,
      marginBottom: 20,
      fontSize: 16,
      color: Colors.PRIMARY,
    },
    button: {
      backgroundColor: Colors.PRIMARY_LIGHT,
      padding: 15,
      borderRadius: 25,
      alignItems: 'center',
    },
    buttonText: {
      color: Colors.PRIMARY,
      fontSize: 18,
      fontWeight: 'bold',
    },
    inspectorLink: {
        position: 'absolute',
        bottom: 20,
        left: 20,
      },
      inspectorText: {
        color: Colors.WHITE,
        fontSize: 16,
        textDecorationLine: 'underline',
      },
      guestLink: {
        position: 'absolute',
        bottom: 20,
        right: 20,
      },
      guestText: {
        color: Colors.WHITE,
        fontSize: 16,
        textDecorationLine: 'underline',
      },
  });