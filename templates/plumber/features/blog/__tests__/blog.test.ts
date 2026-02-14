const plumberTestPath = require('path');

// blog.ts computes postsDirectory at module load via process.cwd(),
// so we must override cwd BEFORE requiring the module.
const plumberTemplateRoot = plumberTestPath.resolve(__dirname, '../../..');
const originalPlumberCwdFunction = process.cwd;
process.cwd = () => plumberTemplateRoot;

const { getAllPosts: getAllPlumberPosts, getAllCategories, getPostBySlug, getFeaturedPosts } = require('../lib/blog');

afterAll(() => {
  process.cwd = originalPlumberCwdFunction;
});

describe('features/blog/lib/blog', () => {
  test('loads posts with required fields', () => {
    const posts = getAllPlumberPosts();

    expect(posts.length).toBeGreaterThan(0);

    posts.forEach((post: { slug: string; title: string; description: string; author: string; category: string; date: string; readingTime: string }) => {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.description).toBeTruthy();
      expect(post.author).toBeTruthy();
      expect(post.category).toBeTruthy();
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.readingTime).toMatch(/min/i);
    });
  });

  test('returns categories derived from posts', () => {
    const categories = getAllCategories();

    expect(categories.length).toBeGreaterThan(0);
    categories.forEach((category: string) => expect(category).toBeTruthy());
  });

  test('resolves a post by slug', () => {
    const posts = getAllPlumberPosts();
    const post = getPostBySlug(posts[0].slug);

    expect(post).toBeDefined();
    expect(post.slug).toBe(posts[0].slug);
  });

  test('featured posts are a subset of all posts', () => {
    const posts = getAllPlumberPosts();
    const featured = getFeaturedPosts();

    featured.forEach((post: { slug: string }) => {
      expect(posts.find((item: { slug: string }) => item.slug === post.slug)).toBeDefined();
    });
  });
});
