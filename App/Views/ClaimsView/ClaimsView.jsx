import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';

const postReclamo = async (obj) => {
  try {
      const response = await GlobalApi.postReclamo(obj);
      return response.data;
  } catch (error) {
      console.error(error);
      throw new Error('Error al crear el reclamo');
  }
};

export default function CreateReclamoScreen() {
  const navigation = useNavigation();
  const [sitioId, setSitioId] = useState('');
  const [desperfectoId, setDesperfectoId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [rubroId, setRubroId] = useState('');
  const [desperfectoDescripcion, setDesperfectoDescripcion] = useState('');
  const [isDesperfectoCustom, setIsDesperfectoCustom] = useState(false);

  const handleCreateReclamo = async () => {
      const reclamo = {
          sitioId: parseInt(sitioId),
          desperfectoId: isDesperfectoCustom ? null : parseInt(desperfectoId),
          desperfecto: isDesperfectoCustom ? { descripcion: desperfectoDescripcion, rubroId: parseInt(rubroId) } : undefined,
          descripcion: descripcion || undefined,
      };

      try {
          const data = await postReclamo(reclamo);
          console.log('Reclamo creado:', data);
          Alert.alert('Éxito', 'Reclamo creado exitosamente');
          navigation.goBack();
      } catch (error) {
          Alert.alert('Error', 'Hubo un problema al crear el reclamo');
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

          <Text style={styles.label}>ID del Desperfecto:</Text>
          <TextInput
              style={styles.input}
              value={desperfectoId}
              onChangeText={setDesperfectoId}
              keyboardType="numeric"
              editable={!isDesperfectoCustom}
          />

          <Text style={styles.label}>¿Desperfecto Personalizado?</Text>
          <Picker
              selectedValue={isDesperfectoCustom}
              onValueChange={(itemValue) => setIsDesperfectoCustom(itemValue)}
              style={styles.picker}
          >
              <Picker.Item label="No" value={false} />
              <Picker.Item label="Sí" value={true} />
          </Picker>

          {isDesperfectoCustom && (
              <>
                  <Text style={styles.label}>Descripción del Desperfecto:</Text>
                  <TextInput
                      style={styles.input}
                      value={desperfectoDescripcion}
                      onChangeText={setDesperfectoDescripcion}
                  />

                  <Text style={styles.label}>ID del Rubro:</Text>
                  <TextInput
                      style={styles.input}
                      value={rubroId}
                      onChangeText={setRubroId}
                      keyboardType="numeric"
                  />
              </>
          )}

          <Text style={styles.label}>Descripción del Reclamo (opcional):</Text>
          <TextInput
              style={styles.input}
              value={descripcion}
              onChangeText={setDescripcion}
          />

          <Text>‎ ‎ ‎ ‎ ‎ ‎  </Text>
          <Button title="Crear Reclamo" onPress={handleCreateReclamo} color={Colors.PRIMARY} />
          <Text>‎ ‎ ‎ ‎ ‎ ‎  </Text>
          <Button style={styles.buttonClaim} title="Ver todos los reclamos" onPress={()=>navigation.navigate('claims')} color={Colors.PRIMARY} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop:150,
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
  picker: {
      height: 50,
      width: '100%',
      marginBottom: 10,
  },
  buttonClaim: {
      paddingTop:150,
  }
});