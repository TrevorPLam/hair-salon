const path = require('path');

// blog.ts computes postsDirectory at module load via process.cwd()
const templateRoot = path.resolve(__dirname, '../..');
const originalCwd = process.cwd;
process.cwd = () => templateRoot;

const { getSearchIndex } = require('../search');
const { getAllPosts } = require('../../features/blog/lib/blog');

afterAll(() => {
  process.cwd = originalCwd;
});

describe('lib/search', () => {
  test('includes blog posts in the search index', async () => {
    const items = await getSearchIndex();
    const blogItems = items.filter((item) => item.type === 'Blog');

    expect(blogItems.length).toBeGreaterThan(0);
  });

  test('maps blog slugs into search hrefs', async () => {
    const items = await getSearchIndex();
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThan(0);
    expect(items).toEqual(
      expect.arrayContaining([expect.objectContaining({ href: `/blog/${posts[0].slug}` })])
    );
  });
});
