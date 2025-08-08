import { defineCollection, z } from 'astro:content';
import type { Book, Dashak, Sama } from '@/types';

// Define schema for books
const booksCollection = defineCollection({
  type: 'data', // Using data collection for JSON data
  schema: z.object({
    title: z.string(),
    titleDevanagari: z.string(),
    description: z.string(),
    author: z.string().optional(),
    coverImage: z.string().optional(),
    sections: z.array(z.string()), // IDs of sections (dashaks/adhyays)
    sectionType: z.string(), // 'dashak', 'adhyay', etc.
  }) satisfies z.ZodType<Book>,
});

// Define schema for dashaks/adhyays
const dashaksCollection = defineCollection({
  type: 'data',
  schema: z.object({
    bookId: z.string(),
    title: z.string(),
    titleDevanagari: z.string(),
    number: z.number(),
    description: z.string().optional(),
    samas: z.array(z.string()), // IDs of samas in this dashak
  }) satisfies z.ZodType<Dashak>,
});

// Define schema for samas
const samasCollection = defineCollection({
  type: 'content', // Using content collection for Markdown content
  schema: z.object({
    dashakId: z.string(),
    title: z.string(),
    titleDevanagari: z.string(),
    number: z.number(),
    description: z.string().optional(),
  }) satisfies z.ZodType<Sama>,
});

export const collections = {
  'books': booksCollection,
  'dashaks': dashaksCollection,
  'samas': samasCollection,
};
