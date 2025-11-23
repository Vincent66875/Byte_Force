import { useBookmarks } from '@/contexts/BookmarkContext';
import { useReactionTimer } from '@/contexts/ReactionTimerContext';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { width } = Dimensions.get('window');

// Example data with image and text per step, add/remove steps as needed
const bleedSteps = [
  {
    key: '1',
    text: 'Call 911 immediately for severe bleeding. Ensure your safety first - wear gloves if available to avoid contact with blood.',
    image: require('../images/injuryPlaceholder.jpg'), // replace with your image
    audio: require('../tts/bleed/bleed1.mp3'),
  },
  {
    key: '2',
    text: 'Have the person lie down and elevate the injured area above the heart if possible. This helps reduce blood flow to the wound.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/bleed/bleed2.mp3'),
  },
  {
    key: '3',
    text: 'Apply direct pressure to the wound using a clean cloth, gauze, or your hand. Press firmly and continuously.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/bleed/bleed3.mp3'),
  },
  {
    key: '4',
    text: 'If blood soaks through, add more cloth on top - do NOT remove the original cloth. Continue applying firm pressure.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/bleed/bleed4.mp3'),
  },
  {
    key: '5',
    text: 'Once bleeding slows, secure the cloth with a bandage or tape. Keep the wound elevated and the person still.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/bleed/bleed5.mp3'),
  },
  {
    key: '6',
    text: 'Monitor for shock (pale skin, rapid breathing, weakness). Keep the person warm and calm until help arrives.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/bleed/bleed6.mp3'),
  },
];

export default function BleedCarouselScreen() {
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
        bleedSteps[index].audio
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
      updateBookmarkProgress('bleed', newIndex);

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
        await stopTimer('Severe Bleeding');

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
    if (currentIndex < bleedSteps.length - 1) {
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
          title: 'Bleed Guide', 
          headerStyle: { backgroundColor: '#E53935' }, 
          headerTintColor: '#fff' 
        }} 
      />

      <FlatList
        ref={flatListRef}
        data={bleedSteps}
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
        <Text style={styles.counter}>{currentIndex + 1} / {bleedSteps.length}</Text>
        <TouchableOpacity onPress={goNext} disabled={currentIndex === bleedSteps.length - 1} style={styles.navButton}>
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

