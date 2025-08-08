/**
 * Utility functions for content management
 */

/**
 * Removes the .md extension from a content collection ID
 * @param id - The content collection ID (e.g., "gita-adhyay-1-sloka-1.md")
 * @returns The ID without the .md extension (e.g., "gita-adhyay-1-sloka-1")
 */
export function removeMarkdownExtension(id: string): string {
  return id.replace(/\.md$/, '');
}

/**
 * Gets the clean ID for use in URLs and route parameters
 * Alias for removeMarkdownExtension for better semantic meaning in URL contexts
 */
export function getCleanId(id: string): string {
  return removeMarkdownExtension(id);
}
