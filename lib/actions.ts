'use server'

import { z } from 'zod'

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  marketingSpend: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  hearAboutUs: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate the data
    const validatedData = contactFormSchema.parse(data)

    // Send email via Resend API
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: 'onboarding@resend.dev', // Use Resend's test domain or your verified domain
        to: process.env.CONTACT_EMAIL || 'contact@yourdedicatedmarketer.com',
        subject: `New Contact Form Submission from ${validatedData.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
          ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
          ${validatedData.marketingSpend ? `<p><strong>Marketing Spend:</strong> ${validatedData.marketingSpend}</p>` : ''}
          ${validatedData.hearAboutUs ? `<p><strong>How they heard about us:</strong> ${validatedData.hearAboutUs}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `,
      })
    } else {
      // Log warning if no API key is set
      console.warn('RESEND_API_KEY not set - email not sent')
      console.log('Contact form submission:', validatedData)
    }

    return { success: true, message: 'Thank you for your message! We\'ll be in touch soon.' }
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Please check your form inputs and try again.',
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: 'Something went wrong. Please try again or email us directly.',
    }
  }
}
