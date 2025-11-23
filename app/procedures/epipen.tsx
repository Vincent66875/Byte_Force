import { useBookmarks } from '@/contexts/BookmarkContext';
import { useReactionTimer } from '@/contexts/ReactionTimerContext';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { width } = Dimensions.get('window');

// Example data with image and text per step, add/remove steps as needed
const epiSteps = [
  {
    key: '1',
    text: 'Call 911 immediately if someone is having a severe allergic reaction (anaphylaxis): difficulty breathing, swelling, hives, or rapid pulse.',
    image: require('../images/injuryPlaceholder.jpg'), // replace with your image
    audio: require('../tts/epipen/epipen1.mp3'),
  },
  {
    key: '2',
    text: 'Remove the EpiPen from its carrier tube. Hold it firmly with the orange tip pointing downward. Do NOT put your thumb on either end.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/epipen/epipen2.mp3'),
  },
  {
    key: '3',
    text: 'Remove the blue safety cap by pulling it straight off. You will hear a click - this means it\'s ready to use.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/epipen/epipen3.mp3'),
  },
  {
    key: '4',
    text: 'Place the orange tip against the outer thigh (can go through clothing). Push down hard until you hear a click and hold firmly for 3 seconds.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/epipen/epipen4.mp3'),
  },
  {
    key: '5',
    text: 'Remove the EpiPen and massage the injection area for 10 seconds. The orange tip will extend to cover the needle.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/epipen/epipen5.mp3'),
  },
  {
    key: '6',
    text: 'Have the person lie down with legs elevated (unless having trouble breathing - then sit up). Stay with them until emergency help arrives. A second dose may be needed after 5-15 minutes.',
    image: require('../images/injuryPlaceholder.jpg'),
    audio: require('../tts/epipen/epipen6.mp3'),
  },
];

export default function EpiCarouselScreen() {
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
        epiSteps[index].audio
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
      updateBookmarkProgress('epipen', newIndex);

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
        await stopTimer('EpiPen');

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
    if (currentIndex < epiSteps.length - 1) {
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
          title: 'Epi Pen Guide', 
          headerStyle: { backgroundColor: '#E53935' }, 
          headerTintColor: '#fff' 
        }} 
      />

      <FlatList
        ref={flatListRef}
        data={epiSteps}
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
        <Text style={styles.counter}>{currentIndex + 1} / {epiSteps.length}</Text>
        <TouchableOpacity onPress={goNext} disabled={currentIndex === epiSteps.length - 1} style={styles.navButton}>
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


