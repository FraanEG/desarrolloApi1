import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors';

export default function ProfileView({ route }) {
  const token = route.params?.token;
  const data = route.params?.data;
  return (
    token && data &&
      (
        <>
        <View style={styles.container}>
        <Image
          source={{ uri: 'https://example.com/default-profile.png' }} // Ruta de la foto de perfil o una por defecto
          style={styles.profileImage}
        />
        <Text style={styles.name}>{data.nombre} {data.apellido}</Text>
        <Text style={styles.field}>Documento: {data.documento}</Text>
      </View>
      </>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
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
    color: Colors.PRIMARY_LIGHT,
    marginBottom: 5,
  },
});