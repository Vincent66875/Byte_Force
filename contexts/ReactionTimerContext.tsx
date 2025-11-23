/**
 * ReactionTimerContext - Tracks user reaction time for finding procedures
 *
 * This context provides functionality to measure how quickly users can navigate
 * to a specific procedure from the home screen. Used for testing and UX research.
 */

import Constants from 'expo-constants';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ReactionTimerContextType {
  isTimerActive: boolean;
  startTimer: () => void;
  stopTimer: (procedureName: string) => Promise<void>;
}

const ReactionTimerContext = createContext<ReactionTimerContextType | undefined>(undefined);

export function ReactionTimerProvider({ children }: { children: ReactNode }) {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [testNumber, setTestNumber] = useState(1);

  const startTimer = () => {
    setStartTime(Date.now());
    setIsTimerActive(true);
  };

  const stopTimer = async (procedureName: string) => {
    if (!isTimerActive || startTime === null) {
      return;
    }

    const endTime = Date.now();
    const reactionTime = ((endTime - startTime) / 1000).toFixed(2); // Convert to seconds

    // Stop the timer
    setIsTimerActive(false);
    setStartTime(null);

    // Write to file
    await writeReactionTime(procedureName, reactionTime);
  };

  const writeReactionTime = async (procedureName: string, reactionTime: string) => {
    // Format: Test #, Procedure Name, Time (seconds), Timestamp
    const timestamp = new Date().toISOString();

    // Log to console in a format that's easy to copy/paste
    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ REACTION TIME LOGGED`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Test ${testNumber}, ${procedureName}, ${reactionTime}s, ${timestamp}`);
    console.log(`${'='.repeat(60)}\n`);

    // Send to local server to write to file
    try {
      // Get the development server URL from Expo Constants
      // This automatically uses the correct IP address for physical devices
      const debuggerHost = Constants.expoConfig?.hostUri?.split(':').shift();
      const serverUrl = debuggerHost
        ? `http://${debuggerHost}:3001/log`
        : 'http://localhost:3001/log';

      console.log(`📡 Connecting to: ${serverUrl}`);

      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testNumber,
          procedureName,
          reactionTime,
          timestamp,
        }),
      });

      if (response.ok) {
        console.log('💾 Saved to reaction_times.txt in project directory');
      } else {
        console.log('⚠️ Failed to save to file (is log-server.js running?)');
      }
    } catch (error) {
      console.log('⚠️ Could not connect to log server');
      console.log('💡 Make sure you ran: npm run dev');
      console.log(`Error: ${error}`);
    }

    // Increment test number for next test
    setTestNumber(prev => prev + 1);
  };

  return (
    <ReactionTimerContext.Provider value={{ isTimerActive, startTimer, stopTimer }}>
      {children}
    </ReactionTimerContext.Provider>
  );
}

export function useReactionTimer() {
  const context = useContext(ReactionTimerContext);
  if (context === undefined) {
    throw new Error('useReactionTimer must be used within a ReactionTimerProvider');
  }
  return context;
}

