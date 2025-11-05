/**
 * User profile data types
 */

export interface UserProfile {
  // Immutable field - set once during registration
  username: string;
  
  // Editable personal information
  email: string;
  password: string;
  phoneNumber: string;
  
  // Additional user information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  
  // Medical information (useful for emergency app)
  bloodType?: string;
  allergies?: string[];
  medicalConditions?: string[];
  medications?: string[];
  
  // Emergency contacts
  emergencyContacts: EmergencyContact[];
  
  // App preferences
  preferredLanguage?: string;
  region?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  isPrimary?: boolean;
}

// Hardcoded user data for prototype
export const MOCK_USER: UserProfile = {
  username: 'john_doe',
  email: 'john.doe@example.com',
  password: '********', // Never show actual password
  phoneNumber: '+1 (555) 123-4567',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-05-15',
  bloodType: 'O+',
  allergies: ['Penicillin', 'Peanuts'],
  medicalConditions: ['Asthma'],
  medications: ['Albuterol Inhaler'],
  emergencyContacts: [
    {
      id: '1',
      name: 'Jane Doe',
      relationship: 'Spouse',
      phoneNumber: '+1 (555) 123-4568',
      isPrimary: true,
    },
    {
      id: '2',
      name: 'Robert Doe',
      relationship: 'Father',
      phoneNumber: '+1 (555) 987-6543',
      isPrimary: false,
    },
  ],
  preferredLanguage: 'English',
  region: 'United States',
};

