import { MOCK_USER, UserProfile } from '@/types/user';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const [userData, setUserData] = useState<UserProfile>(MOCK_USER);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Showing a saved update
    Alert.alert('Success', 'Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setUserData(MOCK_USER);
    setIsEditing(false);
  };

  const updateField = (field: keyof UserProfile, value: any) => {
    setUserData({ ...userData, [field]: value });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Profile',
          headerStyle: { backgroundColor: '#E53935' },
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <MaterialIcons
                name={isEditing ? 'close' : 'edit'}
                size={24}
                color="#fff"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <FontAwesome5 name="user-circle" size={80} color="#E53935" />
          </View>
          <Text style={styles.username}>@{userData.username}</Text>
          <Text style={styles.subtitle}>Username cannot be changed</Text>
        </View>

        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={userData.firstName}
              onChangeText={(text) => updateField('firstName', text)}
              editable={isEditing}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={userData.lastName}
              onChangeText={(text) => updateField('lastName', text)}
              editable={isEditing}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={userData.email}
              onChangeText={(text) => updateField('email', text)}
              editable={isEditing}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={userData.phoneNumber}
              onChangeText={(text) => updateField('phoneNumber', text)}
              editable={isEditing}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={userData.dateOfBirth}
              onChangeText={(text) => updateField('dateOfBirth', text)}
              editable={isEditing}
              placeholder="YYYY-MM-DD"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={userData.password}
              onChangeText={(text) => updateField('password', text)}
              editable={isEditing}
              secureTextEntry
            />
          </View>
        </View>



        {/* Save/Cancel Buttons */}
        {isEditing && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  inputDisabled: {
    backgroundColor: '#f9f9f9',
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 15,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#E53935',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

