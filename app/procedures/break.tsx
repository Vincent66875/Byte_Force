import { useBookmarks } from '@/contexts/BookmarkContext';
import { useReactionTimer } from '@/contexts/ReactionTimerContext';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { width } = Dimensions.get('window');

// Example data with image and text per step, add/remove steps as needed
const breakSteps = [
  {
    key: '1',
    text: 'Call 911 if the break is severe, involves the head/neck/back, or bone is protruding. Do not move the person unless necessary.',
    image: require('../images/injuryPlaceholder.jpg'), // replace with your image
    audio: require('../tts/break/break1.mp3'),
  },
  {
    key: '2',
    text: 'Do NOT try to realign the bone or push protruding bones back in. Keep the injured area as still as possible.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/break/break2.mp3'),
  },
  {
    key: '3',
    text: 'Immobilize the injured area using a splint or padding. You can use rolled newspapers, boards, or pillows to keep it stable.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/break/break3.mp3'),
  },
  {
    key: '4',
    text: 'Apply ice packs wrapped in cloth to reduce swelling. Do not apply ice directly to skin. Ice for 15-20 minutes at a time.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/break/break4.mp3'),
  },
  {
    key: '5',
    text: 'Treat for shock if needed - keep the person warm and lying down. Elevate legs slightly if no spinal injury is suspected.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/break/break5.mp3'),
  },
  {
    key: '6',
    text: 'Monitor circulation below the injury - check for numbness, tingling, or color changes. Seek medical attention immediately.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/break/break6.mp3'),
  },
];

export default function BreakCarouselScreen() {
  // Get the step parameter from the URL (from bookmarks)
  const params = useLocalSearchParams();
  const initialStep = params.step ? parseInt(params.step as string, 10) : 0;

  // Get bookmark context to update progress
  const { updateBookmarkProgress } = useBookmarks();
  const { stopTimer } = useReactionTimer();

  const [currentIndex, setCurrentIndex] = useState(initialStep);
  const flatListRef = useRef<FlatList>(null);
  const sound = useRef<Audio.Sound | null>(null);
  const hasScrolledToInitial = useRef(false);
  const hasPlayedInitialAudio = useRef(false);

  // Function to play audio for a specific step
  const playAudio = async (index: number) => {
    try {
      // Stop any previous sound
      if (sound.current) {
        await sound.current.stopAsync();
        await sound.current.unloadAsync();
      }

      // Load and play new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        breakSteps[index].audio
      );
      sound.current = newSound;
      await newSound.playAsync();
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  const onViewableItemsChanged = useRef(async ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);

      // Update bookmark progress
      updateBookmarkProgress('break', newIndex);

      // Only play audio if we've already played the initial audio
      // This prevents double playback on first render
      if (hasPlayedInitialAudio.current) {
        await playAudio(newIndex);
      }
    }
  }).current;

  // Set audio mode and play initial audio when component mounts
  useEffect(() => {
    const setupAudio = async () => {
      try {
        // Stop reaction timer when procedure is loaded
        await stopTimer('Broken Bone');

        // Set audio mode for playback
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });

        // Play initial audio if not already played
        if (!hasPlayedInitialAudio.current) {
          await playAudio(initialStep);
          hasPlayedInitialAudio.current = true;
        }
      } catch (error) {
        console.log('Error setting up audio:', error);
      }
    };

    setupAudio();
  }, []);

  // Scroll to the initial step when component mounts (from bookmark)
  useEffect(() => {
    if (initialStep > 0 && !hasScrolledToInitial.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialStep,
          animated: false
        });
        hasScrolledToInitial.current = true;
      }, 100);
    }
  }, [initialStep]);

  useEffect(() => {
    return sound.current
      ? () => {
          sound.current?.unloadAsync();
        }
      : undefined;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Screen is unfocused — stop and unload audio
        if (sound.current) {
          sound.current.stopAsync().catch(() => {});
          sound.current.unloadAsync().catch(() => {});
          sound.current = null;
        }
      };
    }, [])
  );

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const goNext = () => {
    if (currentIndex < breakSteps.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  return (

    <View style={{ flex: 1, backgroundColor: '#fff' }}>
    
      <Stack.Screen 
        options={{ 
          title: 'Break Guide', 
          headerStyle: { backgroundColor: '#E53935' }, 
          headerTintColor: '#fff' 
        }} 
      />

      <FlatList
        ref={flatListRef}
        data={breakSteps}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* Navigation buttons */}
      <View style={styles.navContainer}>
        <TouchableOpacity onPress={goPrev} disabled={currentIndex === 0} style={styles.navButton}>
          <Text style={styles.navText}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.counter}>{currentIndex + 1} / {breakSteps.length}</Text>
        <TouchableOpacity onPress={goNext} disabled={currentIndex === breakSteps.length - 1} style={styles.navButton}>
          <Text style={styles.navText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '80%',
    height: '50%',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navButton: {
    padding: 10,
  },
  navText: {
    fontSize: 16,
    color: '#E53935',
    fontWeight: '600',
  },
  counter: {
    fontSize: 16,
    color: '#333',
  },
});

