/**
 * About page component showcasing salon story and values.
 *
 * @page About
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🤖 AI METACODE — Quick Reference for AI Agents
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **FILE PURPOSE**: About page telling the salon's story, values, and building trust.
 * Showcases expertise, care, atmosphere with statistics and social proof.
 *
 * **SEO**: Custom metadata for about page branding and search visibility.
 *
 * **SECTIONS**:
 * 1. Hero - Main value proposition with gradient background
 * 2. Our Story - Narrative about salon founding and growth
 * 3. Values - Three key differentiators (expertise, care, atmosphere)
 * 4. Stats - Social proof with numbers (years, clients, satisfaction)
 * 5. CTA - Conversion to booking/services
 *
 * **DESIGN SYSTEM**:
 * - Gradients: charcoal-to-teal for hero sections
 * - Cards: White with subtle shadows and borders
 * - Icons: Lucide React (Scissors, Heart, Sparkles)
 * - Typography: Hero headings (4xl-5xl), section headings (3xl-4xl)
 *
 * **CONVERSION FLOW**:
 * - Primary CTA: "Book Now" → /contact
 * - Secondary CTA: "View Services" → /services
 * - Stats build credibility before CTA
 *
 * **AI ITERATION HINTS**:
 * - Adding new value? Update Values section grid
 * - Changing stats? Update all four stat items
 * - Modifying CTA? Update both links and styling
 *
 * **DEPENDENCIES**:
 * - @repo/ui: Container component for consistent layout
 * - Lucide React: Icon library for visual elements
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **Purpose:**
 * - Tell the salon's story and build emotional connection
 * - Showcase key differentiators and value propositions
 * - Provide social proof through statistics
 * - Drive conversions with strategic CTAs
 *
 * **Content Sections:**
 * - Hero: Main headline and value proposition
 * - Story: Narrative about founding and team growth
 * - Values: Three pillars (expertise, care, atmosphere)
 * - Stats: Quantified social proof (years, clients, satisfaction)
 * - CTA: Conversion-focused final section
 *
 * **Design Elements:**
 * - Gradient backgrounds for visual hierarchy
 * - Card-based layout for values and stats
 * - Consistent icon usage for visual reinforcement
 * - Responsive grid layouts (mobile-first approach)
 *
 * **SEO Optimization:**
 * - Custom title and meta description
 * - Semantic HTML structure
 * - Clear conversion paths
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Scissors, Heart, Sparkles } from 'lucide-react';
import { Container } from '@repo/ui';

// Page-specific SEO metadata
export const metadata: Metadata = {
  title: 'About Us | Hair Salon Template',
  description:
    'Meet our team of expert stylists and learn about our commitment to healthy, beautiful hair.',
};

// About page component with story, values, stats, and conversion CTAs
export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Main value proposition */}
      <section className="bg-gradient-to-br from-charcoal via-slate-800 to-teal/20 text-white py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">More Than Just a Haircut</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              We are a team of passionate stylists dedicated to creating a relaxing experience and
              delivering results that make you shine.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story Section - Founding narrative */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-slate space-y-6">
              <p>
                Our salon was founded with a simple mission: to provide high-quality hair care in a
                welcoming and unpretentious environment. We believe that getting your hair done
                should be the best part of your week.
              </p>
              <p>
                We started as a small team of two stylists and have grown into a family of creative
                professionals who share a love for their craft. We constantly educate ourselves on
                the latest trends and techniques to ensure we can bring your vision to life.
              </p>
              <p>
                Whether you&apos;re looking for a subtle refresh or a complete transformation, we
                listen, we care, and we deliver.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section - Key differentiators */}
      <section className="py-20 bg-off-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-12 text-center">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Value 1: Expertise */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center mb-4">
                <Scissors className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-3">Expertise</h3>
              <p className="text-slate">
                Our stylists are master-certified and participate in ongoing education to stay ahead
                of the curve.
              </p>
            </div>

            {/* Value 2: Care */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-3">Care</h3>
              <p className="text-slate">
                We prioritize the health of your hair, using only the finest products that nourish
                and protect.
              </p>
            </div>

            {/* Value 3: Atmosphere */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-3">Atmosphere</h3>
              <p className="text-slate">
                Relax in our modern, clean, and comfortable space. Enjoy a beverage and let us
                pamper you.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section - Social proof */}
      <section className="py-20 bg-gradient-to-br from-charcoal via-slate-800 to-teal/20 text-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">By The Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
                <div className="text-white/90">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">5k+</div>
                <div className="text-white/90">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                <div className="text-white/90">Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
                <div className="text-white/90">Awards Won</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section - Final conversion */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
              Experience the Difference
            </h2>
            <p className="text-xl text-slate mb-8">
              Book your appointment today and discover your best hair.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-all shadow-lg hover:shadow-xl"
              >
                Book Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-charcoal font-semibold rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-all"
              >
                View Services
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
