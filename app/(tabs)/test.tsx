import { useReactionTimer } from '@/contexts/ReactionTimerContext';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function TestScreen() {
  const { isTimerActive, startTimer } = useReactionTimer();

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Reaction Time Test',
          headerStyle: { backgroundColor: '#E53935' },
          headerTintColor: '#fff',
        }} 
      />
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Icon */}
          <FontAwesome5 
            name="stopwatch" 
            size={80} 
            color={isTimerActive ? '#4CAF50' : '#E53935'} 
            style={styles.icon}
          />

          {/* Title */}
          <Text style={styles.title}>
            {isTimerActive ? 'Test Running' : 'Reaction Time Test'}
          </Text>

          {/* Instructions */}
          <Text style={styles.instructions}>
            {isTimerActive 
              ? 'Navigate to the Emergency Procedures tab and select a procedure to stop the timer.'
              : 'Tap the button below to start the test, then navigate to a procedure as quickly as possible.'}
          </Text>

          {/* Start Test Button */}
          <TouchableOpacity
            style={[
              styles.button,
              isTimerActive && styles.buttonActive
            ]}
            onPress={startTimer}
            disabled={isTimerActive}
          >
            <FontAwesome5 
              name="stopwatch" 
              size={24} 
              color="#fff" 
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              {isTimerActive ? 'Test in Progress...' : 'Start Test'}
            </Text>
          </TouchableOpacity>

          {/* Status Banner */}
          {isTimerActive && (
            <View style={styles.statusBanner}>
              <FontAwesome5 name="arrow-right" size={16} color="#fff" />
              <Text style={styles.statusText}>
                Go to Emergency Procedures tab
              </Text>
            </View>
          )}

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>How it works:</Text>
            <Text style={styles.infoText}>
              1. Tap "Start Test" button{'\n'}
              2. Navigate to Emergency Procedures tab{'\n'}
              3. Select the procedure you're looking for{'\n'}
              4. Your reaction time will be logged automatically
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#E53935',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  buttonActive: {
    backgroundColor: '#4CAF50',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusBanner: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    gap: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E53935',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});

