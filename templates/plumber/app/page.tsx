

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import ValueProps from '@/components/ValueProps';
import { ServicesOverview } from '@/features/services';

// Below-fold components loaded dynamically for better initial load
const SocialProof = dynamic(() => import('@/components/SocialProof'), {
  loading: () => <div className="sr-only">Loading testimonials…</div>,
  ssr: true,
});

const FinalCTA = dynamic(() => import('@/components/FinalCTA'), {
  loading: () => <div className="sr-only">Loading final call to action…</div>,
  ssr: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <ServicesOverview />
      <SocialProof />
      <FinalCTA />
    </>
  );
}
