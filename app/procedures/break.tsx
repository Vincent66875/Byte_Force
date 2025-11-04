// app/procedures/break.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function BreakPage() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Broken Bones', 
          headerStyle: { backgroundColor: '#D32F2F' }, 
          headerTintColor: '#fff' 
        }} 
      />
      <Text style={styles.text}>This is the Broken Bone Procedure page.</Text>
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
