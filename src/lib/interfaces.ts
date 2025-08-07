import type { Book, Dashak, Sama } from '@/lib/types';
import type { CollectionEntry } from 'astro:content';

// Type-safe collection entries
export type BookEntry = CollectionEntry<'books'>;
export type DashakEntry = CollectionEntry<'dashaks'>;
export type SamaEntry = CollectionEntry<'samas'>;

// For pages that display book information
export interface BookPageProps {
  book: BookEntry;
  sections?: DashakEntry[];
}

// For pages that display dashak/section information
export interface DashakPageProps {
  book: BookEntry;
  dashak: DashakEntry;
  samas?: SamaEntry[];
}

// For pages that display sama/verse information
export interface SamaPageProps {
  book: BookEntry;
  dashak: DashakEntry;
  sama: SamaEntry;
}
