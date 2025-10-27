import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// Mock data store for procedures. In a real app, this would be fetched from an API.
const procedureData: Record<string, { title: string; content: string[] }> = {
  cpr: {
    title: 'Cardiopulmonary Resuscitation (CPR)',
    content: [
      "Check the scene for safety and ensure the person is on a firm, flat surface.",
      "Check for breathing. If unresponsive and not breathing, call emergency services immediately.",
      "Start chest compressions: Place the heel of one hand in the center of the chest, and the heel of the other hand on top. Push hard and fast (100–120 compressions per minute).",
      "If trained, perform 30 compressions followed by 2 rescue breaths.",
      "Continue until professional help arrives or the person shows signs of life."
    ],
  },
  break: {
    title: 'Suspected Fracture (Broken Bone)',
    content: [
      "Keep the person still and calm. Do not move the person unless they are in immediate danger.",
      "Immobilize the injured area using splints (if trained and materials are available) to prevent movement.",
      "Apply ice packs wrapped in cloth to reduce swelling.",
      "Treat for shock: Lie the person down, cover them with a blanket to maintain body temperature.",
      "Seek medical attention immediately."
    ],
  },
  // Add content for head, bleed, epipen, choke here...
  head: {
    title: 'Serious Head Injury',
    content: [
      "Call emergency services immediately.",
      "Keep the person's head and neck still and in line with the rest of the body.",
      "Check for bleeding. Apply gentle pressure to any bleeding wounds with a clean cloth, but do not press directly on the injury if the skull is fractured.",
      "Monitor breathing and consciousness. If unconscious, only move if absolutely necessary to maintain airway.",
    ],
  },
  bleed: {
    title: 'Severe Bleeding',
    content: [
      "Protect yourself: Wear gloves if available.",
      "Apply direct pressure to the wound using a sterile dressing or clean cloth.",
      "Elevate the injured limb above the heart, if possible (and if it doesn't cause more pain).",
      "Maintain pressure until help arrives. If blood soaks through the dressing, add another one on top—do not remove the original.",
      "If bleeding is on an arm or leg and pressure does not stop it, consider a tourniquet if trained."
    ],
  },
  epipen: {
    title: 'EpiPen Administration (Anaphylaxis)',
    content: [
      "Call emergency services immediately.",
      "Confirm anaphylaxis (difficulty breathing, swelling, hives, vomiting).",
      "Remove the EpiPen from its container.",
      "Grasp the pen in a fist, safety cap pointing up.",
      "JAB the orange tip firmly into the middle of the outer thigh (through clothes is okay) at a right angle.",
      "Hold in place for 3 seconds.",
      "Remove the EpiPen. Massage the injection site for 10 seconds.",
      "Note the time and monitor the person until help arrives."
    ],
  },
  choke: {
    title: 'Adult Choking (Conscious)',
    content: [
      "Ask: 'Are you choking?' Encourage them to cough.",
      "If they can't cough, speak, or breathe, deliver 5 back blows between the shoulder blades with the heel of your hand.",
      "If back blows fail, perform 5 abdominal thrusts (Heimlich maneuver): Stand behind the person, wrap your arms around their waist. Place a fist above their navel. Grasp your fist with your other hand. Pull sharply inward and upward.",
      "Alternate 5 back blows and 5 abdominal thrusts until the obstruction is cleared or professional help arrives.",
    ],
  },
};

export default function ProcedureScreen() {
  const { route } = useLocalSearchParams();
  const pathKey = Array.isArray(route) ? route[0] : route;
  const procedure = useMemo(() => procedureData[pathKey] || null, [pathKey]);

  if (!procedure) {
    // If the route key doesn't match the data, display a 404 message
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.errorText}>Procedure "{pathKey}" not found.</Text>
      </View>
    );
  }

  // Set the screen title dynamically
  const headerTitle = procedure.title.split('(')[0].trim();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Set the header title using Stack.Screen */}
      <Stack.Screen 
        options={{ 
          title: headerTitle, 
          headerStyle: { backgroundColor: '#E53935' }, // Use a consistent emergency color
          headerTintColor: '#fff',
        }} 
      />
      <View style={styles.container}>
        <Text style={styles.title}>{procedure.title}</Text>
        <View style={styles.stepList}>
          {procedure.content.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
  stepList: {
    paddingHorizontal: 5,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#E53935',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E53935',
    marginRight: 10,
    alignSelf: 'flex-start',
    minWidth: 25,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  errorText: {
    fontSize: 18,
    color: '#E53935',
    textAlign: 'center',
  }
});
