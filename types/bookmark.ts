/**
 * Bookmark Types and Utilities
 *
 * This file defines the data structures and helper functions for the bookmark system.
 * Bookmarks track user progress through emergency procedure guides, allowing users
 * to resume where they left off during a session.
 *
 * Key Concepts:
 * - All bookmarks start at step 0 (not accessed yet)
 * - Progress is tracked using 0-based indices (matching array indices)
 * - Only procedures that have been accessed (lastAccessed is set) appear in the Bookmarks tab
 * - Progress is session-based and resets when the app restarts
 */

/**
 * ProcedureBookmark Interface
 *
 * Represents a single bookmarked procedure with progress tracking.
 * Each procedure in the app has a corresponding bookmark entry.
 */
export interface ProcedureBookmark {
  /** Unique identifier for this bookmark */
  id: string;

  /**
   * Unique key matching the procedure route
   * Examples: 'cpr', 'bleed', 'choke', 'break', 'head', 'epipen'
   * Must match the filename in app/procedures/ (without .tsx extension)
   */
  procedureKey: string;

  /** Display name shown in the UI */
  procedureTitle: string;

  /**
   * Current step/slide index (0-based)
   * - 0 means first slide
   * - Gets updated as user navigates through slides
   * - Used to resume at the correct position
   */
  currentStep: number;

  /** Total number of steps/slides in this procedure */
  totalSteps: number;

  /**
   * ISO timestamp of when the procedure was last accessed
   * - undefined = never accessed (won't show in Bookmarks tab)
   * - Set automatically when user navigates to any slide
   */
  lastAccessed?: string;

  /** ISO timestamp of when this bookmark was created */
  createdAt: string;
}

/**
 * Initial Bookmarks Data
 *
 * Hardcoded bookmark entries for the prototype. All procedures start at step 0
 * with no lastAccessed timestamp, meaning they won't appear in the Bookmarks tab
 * until the user actually opens them.
 *
 * Note: In a production app, this would be loaded from persistent storage.
 */
export const INITIAL_BOOKMARKS: ProcedureBookmark[] = [
  {
    id: '1',
    procedureKey: 'cpr', // Matches app/procedures/cpr.tsx
    procedureTitle: 'CPR',
    currentStep: 0, // Start at first slide (0-based index)
    totalSteps: 5, // CPR has 5 slides
    createdAt: new Date().toISOString(),
    // lastAccessed is undefined - won't show in Bookmarks tab until accessed
  },
  {
    id: '2',
    procedureKey: 'choke', // Matches app/procedures/choke.tsx
    procedureTitle: 'Choking',
    currentStep: 0,
    totalSteps: 5, // Choking has 5 slides (update if actual count differs)
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    procedureKey: 'bleed', // Matches app/procedures/bleed.tsx
    procedureTitle: 'Severe Bleeding',
    currentStep: 0,
    totalSteps: 4, // Severe Bleeding has 4 slides (update if actual count differs)
    createdAt: new Date().toISOString(),
  },
];

/**
 * Formats a timestamp into a human-readable "time ago" string
 *
 * Converts ISO timestamps into friendly relative time strings like:
 * - "Just now" (< 1 minute ago)
 * - "5 mins ago"
 * - "2 hours ago"
 * - "3 days ago"
 *
 * @param isoTimestamp - ISO 8601 formatted timestamp string
 * @returns Human-readable relative time string
 *
 * @example
 * getTimeAgo('2024-01-15T10:30:00Z') // "2 hours ago"
 */
export function getTimeAgo(isoTimestamp: string): string {
  const now = new Date();
  const then = new Date(isoTimestamp);
  const diffMs = now.getTime() - then.getTime();

  // Calculate time differences in various units
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Return appropriate format based on time difference
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

/**
 * Calculates the completion percentage for a procedure
 *
 * Converts current step and total steps into a percentage (0-100).
 * Used to display progress bars in the Bookmarks UI.
 *
 * @param currentStep - Current step number (1-based for display, not 0-based index)
 * @param totalSteps - Total number of steps in the procedure
 * @returns Percentage as an integer (0-100)
 *
 * @example
 * getProgressPercentage(2, 5) // Returns 40 (2/5 = 40%)
 * getProgressPercentage(5, 5) // Returns 100 (5/5 = 100%)
 */
export function getProgressPercentage(currentStep: number, totalSteps: number): number {
  return Math.round((currentStep / totalSteps) * 100);
}

