

import { z } from 'zod';
import { FORM_VALIDATION } from '@/lib/constants';

// Contact form schema with enhanced validation
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(FORM_VALIDATION.NAME_MIN_LENGTH, 'Name must be at least 2 characters')
    .max(FORM_VALIDATION.NAME_MAX_LENGTH),
  email: z.string().email('Invalid email address').max(FORM_VALIDATION.EMAIL_MAX_LENGTH),
  company: z.string().max(FORM_VALIDATION.COMPANY_MAX_LENGTH).optional(),
  phone: z.string().trim().min(1, 'Phone number is required').max(FORM_VALIDATION.PHONE_MAX_LENGTH),
  servicesInterested: z
    .string()
    .max(
      FORM_VALIDATION.SERVICES_INTERESTED_MAX_LENGTH,
      "Please select services you're interested in"
    )
    .optional(),
  preferredAppointment: z
    .string()
    .max(
      FORM_VALIDATION.PREFERRED_APPOINTMENT_MAX_LENGTH,
      'Please select preferred appointment time'
    )
    .optional(),
  // Honeypot field - must be empty to pass validation (bot protection)
  website: z.string().max(0, 'Honeypot must be empty').optional(),
  message: z
    .string()
    .min(FORM_VALIDATION.MESSAGE_MIN_LENGTH, 'Message must be at least 10 characters')
    .max(FORM_VALIDATION.MESSAGE_MAX_LENGTH),
  hearAboutUs: z.string().max(FORM_VALIDATION.HEAR_ABOUT_US_MAX_LENGTH).optional(),
});

// Type inferred from schema for type-safe form handling
export type ContactFormData = z.infer<typeof contactFormSchema>;
