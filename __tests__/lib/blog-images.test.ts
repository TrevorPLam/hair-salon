import fs from 'fs'
import os from 'os'
import path from 'path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getBlogPostImageUrl } from '@/lib/blog-images'

const writePublicFixture = (files: string[]) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-images-test-'))
  const publicDir = path.join(tempDir, 'public')

  for (const file of files) {
    const filePath = path.join(publicDir, file)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, '')
  }

  return tempDir
}

let tempDir: string | null = null

describe('getBlogPostImageUrl', () => {
  afterEach(() => {
    vi.restoreAllMocks()

    if (tempDir) {
      fs.rmSync(tempDir, { recursive: true, force: true })
      tempDir = null
    }
  })

  it('returns the post-specific image when available', () => {
    tempDir = writePublicFixture(['blog/post-slug.jpg', 'og-image.jpg'])
    vi.spyOn(process, 'cwd').mockReturnValue(tempDir)

    const url = getBlogPostImageUrl('https://example.com', 'post-slug')

    expect(url).toBe('https://example.com/blog/post-slug.jpg')
  })

  it('falls back to the shared og image when post image is missing', () => {
    tempDir = writePublicFixture(['og-image.jpg'])
    vi.spyOn(process, 'cwd').mockReturnValue(tempDir)

    const url = getBlogPostImageUrl('https://example.com/', 'post-slug')

    expect(url).toBe('https://example.com/og-image.jpg')
  })

  it('returns null when no image assets are available', () => {
    tempDir = writePublicFixture([])
    vi.spyOn(process, 'cwd').mockReturnValue(tempDir)

    const url = getBlogPostImageUrl('https://example.com', 'post-slug')

    expect(url).toBeNull()
  })
})
