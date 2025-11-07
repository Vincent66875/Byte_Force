/**
 * Bookmark data types for tracking in-progress procedures
 */

export interface ProcedureBookmark {
  id: string;
  procedureKey: string; // e.g., 'cpr', 'bleed', 'choke'
  procedureTitle: string;
  currentStep: number; // Which step the user is on (0-based index)
  totalSteps: number;
  lastAccessed?: string; // ISO timestamp
  createdAt: string; // ISO timestamp
}

// Hardcoded bookmarks data for prototype - all start with no progress
export const INITIAL_BOOKMARKS: ProcedureBookmark[] = [
  {
    id: '1',
    procedureKey: 'cpr',
    procedureTitle: 'CPR',
    currentStep: 0, // Start at step 0
    totalSteps: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    procedureKey: 'choke',
    procedureTitle: 'Choking',
    currentStep: 0, // Start at step 0
    totalSteps: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    procedureKey: 'bleed',
    procedureTitle: 'Severe Bleeding',
    currentStep: 0, // Start at step 0
    totalSteps: 4,
    createdAt: new Date().toISOString(),
  },
];

/**
 * Helper function to format time ago
 */
export function getTimeAgo(isoTimestamp: string): string {
  const now = new Date();
  const then = new Date(isoTimestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

/**
 * Helper function to calculate progress percentage
 */
export function getProgressPercentage(currentStep: number, totalSteps: number): number {
  return Math.round((currentStep / totalSteps) * 100);
}

