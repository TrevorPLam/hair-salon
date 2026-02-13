import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { cache } from 'react';
import { z } from 'zod';
import siteConfig from '@/site.config';

/** Absolute path to blog content directory */
const postsDirectory = path.join(process.cwd(), 'content/blog');
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const normalizeBlogDate = (value: unknown): { value: string; date: Date } | null => {
  if (value instanceof Date) {
    const isoDate = value.toISOString().slice(0, 10);
    return { value: isoDate, date: value };
  }

  if (!isNonEmptyString(value) || !datePattern.test(value)) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  // WHY: Validate that the parsed date matches the frontmatter string to avoid rollover dates.
  if (parsed.toISOString().slice(0, 10) !== value) {
    return null;
  }

  return { value, date: parsed };
};

const blogFrontmatterSchema = z.object({
  title: z.string().min(2).max(200).trim(),
  description: z.string().min(10).max(300).trim(),
  date: z.union([z.string(), z.date()]),
  author: z.string().min(2).max(80).trim().optional(),
  category: z.string().min(2).max(40).trim().optional(),
  featured: z.boolean().optional(),
});

const formatFrontmatterErrors = (error: z.ZodError) => JSON.stringify(error.flatten().fieldErrors);

const reportFrontmatterError = (slug: string, details: string) => {
  const message = `Invalid frontmatter for blog post "${slug}": ${details}`;

  if (process.env.NODE_ENV === 'production') {
    console.warn(message);
    return;
  }

  throw new Error(message);
};

const buildPost = (
  slug: string,
  data: Record<string, unknown>,
  content: string
): BlogPost | null => {
  const parsed = blogFrontmatterSchema.safeParse(data);

  if (!parsed.success) {
    reportFrontmatterError(slug, formatFrontmatterErrors(parsed.error));
    return null;
  }

  const normalizedDate = normalizeBlogDate(parsed.data.date);

  if (!normalizedDate) {
    reportFrontmatterError(slug, 'date must be YYYY-MM-DD and a valid calendar date');
    return null;
  }

  return {
    slug,
    title: parsed.data.title,
    description: parsed.data.description,
    date: normalizedDate.value,
    author: parsed.data.author ?? `${siteConfig.name} Team`,
    category: parsed.data.category ?? 'Hair Care',
    readingTime: readingTime(content).text,
    content,
    featured: parsed.data.featured ?? false,
  };
};

/**
 * Blog post data structure.
 *
 * @property slug - URL-safe identifier (derived from filename)
 * @property title - Post title from frontmatter
 * @property description - SEO description from frontmatter
 * @property date - Publication date (YYYY-MM-DD)
 * @property author - Author name (defaults to team name)
 * @property category - Post category for filtering
 * @property readingTime - Calculated reading time (e.g., "5 min read")
 * @property content - Raw MDX content (without frontmatter)
 * @property featured - Whether to show on homepage
 */
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  readingTime: string;
  content: string;
  featured?: boolean;
}

/**
 * Get all blog posts sorted by date (newest first).
 *
 * **Behavior:**
 * - Reads all .mdx files from content/blog/
 * - Parses frontmatter with gray-matter
 * - Calculates reading time
 * - Returns empty array if directory doesn't exist
 *
 * **Performance:**
 * - Called at build time for SSG
 * - Results are cached by Next.js during build
 *
 * @returns Array of blog posts sorted by date descending
 *
 * @example
 * const posts = getAllPosts()
 * // Use in getStaticProps or generateStaticParams
 */
const readAllPosts = cache((): BlogPost[] => {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return buildPost(slug, data, content);
    })
    .filter((post): post is BlogPost => post !== null);

  // Sort posts by date
  return allPosts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
});

export function getAllPosts(): BlogPost[] {
  return readAllPosts();
}

/**
 * Get a single blog post by its slug.
 *
 * @param slug - URL slug (filename without .mdx extension)
 * @returns BlogPost object or undefined if not found
 *
 * @example
 * const post = getPostBySlug('hair-care-tips-summer')
 * if (!post) {
 *   notFound() // Next.js 404
 * }
 */
const readPostBySlug = cache((slug: string): BlogPost | undefined =>
  readAllPosts().find((post) => post.slug === slug)
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return readPostBySlug(slug);
}

/**
 * Get posts marked as featured.
 * Used for homepage highlights.
 *
 * @returns Array of posts where featured === true
 */
export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => post.featured);
}

/**
 * Get posts by category.
 *
 * @param category - Category name to filter by (case-sensitive)
 * @returns Array of posts in the specified category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

/**
 * Get all unique categories.
 * Categories are extracted from post frontmatter.
 *
 * @returns Sorted array of unique category names
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = posts.map((post) => post.category);
  return Array.from(new Set(categories)).sort();
}
