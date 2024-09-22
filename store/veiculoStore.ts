import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Definindo a interface Marca
interface Marca {
  nome: string;
  valor: string;
}
// Definição da interface para um veículo
interface Veiculo {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  ano: string;
  tipo: string;
}

// Definição da interface para o estado do veículo
interface VeiculoState {
  veiculos: Veiculo[];
  marcas: Marca[];
  fetchMarcas: (tipoVeiculo: string) => Promise<void>;
  addVeiculo: (veiculo: Veiculo) => Promise<void>;
  removeVeiculo: (id: string) => Promise<void>;
  updateVeiculo: (id: string, updatedVeiculo: Veiculo) => Promise<void>;
  loadVeiculos: () => Promise<void>;
}

// Criação da store Zustand com os tipos
const useVeiculoStore = create<VeiculoState>((set, get) => ({
  veiculos: [],
  marcas: [],
  fetchMarcas: async (tipoVeiculo: string) => {
    try {
      const response = await axios.get(`https://brasilapi.com.br/api/fipe/marcas/v1/${tipoVeiculo}`);
      set({ marcas: response.data });
    } catch (error) {
      console.error('Erro ao buscar marcas:', error);
    }
  },
  addVeiculo: async (veiculo: Veiculo) => {
    const updatedVeiculos = [...get().veiculos, veiculo];
    set({ veiculos: updatedVeiculos });
    await AsyncStorage.setItem('veiculos', JSON.stringify(updatedVeiculos));
  },
  removeVeiculo: async (id: string) => {
    // Adiciona logs para depuração
    console.log("Removendo veículo com ID:", id);
    
    const filteredVeiculos = get().veiculos.filter((v) => v.id !== id);
    set({ veiculos: filteredVeiculos });
    await AsyncStorage.setItem('veiculos', JSON.stringify(filteredVeiculos));
    
    // Verifica o estado após a remoção
    console.log("Veículos após remoção:", filteredVeiculos);
  },
  updateVeiculo: async (id: string, updatedVeiculo: Veiculo) => {
    const updatedVeiculos = get().veiculos.map((v) => (v.id === id ? updatedVeiculo : v));
    set({ veiculos: updatedVeiculos });
    await AsyncStorage.setItem('veiculos', JSON.stringify(updatedVeiculos));
  },
  loadVeiculos: async () => {
    const storedVeiculos = await AsyncStorage.getItem('veiculos');
    if (storedVeiculos) {
      set({ veiculos: JSON.parse(storedVeiculos) });
    }
  },
}));

export default useVeiculoStore;
