// app/procedures/epipen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function EpipenPage() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'EpiPen Use', 
          headerStyle: { backgroundColor: '#6A1B9A' }, 
          headerTintColor: '#fff' 
        }} 
      />
      <Text style={styles.text}>This is the EpiPen Procedure page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#6A1B9A',
    textAlign: 'center',
  },
});
