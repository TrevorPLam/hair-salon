

// SECURITY NOTE [Task 1.5.6]:
//   MDX via next-mdx-remote is safe when content comes from static files (our case).
//   If the content source ever becomes user-editable (CMS, admin panel), this pipeline
//   MUST add `rehype-sanitize` to the rehype plugin chain to prevent stored XSS.
//   See: https://github.com/rehypejs/rehype-sanitize
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
