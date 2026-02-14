/**
 * @ai-pattern Form Handler
 * @ai-security Input Validated
 * @ai-performance Server Only
 * @ai-tests Required
 * @ai-reference /ai/patterns/form-handler-pattern.md
 */

import { z } from 'zod'

// Form validation schemas
const ContactFormSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[\d\s-()]+$/).optional(),
  message: z.string().min(10).max(1000),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must consent to be contacted',
  }),
})

const BookingFormSchema = z.object({
  serviceId: z.string().uuid(),
  dateTime: z.string().datetime(),
  customerInfo: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().regex(/^\+?[\d\s-()]+$/).optional(),
  }),
  notes: z.string().max(500).optional(),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
})

const NewsletterFormSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  preferences: z.array(z.string()).optional(),
})

export type ContactFormData = z.infer<typeof ContactFormSchema>
export type BookingFormData = z.infer<typeof BookingFormSchema>
export type NewsletterFormData = z.infer<typeof NewsletterFormSchema>

// Form result schemas
const FormResultSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
  errors: z.record(z.string()).optional(),
})

export type FormResult = z.infer<typeof FormResultSchema>

// Base form handler class
export abstract class BaseFormHandler<T> {
  protected schema: z.ZodSchema<T>
  protected rateLimitMap = new Map<string, { count: number; resetTime: number }>()

  constructor(schema: z.ZodSchema<T>) {
    this.schema = schema
  }

  protected validateInput(data: unknown): { data: T; errors: Record<string, string> | null } {
    try {
      const validatedData = this.schema.parse(data)
      return { data: validatedData, errors: null }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.errors.forEach(err => {
          errors[err.path.join('.')] = err.message
        })
        return { data: null as T, errors }
      }
      return { data: null as T, errors: { general: 'Validation failed' } }
    }
  }

  protected checkRateLimit(identifier: string, limit: number, windowMs: number): boolean {
    const now = Date.now()
    const current = this.rateLimitMap.get(identifier)
    
    if (!current || current.resetTime < now) {
      this.rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs })
      return true
    }
    
    if (current.count >= limit) {
      return false
    }
    
    current.count++
    return true
  }

  protected sanitizeInput(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim()
  }

  protected createSuccessResult(message: string, data?: any): FormResult {
    return FormResultSchema.parse({
      success: true,
      message,
      data,
    })
  }

  protected createErrorResult(message: string, errors?: Record<string, string>): FormResult {
    return FormResultSchema.parse({
      success: false,
      message,
      errors,
    })
  }

  abstract handle(data: unknown): Promise<FormResult>
}

// Contact form handler
export class ContactFormHandler extends BaseFormHandler<ContactFormData> {
  constructor() {
    super(ContactFormSchema)
  }

  async handle(data: unknown): Promise<FormResult> {
    const { data, errors } = this.validateInput(data)
    
    if (errors) {
      return this.createErrorResult('Please fix the errors below', errors)
    }

    // Check rate limiting
    const ip = 'client-ip' // Would come from request
    if (!this.checkRateLimit(`contact-${ip}`, 3, 300000)) { // 3 requests per 5 minutes
      return this.createErrorResult('Too many contact requests. Please try again later.')
    }

    try {
      // Sanitize input
      const sanitizedData = {
        name: this.sanitizeInput(data.name),
        email: this.sanitizeInput(data.email),
        phone: this.sanitizeInput(data.phone || ''),
        message: this.sanitizeInput(data.message),
        consent: data.consent,
      }

      // Process contact form
      await this.processContactForm(sanitizedData)
      
      return this.createSuccessResult('Message sent successfully! We\'ll get back to you soon.')
    } catch (error) {
      return this.createErrorResult('Failed to send message. Please try again.')
    }
  }

  private async processContactForm(data: ContactFormData): Promise<void> {
    // Send email notification
    await this.sendNotificationEmail(data)
    
    // Store in database (simplified)
    await this.saveContactSubmission(data)
    
    // Trigger webhook if needed
    await this.sendWebhook(data)
  }

  private async sendNotificationEmail(data: ContactFormData): Promise<void> {
    // Implementation would use email adapter
    console.log('Sending contact notification:', data)
  }

  private async saveContactSubmission(data: ContactFormData): Promise<void> {
    // Implementation would save to database
    console.log('Saving contact submission:', data)
  }

  private async sendWebhook(data: ContactFormData): Promise<void> {
    // Implementation would send to external webhook
    console.log('Sending webhook:', data)
  }
}

// Booking form handler
export class BookingFormHandler extends BaseFormHandler<BookingFormData> {
  constructor() {
    super(BookingFormSchema)
  }

  async handle(data: unknown): Promise<FormResult> {
    const { data, errors } = this.validateInput(data)
    
    if (errors) {
      return this.createErrorResult('Please fix the errors below', errors)
    }

    // Check rate limiting
    const ip = 'client-ip' // Would come from request
    if (!this.checkRateLimit(`booking-${ip}`, 2, 600000)) { // 2 requests per 10 minutes
      return this.createErrorResult('Too many booking attempts. Please try again later.')
    }

    try {
      // Check availability
      const isAvailable = await this.checkAvailability(data.serviceId, data.dateTime)
      
      if (!isAvailable) {
        return this.createErrorResult('Selected time slot is not available.')
      }

      // Process booking
      const appointment = await this.processBooking(data)
      
      return this.createSuccessResult('Appointment booked successfully!', { appointment })
    } catch (error) {
      return this.createErrorResult('Failed to book appointment. Please try again.')
    }
  }

  private async checkAvailability(serviceId: string, dateTime: string): Promise<boolean> {
    // Implementation would check calendar availability
    console.log('Checking availability:', { serviceId, dateTime })
    return true // Simplified for example
  }

  private async processBooking(data: BookingFormData): Promise<any> {
    // Implementation would create appointment in database
    console.log('Processing booking:', data)
    
    // Send confirmation
    await this.sendBookingConfirmation(data)
    
    return { id: 'appointment-id', ...data }
  }

  private async sendBookingConfirmation(data: BookingFormData): Promise<void> {
    // Implementation would send confirmation email/SMS
    console.log('Sending booking confirmation:', data)
  }
}

// Newsletter form handler
export class NewsletterFormHandler extends BaseFormHandler<NewsletterFormData> {
  constructor() {
    super(NewsletterFormSchema)
  }

  async handle(data: unknown): Promise<FormResult> {
    const { data, errors } = this.validateInput(data)
    
    if (errors) {
      return this.createErrorResult('Please fix the errors below', errors)
    }

    // Check rate limiting
    const email = data.email
    if (!this.checkRateLimit(`newsletter-${email}`, 1, 86400000)) { // 1 request per day
      return this.createErrorResult('You can only subscribe once per day.')
    }

    try {
      // Process newsletter subscription
      await this.processNewsletterSubscription(data)
      
      return this.createSuccessResult('Successfully subscribed to newsletter!')
    } catch (error) {
      return this.createErrorResult('Failed to subscribe. Please try again.')
    }
  }

  private async processNewsletterSubscription(data: NewsletterFormData): Promise<void> {
    // Implementation would add to newsletter service
    console.log('Processing newsletter subscription:', data)
  }
}

// Factory function
export function createFormHandler(type: 'contact' | 'booking' | 'newsletter'): BaseFormHandler<any> {
  switch (type) {
    case 'contact':
      return new ContactFormHandler()
    case 'booking':
      return new BookingFormHandler()
    case 'newsletter':
      return new NewsletterFormHandler()
    default:
      throw new Error(`Unsupported form type: ${type}`)
  }
}

// Usage example:
export const contactHandler = createFormHandler('contact')
export const bookingHandler = createFormHandler('booking')
export const newsletterHandler = createFormHandler('newsletter')

// In API route:
// export default async function handler(request: NextRequest) {
//   const data = await request.json()
//   const result = await contactHandler.handle(data)
//   return NextResponse.json(result)
// }
