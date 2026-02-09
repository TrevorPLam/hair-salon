/**
 * @file apps/web/features/contact/components/ContactForm.tsx
 * @role runtime
 * @summary Contact form with validation, submission, and analytics tracking.
 *
 * @entrypoints
 * - Used on /contact
 *
 * @exports
 * - default ContactForm
 *
 * @depends_on
 * - External: react, react-hook-form, zod
 * - External: lucide-react
 * - Internal: @repo/ui (Input, Select, Textarea, Button)
 * - Internal: @/lib/actions (submitContactForm)
 * - Internal: @/lib/contact-form-schema
 * - Internal: @/lib/analytics
 * - Internal: @/lib/constants
 * - Internal: @/lib/sentry-client
 *
 * @used_by
 * - apps/web/app/contact/page.tsx
 *
 * @runtime
 * - environment: client
 * - side_effects: network submission, analytics, sentry context
 *
 * @data_flow
 * - inputs: form fields
 * - outputs: submission request and status UI
 *
 * @invariants
 * - Honeypot field must remain empty
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @verification
 * - Submit form and verify success/error states.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitContactForm } from '@/lib/actions';
import { contactFormSchema, type ContactFormData } from '@/lib/contact-form-schema';
import { trackFormSubmission } from '@/lib/analytics';
import { UI_TIMING } from '@/lib/constants';
import { Input, Select, Textarea, Button } from '@repo/ui';
import { Loader2 } from 'lucide-react';
import { setSentryContext, setSentryUser, withSentrySpan } from '@/lib/sentry-client';

/**
 * Contact form with full validation and server submission.
 * Manages its own submission state and error handling.
 */
export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur', // Validate on blur for better UX
    reValidateMode: 'onChange', // Re-validate on change after first validation
    delayError: UI_TIMING.FORM_ERROR_DEBOUNCE_MS, // Debounce error display
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await withSentrySpan(
        { name: 'contact_form.submit', op: 'ui.action', attributes: { route: '/contact' } },
        () => submitContactForm(data)
      );

      if (result.success) {
        trackFormSubmission('contact', true);
        await setSentryUser({ email: data.email, name: data.name });
        await setSentryContext('contact_form', {
          servicesInterested: data.servicesInterested,
          preferredAppointment: data.preferredAppointment,
          heardFrom: data.hearAboutUs,
        });
        setSubmitStatus({
          type: 'success',
          message: result.message,
        });
        reset();
      } else {
        trackFormSubmission('contact', false);
        setSubmitStatus({
          type: 'error',
          message: result.message,
        });
      }
    } catch {
      trackFormSubmission('contact', false);
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Contact form">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <Input
        label="Name"
        type="text"
        placeholder="John Smith"
        required
        error={errors.name?.message}
        isValid={touchedFields.name && !errors.name}
        {...register('name')}
      />

      <Input
        label="Email"
        type="email"
        placeholder="john@company.com"
        required
        error={errors.email?.message}
        isValid={touchedFields.email && !errors.email}
        {...register('email')}
      />

      <Input
        label="Company"
        type="text"
        placeholder="Your Company"
        error={errors.company?.message}
        isValid={touchedFields.company && dirtyFields.company && !errors.company}
        {...register('company')}
      />

      <Input
        label="Phone"
        type="tel"
        placeholder="(555) 123-4567"
        required
        error={errors.phone?.message}
        isValid={Boolean(touchedFields.phone && !errors.phone)}
        {...register('phone')}
      />

      <Select
        label="Services Interested In"
        options={[
          { value: '', label: 'Select services' },
          { value: 'haircut', label: 'Haircut & Styling' },
          { value: 'color', label: 'Hair Color & Highlights' },
          { value: 'treatment', label: 'Hair Treatment' },
          { value: 'styling', label: 'Special Occasion Styling' },
          { value: 'consultation', label: 'Consultation' },
        ]}
        error={errors.servicesInterested?.message}
        {...register('servicesInterested')}
      />

      <Select
        label="Preferred Appointment Time"
        options={[
          { value: '', label: 'Select time' },
          { value: 'morning', label: 'Morning (9AM - 12PM)' },
          { value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
          { value: 'evening', label: 'Evening (5PM - 8PM)' },
        ]}
        error={errors.preferredAppointment?.message}
        {...register('preferredAppointment')}
      />

      <Textarea
        label="Message"
        placeholder="Tell us about your hair care needs and desired services..."
        rows={5}
        required
        error={errors.message?.message}
        isValid={touchedFields.message && !errors.message}
        {...register('message')}
      />

      <Select
        label="How did you hear about us?"
        options={[
          { value: '', label: 'Select an option' },
          { value: 'search', label: 'Search engine (Google, Bing, etc.)' },
          { value: 'social', label: 'Social media' },
          { value: 'referral', label: 'Referral from a friend or colleague' },
          { value: 'ad', label: 'Online advertisement' },
          { value: 'other', label: 'Other' },
        ]}
        error={errors.hearAboutUs?.message}
        {...register('hearAboutUs')}
      />

      {submitStatus.type && (
        <div
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          className={`p-4 rounded-lg ${
            submitStatus.type === 'success'
              ? 'bg-success/10 text-success border border-success/20'
              : 'bg-error/10 text-error border border-error/20'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="large"
        className="w-full"
        disabled={isSubmitting}
        aria-label={isSubmitting ? 'Sending message' : 'Send message'}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
}
