/**
 * Bookmark data types for tracking in-progress procedures
 */

export interface ProcedureBookmark {
  id: string;
  procedureKey: string; // e.g., 'cpr', 'bleed', 'choke'
  procedureTitle: string;
  currentStep: number; // Which step the user is on
  totalSteps: number;
  lastAccessed: string; // ISO timestamp
  startedAt: string; // ISO timestamp
}

// Hardcoded bookmarks data for prototype
export const MOCK_BOOKMARKS: ProcedureBookmark[] = [
  {
    id: '1',
    procedureKey: 'cpr',
    procedureTitle: 'CPR',
    currentStep: 3,
    totalSteps: 6,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    startedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
  },
  {
    id: '2',
    procedureKey: 'choke',
    procedureTitle: 'Choking',
    currentStep: 2,
    totalSteps: 5,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    startedAt: new Date(Date.now() - 1000 * 60 * 65).toISOString(), // 1 hour 5 min ago
  },
  {
    id: '3',
    procedureKey: 'bleed',
    procedureTitle: 'Severe Bleeding',
    currentStep: 1,
    totalSteps: 4,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
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

