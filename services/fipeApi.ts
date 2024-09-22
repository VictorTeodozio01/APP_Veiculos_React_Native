import axios from 'axios';

const api = axios.create({
  baseURL: 'https://brasilapi.com.br/api/fipe',
});

export const getFipeBrands = async (veiculoType: 'carros' | 'motos' | 'caminhoes') => {
  const { data } = await api.get(`/marcas/v1/${veiculoType}`);
  return data;
};
