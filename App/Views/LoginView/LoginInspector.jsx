import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import GlobalApi from '../../Utils/GlobalApi';

export default function LoginInspector() {
    const [file, setFile] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await GlobalApi.postLoginPersonal(file, password);
            if (response) {
              const inspector = await GlobalApi.getMePersonal();
              navigation.navigate('homeView', { token: response, data: inspector });
            }
            
          } catch (error) {
            Alert.alert('Login Failed', 'Legajo o Contraseña incorrectos.');
          }
    };

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.WHITE} />
        <Text style={styles.title}>Bienvenido Inspector!</Text>
        <TextInput
          style={styles.input}
          placeholder="Legajo"
          placeholderTextColor={Colors.PRIMARY}
          value={file}
          onChangeText={setFile}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={Colors.PRIMARY}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userLink} onPress={() => navigation.navigate('loginUser')}>
          <Text style={styles.userText}>Soy vecino</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.WHITE,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 32,
      color: Colors.PRIMARY,
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
      borderColor:Colors.PRIMARY,
      padding: 15,
      borderRadius: 25,
      alignItems: 'center',
    },
    buttonText: {
      color: Colors.WHITE,
      fontSize: 18,
      fontWeight: 'bold',
    },
    userLink: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    userText: {
      color: Colors.PRIMARY,
      fontSize: 16,
      textDecorationLine: 'underline',
    },
  });