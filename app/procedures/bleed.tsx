// app/procedures/bleed.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function BleedPage() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Severe Bleeding', 
          headerStyle: { backgroundColor: '#D32F2F' }, 
          headerTintColor: '#fff' 
        }} 
      />
      <Text style={styles.text}>This is the Bleeding Procedure page.</Text>
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
    color: '#D32F2F',
    textAlign: 'center',
  },
});
