import { useReactionTimer } from '@/contexts/ReactionTimerContext';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const procedures = [
  { key: 'cpr', title: 'CPR', icon: <FontAwesome5 name="hands-helping" size={36} color="#E53935" /> },
  { key: 'break', title: 'Broken Bone', icon: <MaterialCommunityIcons name="bone" size={36} color="#b380cf" /> },
  { key: 'head', title: 'Head Injury', icon: <MaterialCommunityIcons name="head" size={36} color="#f7ce14" /> },
  { key: 'bleed', title: 'Severe Bleeding', icon: <FontAwesome5 name="tint" size={36} color="#ff7919" /> },
  { key: 'epipen', title: 'EpiPen', icon: <MaterialCommunityIcons name="needle" size={36} color="#326be6" /> },
  { key: 'choke', title: 'Choking', icon: <MaterialCommunityIcons name="lungs" size={36} color="#32e64a" /> },
];
export default function ProcedureListScreen() {
  const { isTimerActive } = useReactionTimer();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Emergency Procedures',
          headerStyle: { backgroundColor: '#E53935' },
          headerTintColor: '#fff',
        }}
      />

      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <Text style={styles.title}>Select a Procedure</Text>
          {isTimerActive && (
            <View style={styles.timerBanner}>
              <FontAwesome5 name="stopwatch" size={16} color="#fff" />
              <Text style={styles.timerBannerText}>Timer Active - Select a procedure</Text>
            </View>
          )}
          <View style={styles.grid}>
            {procedures.map((item) => (
              <Link key={item.key} href={`/procedures/${item.key}` as any} asChild>
                <TouchableOpacity style={styles.card}>
                  {item.icon}
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </TouchableOpacity>
              </Link>
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
    paddingVertical: 25,
    borderRadius: 10,
    alignItems: 'center',
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
  timerBanner: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timerBannerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});
