/**
 * Displays a list of in-progress emergency procedures that the user has started.
 * Shows progress bars, step counts, and allows users to resume procedures or remove bookmarks.
 *
 * - Only shows procedures that have been accessed at least once (lastAccessed is defined)
 * - Displays progress percentage and current step for each procedure
 * - Allows resuming procedures from the last viewed step
 * - Supports removing bookmarks with confirmation dialog
 * - Shows empty state when no procedures have been started
 * - Clicking a bookmark navigates to the procedure with a step parameter
 * - The procedure screen reads the step parameter and scrolls to that position
 */

import { useBookmarks } from '@/contexts/BookmarkContext';
import { getProgressPercentage, getTimeAgo } from '@/types/bookmark';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function BookmarksScreen() {
  // Use global bookmark context to track progress across screens
  const { bookmarks, removeBookmark } = useBookmarks();

  /**
   * Filter to only show bookmarks that have been accessed
   * Bookmarks start with lastAccessed = undefined, which means they haven't
   * been opened yet. We only want to show procedures the user has actually started.
   */
  const activeBookmarks = bookmarks.filter((b) => b.lastAccessed !== undefined);

  /**
   * Handles removing a bookmark with user confirmation
   *
   * Shows a dialog to confirm before removing the bookmark.
   *
   * @param id - The unique ID of the bookmark to remove
   */
  const handleRemoveBookmark = (id: string) => {
    Alert.alert(
      'Remove Bookmark',
      'Are you sure you want to remove this bookmark?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeBookmark(id);
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Bookmarks',
          headerStyle: { backgroundColor: '#E53935' },
          headerTintColor: '#fff',
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>In-Progress Procedures</Text>

          {activeBookmarks.length === 0 ? (
            <View style={styles.emptyState}>
              <FontAwesome5 name="bookmark" size={60} color="#ccc" />
              <Text style={styles.emptyText}>No bookmarked procedures</Text>
              <Text style={styles.emptySubtext}>
                Start a procedure to bookmark your progress
              </Text>
            </View>
          ) : (
            <View style={styles.bookmarkList}>
              {/* Render each active bookmark as a card */}
              {activeBookmarks.map((bookmark) => {
                /**
                 * Convert 0-based index to 1-based display number
                 */
                const displayStep = bookmark.currentStep + 1;

                /**
                 * Calculate completion percentage for progress bar
                 */
                const progress = getProgressPercentage(
                  displayStep,
                  bookmark.totalSteps
                );

                return (
                  <View key={bookmark.id} style={styles.bookmarkCard}>
                    <Link
                      href={{
                        pathname: `/procedures/${bookmark.procedureKey}` as any,
                        params: { step: bookmark.currentStep.toString() },
                      }}
                      asChild
                    >
                      <TouchableOpacity style={styles.bookmarkContent}>
                        <View style={styles.bookmarkHeader}>
                          <View style={styles.bookmarkTitleRow}>
                            <FontAwesome5
                              name="bookmark"
                              size={20}
                              color="#E53935"
                              solid
                            />
                            <Text style={styles.bookmarkTitle}>
                              {bookmark.procedureTitle}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => handleRemoveBookmark(bookmark.id)}
                            style={styles.removeButton}
                          >
                            <MaterialIcons name="close" size={20} color="#999" />
                          </TouchableOpacity>
                        </View>

                        <View style={styles.progressSection}>
                          <View style={styles.progressInfo}>
                            <Text style={styles.stepText}>
                              Step {displayStep} of {bookmark.totalSteps}
                            </Text>
                            <Text style={styles.percentageText}>{progress}%</Text>
                          </View>
                          <View style={styles.progressBarContainer}>
                            <View
                              style={[
                                styles.progressBarFill,
                                { width: `${progress}%` },
                              ]}
                            />
                          </View>
                        </View>

                        <View style={styles.bookmarkFooter}>
                          <Text style={styles.timeText}>
                            <MaterialIcons name="access-time" size={14} color="#999" />{' '}
                            {bookmark.lastAccessed
                              ? `Last accessed ${getTimeAgo(bookmark.lastAccessed)}`
                              : 'Not started yet'}
                          </Text>
                          <View style={styles.continueButton}>
                            <Text style={styles.continueText}>
                              {bookmark.currentStep > 0 ? 'Continue' : 'Start'}
                            </Text>
                            <FontAwesome5 name="arrow-right" size={12} color="#E53935" />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Link>
                  </View>
                );
              })}
            </View>
          )}

          {activeBookmarks.length > 0 && (
            <View style={styles.infoBox}>
              <MaterialIcons name="info-outline" size={20} color="#666" />
              <Text style={styles.infoText}>
                Tap a procedure to continue where you left off
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 8,
    textAlign: 'center',
  },
  bookmarkList: {
    gap: 15,
  },
  bookmarkCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: '#E53935',
  },
  bookmarkContent: {
    padding: 16,
  },
  bookmarkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookmarkTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  bookmarkTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  removeButton: {
    padding: 4,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  percentageText: {
    fontSize: 14,
    color: '#E53935',
    fontWeight: '700',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#E53935',
    borderRadius: 4,
  },
  bookmarkFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  continueText: {
    fontSize: 14,
    color: '#E53935',
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
  },
});

