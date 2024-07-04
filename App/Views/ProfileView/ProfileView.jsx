import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import GlobalApi from '../../Utils/GlobalApi';

export default function ProfileView({ route }) {
  const token = route.params?.token;
  const data = route.params?.data;
  const navigation = useNavigation();

  const handleLogout = () => {
    GlobalApi.wipeToken();
    navigation.navigate('login');
  };

  return (
    token && data && (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://static-00.iconduck.com/assets.00/person-icon-512x483-d7q8hqj4.png' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{data.nombre} {data.apellido}</Text>
          <Text style={styles.field}>Documento: {data.documento}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Cerrar Sesión"
            onPress={handleLogout}
            color={Colors.PRIMARY_LIGHT}
          />
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    paddingTop:200,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginBottom: 10,
  },
  field: {
    fontSize: 18,
    color: Colors.WHITE,
    marginBottom: 5,
  },
  buttonContainer: {
    marginBottom: 40,
    backgroundColor: Colors.PRIMARY_LIGHT,
  },
});