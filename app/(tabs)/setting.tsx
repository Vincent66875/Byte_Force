import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

type SettingOption = {
  key: string;
  title: string;
  icon: React.ReactElement;
  switch?: boolean;
};

export default function SettingsScreen() {
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const settingsOptions: SettingOption[] = [
    { key: 'language', title: 'Language Selection', icon: <Ionicons name="language" size={36} color="#E53935" /> },
    { key: 'region', title: 'Region Selection', icon: <Ionicons name="location-outline" size={36} color="#E53935" /> },
    { key: 'emergencyContact', title: 'Add Emergency Contact', icon: <FontAwesome5 name="phone" size={36} color="#E53935" /> },
    { key: 'medicalInfo', title: 'Add Personal Medical Info', icon: <MaterialCommunityIcons name="medical-bag" size={36} color="#E53935" /> },
    { key: 'voiceInstruction', title: 'Voice Instructions', icon: <Ionicons name="mic-outline" size={36} color="#E53935" />, switch: true },
  ];

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Settings', 
          headerStyle: { backgroundColor: '#E53935' },
          headerTintColor: '#fff',
        }} 
      />
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.grid}>
            {settingsOptions.map((item) => (
              <View key={item.key} style={styles.card}>
                {item.icon}
                <Text style={styles.cardTitle}>{item.title}</Text>
                {item.switch && (
                  <Switch
                    value={voiceEnabled}
                    onValueChange={setVoiceEnabled}
                    style={styles.row}
                  />
                )}
              </View>
            ))}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center', // centers icon and title
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#E53935',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginLeft: 55,
  }
});
