/**
 * @file templates/hair-salon/features/blog/components/BlogPostContent.tsx
 * @role runtime
 * @summary MDX renderer for blog post content.
 *
 * @entrypoints
 * - Used by blog post page
 *
 * @exports
 * - default BlogPostContent
 *
 * @depends_on
 * - External: next-mdx-remote/rsc
 * - External: remark-gfm
 * - External: rehype-slug
 * - External: rehype-pretty-code
 *
 * @used_by
 * - templates/hair-salon/app/blog/[slug]/page.tsx
 *
 * @runtime
 * - environment: server
 * - side_effects: none
 *
 * @data_flow
 * - inputs: MDX content string
 * - outputs: rendered article markup
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <div className="prose prose-lg max-w-none mt-12">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypePrettyCode,
                {
                  theme: 'github-dark',
                  keepBackground: false,
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
