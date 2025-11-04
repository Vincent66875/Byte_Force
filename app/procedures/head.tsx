// app/procedures/head.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function HeadInjuryPage() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Head Injury Care', 
          headerStyle: { backgroundColor: '#1565C0' }, 
          headerTintColor: '#fff' 
        }} 
      />
      <Text style={styles.text}>This is the Head Injury Procedure page.</Text>
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
    color: '#1565C0',
    textAlign: 'center',
  },
});
