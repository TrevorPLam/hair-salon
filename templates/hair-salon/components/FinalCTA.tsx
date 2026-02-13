/**
 * @file templates/hair-salon/components/FinalCTA.tsx
 * @role runtime
 * @summary Reusable CTA section for booking and services links.
 *
 * @entrypoints
 * - Used on marketing pages
 *
 * @exports
 * - default FinalCTA
 *
 * @depends_on
 * - External: react
 * - External: next/link
 * - Internal: @repo/ui (Button, Container, Section)
 *
 * @used_by
 * - templates/hair-salon/app/page.tsx
 *
 * @runtime
 * - environment: server
 * - side_effects: none
 *
 * @data_flow
 * - inputs: static CTA copy
 * - outputs: CTA section
 *
 * @invariants
 * - Links should resolve to valid routes
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @verification
 * - Confirm CTA links navigate to /contact and /services.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import React, { memo } from 'react';
import Link from 'next/link';
import { Button, Container, Section } from '@repo/ui';

function FinalCTA() {
  return (
    <Section className="bg-secondary text-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for your new look?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Book an appointment today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button variant="primary" size="large">
                Book Appointment
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="secondary"
                size="large"
                className="border-white text-foreground bg-white hover:bg-muted"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default memo(FinalCTA);
