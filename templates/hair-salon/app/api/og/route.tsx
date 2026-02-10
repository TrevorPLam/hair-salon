/**
 * @file apps/web/app/api/og/route.tsx
 * @role runtime
 * @summary Edge route that generates dynamic OG images.
 *
 * @entrypoints
 * - Route: /api/og
 *
 * @exports
 * - runtime
 * - GET
 *
 * @depends_on
 * - External: next/og
 * - External: next/server
 * - External: zod
 * - Internal: @/lib/sanitize (escapeHtml)
 *
 * @used_by
 * - OpenGraph metadata and social share previews
 *
 * @runtime
 * - environment: edge
 * - side_effects: none
 *
 * @data_flow
 * - inputs: query params (title, description)
 * - outputs: ImageResponse
 *
 * @issues
 * - [severity:low] No rate limiting on this GET endpoint.
 *
 * @verification
 * - Visit /api/og?title=Test&description=Hello and verify image renders.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { z } from 'zod';

import { escapeHtml } from '@/lib/sanitize';

export const runtime = 'edge';

const ogQuerySchema = z.object({
  title: z.string().max(200).optional(),
  description: z.string().max(500).optional(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parseResult = ogQuerySchema.safeParse({
    title: searchParams.get('title') ?? undefined,
    description: searchParams.get('description') ?? undefined,
  });

  if (!parseResult.success) {
    return new Response('Invalid query parameters', { status: 400 });
  }

  const title = escapeHtml(parseResult.data.title ?? 'Salon Template');
  const description = escapeHtml(
    parseResult.data.description ??
      'Professional hair salon services tailored to your style. Cuts, color, treatments, and more.'
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '48px',
          background: 'linear-gradient(135deg, #0F1115 0%, #0EA5A4 80%)',
          color: 'white',
          fontFamily: 'Inter, Arial, sans-serif',
          gap: '24px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.1)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 32,
            }}
          >
            ✂️
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>Salon Template</div>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)' }}>
              Professional Hair Care
            </div>
          </div>
        </div>

        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.85)', maxWidth: 900 }}>
          {description}
        </div>

        <div style={{ display: 'flex', gap: 16, fontSize: 18, color: 'rgba(255,255,255,0.75)' }}>
          <span>Haircuts</span>
          <span>•</span>
          <span>Color Services</span>
          <span>•</span>
          <span>Treatments</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
