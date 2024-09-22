import { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import useVeiculoStore from '../../store/veiculoStore';
import { v4 as uuidv4 } from 'uuid';

interface Veiculo {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  ano: string;
  tipo: string; 
}

export default function VeiculoForm() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { veiculos, marcas, fetchMarcas, addVeiculo, updateVeiculo } = useVeiculoStore();
  const veiculoId = Array.isArray(id) ? id[0] : id;
  const isEditing = !!veiculoId;
  const veiculo = isEditing ? veiculos.find((v: Veiculo) => v.id === veiculoId) : null;
  const [placa, setPlaca] = useState(veiculo?.placa || '');
  const [marca, setMarca] = useState(veiculo?.marca || '');
  const [modelo, setModelo] = useState(veiculo?.modelo || '');
  const [ano, setAno] = useState(veiculo?.ano || '');
  const [loading, setLoading] = useState(false);
  const [tipoVeiculo, setTipoVeiculo] = useState(veiculo?.tipo || 'carros'); // Define o valor inicial para o tipo de veículo
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    if (isEditing && !veiculo) {
      Alert.alert('Erro', 'Veículo não encontrado');
      router.back();
    }
    if (marcas.length > 0) {
      setMarca(marcas[0].valor); // Define a marca para o primeiro item
    }
  }, [veiculo]);

  useEffect(() => {
    fetchMarcas(tipoVeiculo);
  }, [tipoVeiculo]);

  const handleSave = () => {
    if (placa && marca && modelo && ano  ) {
      setLoading(true);
      setMensagem('');
      const veiculoData = { id: veiculoId || uuidv4(), placa, marca, modelo, ano, tipo: tipoVeiculo }; 
      
      if (isEditing && veiculoId) {
        updateVeiculo(veiculoId, veiculoData);
      } else {
        addVeiculo(veiculoData);
      }
      
      router.push('/');
      setLoading(false);
    } else {
      setMensagem('Por favor, preencha todos os campos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: isEditing ? 'Editar' : 'Novo' }} />
      <Text style={styles.title}>{isEditing ? 'Editar Veículo' : 'Adicionar Veículo'}</Text>

      <Text style={styles.label}>Tipo de Veículo</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoVeiculo}
          onValueChange={(itemValue) => setTipoVeiculo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Carros" value="carros" />
          <Picker.Item label="Motos" value="motos" />
          <Picker.Item label="Caminhões" value="caminhoes" />
        </Picker>
      </View>

      <Text style={styles.label}>Marca</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={marca}
          onValueChange={(itemValue) => setMarca(itemValue)}
          style={styles.picker}
        >
          {marcas.map((m) => (
            <Picker.Item key={m.valor} label={m.nome} value={m.valor} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Placa</Text>
      <TextInput style={styles.input} value={placa} onChangeText={setPlaca} />

      <Text style={styles.label}>Modelo</Text>
      <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />

      <Text style={styles.label}>Ano</Text>
      <TextInput style={styles.input} value={ano} onChangeText={setAno} keyboardType="numeric" />
      {mensagem ? <Text style={styles.errorText}>{mensagem}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
        <Text style={styles.buttonText}>{isEditing ? 'Atualizar' : 'Salvar'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    height: 45,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
