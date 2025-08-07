// Type definitions for the project

// Content Collection Types
export interface Book {
  title: string;
  titleDevanagari: string;
  description: string;
  author?: string;
  coverImage?: string;
  sections: string[]; // IDs of sections (dashaks/adhyays)
  sectionType: string; // 'dashak', 'adhyay', etc.
}

export interface Dashak {
  bookId: string;
  title: string;
  titleDevanagari: string;
  number: number;
  description?: string;
  samas: string[]; // IDs of samas in this dashak
}

export interface Sama {
  dashakId: string;
  title: string;
  titleDevanagari: string;
  number: number;
  description?: string;
  // Content will be in the body of the Markdown file
}

// UI Types
export interface NavItem {
  label: string;
  path: string;
}

// Theme Types
export type ThemeMode = 'light' | 'dark' | 'system';
