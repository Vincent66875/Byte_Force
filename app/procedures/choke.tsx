// app/procedures/choke.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function ChokePage() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Choking', 
          headerStyle: { backgroundColor: '#F57C00' }, 
          headerTintColor: '#fff' 
        }} 
      />
      <Text style={styles.text}>This is the Choking Procedure page.</Text>
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
    color: '#F57C00',
    textAlign: 'center',
  },
});
