import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'

let withBundleAnalyzer = (config) => config
if (process.env.ANALYZE === 'true') {
  try {
    // @ts-ignore - optional dependency for bundle analysis, may not be installed
    const bundleAnalyzer = (await import('@next/bundle-analyzer')).default
    withBundleAnalyzer = bundleAnalyzer({ enabled: true })
  } catch (error) {
    console.warn('Bundle analyzer unavailable, skipping analysis', error)
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    formats: ['image/webp'],
    remotePatterns: [],
  },
  productionBrowserSourceMaps: true,
  sentry: {
    hideSourceMaps: false,
    disableLogger: true,
  },
}

const withMDX = createMDX({
  options: {
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
})

export default withBundleAnalyzer(withMDX(nextConfig))
