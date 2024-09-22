import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import useVeiculoStore from '../../store/veiculoStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Veiculo {
  id: string;
  placa: string;
  marca: string; 
  modelo: string;
  ano: string;
  tipo: string;
}

export default function VeiculoList() {
  const router = useRouter();
  const { veiculos, marcas, loadVeiculos } = useVeiculoStore(); 

  useEffect(() => {
    loadVeiculos();
  }, []);

  type RoutePath = "/components/form-veiculo"; 
  const handleNavigation = (path: RoutePath, id?: string) => {
    const basePath = '/components/form-veiculo';

    if (id) {
      const fullPath: RoutePath = `${basePath}?id=${id}` as RoutePath; 
      router.push(fullPath);
    } else {
      router.push(basePath as RoutePath);
    }
  };

  const deleteveiculo = async (id: string) => {
    const veiculos = await AsyncStorage.getItem('veiculos');
    const veiculosArray = veiculos ? JSON.parse(veiculos) : [];
    const updatedVeiculos = veiculosArray.filter((veiculo: Veiculo) => veiculo.id !== id);
    await AsyncStorage.setItem('veiculos', JSON.stringify(updatedVeiculos));
    router.push('/');
  };

  const renderItem = ({ item }: { item: Veiculo }) => {
  const marcaNome = marcas.find(m => m.valor === item.marca)?.nome || 'Marca desconhecida';

  return (
<View style={styles.itemContainer}>
  <View style={styles.rowContainer}>
    <Text style={styles.titleText}>Tipo de Veiculo: </Text>
    <Text style={styles.itemText}>{item.tipo}</Text>
  </View>
  
  <View style={styles.rowContainer}>
    <Text style={styles.titleText}>Marca: </Text>
    <Text style={styles.itemText}>{marcaNome}</Text> {/* Exibindo o nome da marca correspondente */}
  </View>
  
  <View style={styles.rowContainer}>
    <Text style={styles.titleText}>Placa: </Text>
    <Text style={styles.itemText}>{item.placa}</Text>
  </View>
  
  <View style={styles.rowContainer}>
    <Text style={styles.titleText}>Modelo: </Text>
    <Text style={styles.itemText}>{item.modelo}</Text>
  </View>
  
  <View style={styles.rowContainer}>
    <Text style={styles.titleText}>Ano: </Text>
    <Text style={styles.itemText}>{item.ano}</Text>
  </View>

  <View style={styles.buttonContainer}>
    <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => handleNavigation('/components/form-veiculo', item.id)}>
      <Text style={styles.buttonText}>Editar</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, styles.removeButton]}
      onPress={() => deleteveiculo(item.id)} // Chama a função para remover o veículo
    >
      <Text style={styles.buttonText}>Remover</Text>
    </TouchableOpacity>
    <TouchableOpacity 
      style={[styles.button, styles.viewButton]} 
      onPress={() => router.push(`/components/view-veiculo?id=${item.id}`)}
    >
      <Text style={styles.buttonText}>Visualizar</Text>
    </TouchableOpacity>
  </View>
</View>


    );
  };

  return (
    <View style={styles.container}>
      <Button title="Adicionar Veículo" color="#28a745" onPress={() => handleNavigation('/components/form-veiculo')} />
      <FlatList 
        data={veiculos} 
        keyExtractor={(item) => item.id} 
        renderItem={renderItem} 
        contentContainerStyle={{ paddingBottom: 20 }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    elevation: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 1, // Adiciona espaço entre as linhas
  },
  itemText: {
    fontSize: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold', // Colocando o texto em negrito
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '30%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#ffc107',
  },
  removeButton: {
    backgroundColor: '#dc3545',
  },
  viewButton: {
    backgroundColor: '#007bff',
  },
});
