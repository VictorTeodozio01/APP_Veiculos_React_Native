import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import useVeiculoStore from '../../store/veiculoStore';


interface Veiculo {
  id: string;
  placa: string;
  marca: string; 
  modelo: string;
  ano: string;
  tipo: string;
}

export default function ViewVeiculo() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { veiculos, marcas } = useVeiculoStore(); 
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);

  useEffect(() => {
    if (id && veiculos) {
      const foundVeiculo = veiculos.find(v => v.id === id);
      
      if (foundVeiculo) {
        setVeiculo(foundVeiculo as Veiculo); 
      } else {
        setVeiculo(null);
      }
    }
  }, [id, veiculos]);

  if (!veiculo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Veículo não encontrado.</Text>
      </View>
    );
  }

  const marcaNome = marcas.find(m => m.valor === veiculo.marca)?.nome || 'Marca desconhecida';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: 'Visualizar' }} />
      <Text style={styles.title}>Detalhes do Veículo</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{veiculo.tipo}</Text> 
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Marca:</Text>
        <Text style={styles.value}>{marcaNome}</Text> 
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Placa:</Text>
        <Text style={styles.value}>{veiculo.placa}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Modelo:</Text>
        <Text style={styles.value}>{veiculo.modelo}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Ano:</Text>
        <Text style={styles.value}>{veiculo.ano}</Text>
      </View>
      <Button title="Voltar" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 18,
    color: '#333',
    marginTop: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
