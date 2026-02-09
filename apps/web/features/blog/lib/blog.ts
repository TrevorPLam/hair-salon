/**
 * @file apps/web/features/blog/lib/blog.ts
 * @role runtime
 * @summary File-based blog CMS for MDX posts.
 *
 * @entrypoints
 * - getAllPosts
 * - getPostBySlug
 * - getFeaturedPosts
 * - getPostsByCategory
 * - getAllCategories
 *
 * @exports
 * - BlogPost type
 * - blog data helpers
 *
 * @depends_on
 * - Node: fs, path
 * - External: gray-matter, reading-time
 *
 * @used_by
 * - apps/web/app/blog/page.tsx
 * - apps/web/app/blog/[slug]/page.tsx
 * - apps/web/app/sitemap.ts
 * - apps/web/lib/search.ts
 *
 * @runtime
 * - environment: server
 * - side_effects: filesystem reads
 *
 * @data_flow
 * - inputs: MDX files in content/blog
 * - outputs: parsed BlogPost objects
 *
 * @invariants
 * - Requires Node runtime or static generation
 *
 * @issues
 * - [severity:med] Not compatible with edge runtime due to fs usage.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

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

const buildPost = (
  slug: string,
  data: Record<string, unknown>,
  content: string
): BlogPost | null => {
  const hasRequiredFields =
    Object.hasOwn(data, 'title') &&
    Object.hasOwn(data, 'description') &&
    Object.hasOwn(data, 'date');

  if (!hasRequiredFields) {
    // WHY: Require explicit frontmatter fields to avoid silently accepting malformed posts.
    return null;
  }

  const title = isNonEmptyString(data.title) ? data.title : null;
  const description = isNonEmptyString(data.description) ? data.description : null;
  const normalizedDate = normalizeBlogDate(data.date);

  if (!title || !description || !normalizedDate) {
    // WHY: Skip invalid frontmatter to keep blog rendering stable.
    return null;
  }

  return {
    slug,
    title,
    description,
    date: normalizedDate.value,
    author: isNonEmptyString(data.author) ? data.author : 'Hair Salon Template Team',
    category: isNonEmptyString(data.category) ? data.category : 'Hair Care',
    readingTime: readingTime(content).text,
    content,
    featured: typeof data.featured === 'boolean' ? data.featured : false,
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
export function getAllPosts(): BlogPost[] {
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
export function getPostBySlug(slug: string): BlogPost | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return buildPost(slug, data, content) ?? undefined;
  } catch {
    return undefined;
  }
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
