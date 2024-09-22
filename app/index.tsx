import React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import VeiculoList from './components/lista-veiculos';  

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Lista' }} />
      <VeiculoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
