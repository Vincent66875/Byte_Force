/**
 * BookmarkContext - Global state management for procedure bookmarks
 *
 * This context provides a centralized way to track user progress across all emergency procedures.
 * It maintains bookmark state for the current session and provides methods to update and manage bookmarks.
 *
 * Key Features:
 * - Session-based progress tracking (resets when app restarts)
 * - Real-time progress updates as users navigate through procedure slides
 * - Automatic timestamp tracking for last accessed time
 * - Support for multiple concurrent procedure bookmarks
 */

import { INITIAL_BOOKMARKS, ProcedureBookmark } from '@/types/bookmark';
import React, { createContext, ReactNode, useContext, useState } from 'react';

/**
 * Type definition for the bookmark context
 * Defines all available methods and data for bookmark management
 */
interface BookmarkContextType {
  bookmarks: ProcedureBookmark[];
  updateBookmarkProgress: (procedureKey: string, step: number) => void;
  removeBookmark: (id: string) => void;
  getBookmark: (procedureKey: string) => ProcedureBookmark | undefined;
}

// Create the context with undefined as default (will be provided by BookmarkProvider)
const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

/**
 * BookmarkProvider - Wraps the app to provide bookmark state to all components
 *
 * This provider should be placed at the root level of the app (in _layout.tsx)
 * to ensure all screens have access to bookmark functionality.
 *
 * @param children - React components that need access to bookmark context
 */
export function BookmarkProvider({ children }: { children: ReactNode }) {
  // Initialize bookmarks with default data (all procedures start at step 0, not accessed)
  const [bookmarks, setBookmarks] = useState<ProcedureBookmark[]>(INITIAL_BOOKMARKS);

  /**
   * Updates the progress for a specific procedure bookmark
   *
   * This is called automatically when a user navigates to a new slide in any procedure.
   * It updates both the current step (0-based index) and the last accessed timestamp.
   *
   * @param procedureKey - The unique identifier for the procedure (e.g., 'cpr', 'choke', 'bleed')
   * @param step - The 0-based index of the current step/slide the user is viewing
   */
  const updateBookmarkProgress = (procedureKey: string, step: number) => {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.procedureKey === procedureKey
          ? {
              ...bookmark,
              currentStep: step, // Update to current slide index (0-based)
              lastAccessed: new Date().toISOString(), // Mark as accessed with current timestamp
            }
          : bookmark
      )
    );
  };

  /**
   * Removes a bookmark from the list
   *
   * Called when user explicitly removes a bookmark from the Bookmarks screen.
   *
   * @param id - The unique ID of the bookmark to remove
   */
  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  /**
   * Retrieves a specific bookmark by procedure key
   *
   * Useful for checking if a procedure has been bookmarked and getting its current progress.
   *
   * @param procedureKey - The unique identifier for the procedure
   * @returns The bookmark object if found, undefined otherwise
   */
  const getBookmark = (procedureKey: string) => {
    return bookmarks.find((b) => b.procedureKey === procedureKey);
  };

  // Provide the bookmark state and methods to all child components
  return (
    <BookmarkContext.Provider
      value={{ bookmarks, updateBookmarkProgress, removeBookmark, getBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

/**
 * Custom hook to access bookmark context
 *
 * Use this hook in any component that needs to read or update bookmark data.
 * Throws an error if used outside of BookmarkProvider to catch setup mistakes early.
 *
 * @returns The bookmark context with all available methods and data
 * @throws Error if used outside of BookmarkProvider
 *
 * @example
 * const { bookmarks, updateBookmarkProgress } = useBookmarks();
 * updateBookmarkProgress('cpr', 2); // Update CPR to step 2
 */
export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}

