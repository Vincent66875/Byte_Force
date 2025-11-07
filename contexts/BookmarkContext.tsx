import React, { createContext, useContext, useState, ReactNode } from 'react';
import { INITIAL_BOOKMARKS, ProcedureBookmark } from '@/types/bookmark';

interface BookmarkContextType {
  bookmarks: ProcedureBookmark[];
  updateBookmarkProgress: (procedureKey: string, step: number) => void;
  removeBookmark: (id: string) => void;
  getBookmark: (procedureKey: string) => ProcedureBookmark | undefined;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<ProcedureBookmark[]>(INITIAL_BOOKMARKS);

  const updateBookmarkProgress = (procedureKey: string, step: number) => {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.procedureKey === procedureKey
          ? {
              ...bookmark,
              currentStep: step,
              lastAccessed: new Date().toISOString(),
            }
          : bookmark
      )
    );
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const getBookmark = (procedureKey: string) => {
    return bookmarks.find((b) => b.procedureKey === procedureKey);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, updateBookmarkProgress, removeBookmark, getBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}

