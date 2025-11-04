import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ProcedureInfoModal() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'About Emergency Procedures',
          headerStyle: { backgroundColor: '#E53935' },
          headerTintColor: '#fff',
          presentation: 'modal', // ensures this screen appears as a modal
        }}
      />

      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <Text style={styles.title}>Emergency Procedures Info</Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              This page provides quick access to essential emergency procedures.
              Tap on a card to view step-by-step instructions for CPR, handling
              broken bones, head injuries, severe bleeding, using an EpiPen,
              and choking emergencies.
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Each procedure card is color-coded for easy recognition. Follow
              the instructions carefully, and always call emergency services if
              the situation is severe.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#ffe5e5', // light red similar to CPR card
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#E53935',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
});
