/**
 * @file templates/hair-salon/features/blog/__tests__/blog.test.ts
 * @role test
 * @summary Blog data helpers tests.
 */

const { getAllPosts, getAllCategories, getPostBySlug, getFeaturedPosts } = require('../lib/blog');

describe('features/blog/lib/blog', () => {
  test('loads posts with required fields', () => {
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThan(0);

    posts.forEach((post) => {
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
    categories.forEach((category) => expect(category).toBeTruthy());
  });

  test('resolves a post by slug', () => {
    const posts = getAllPosts();
    const post = getPostBySlug(posts[0].slug);

    expect(post).toBeDefined();
    expect(post.slug).toBe(posts[0].slug);
  });

  test('featured posts are a subset of all posts', () => {
    const posts = getAllPosts();
    const featured = getFeaturedPosts();

    featured.forEach((post) => {
      expect(posts.find((item) => item.slug === post.slug)).toBeDefined();
    });
  });
});
