/**
 * @ai-pattern Integration Adapter
 * @ai-security Input Validated
 * @ai-performance Server Only
 * @ai-tests Required
 * @ai-reference /ai/patterns/integration-adapter-pattern.md
 */

import { z } from 'zod'

// Interface definition
export interface EmailAdapter {
  sendEmail(data: EmailData): Promise<EmailResult>
}

// Input validation schema
const EmailDataSchema = z.object({
  to: z.string().email('Invalid email address'),
  subject: z.string().min(1).max(100),
  html: z.string().max(50000),
  from: z.string().email().optional(),
})

export type EmailData = z.infer<typeof EmailDataSchema>

// Result schema
const EmailResultSchema = z.object({
  success: z.boolean(),
  messageId: z.string().optional(),
  error: z.string().optional(),
})

export type EmailResult = z.infer<typeof EmailResultSchema>

// Resend adapter implementation
export class ResendAdapter implements EmailAdapter {
  private resend: any

  constructor(apiKey: string) {
    // Dynamic import to avoid bundling issues
    this.resend = require('resend')
  }

  async sendEmail(data: EmailData): Promise<EmailResult> {
    // Validate input
    const validatedData = EmailDataSchema.parse(data)
    
    try {
      const result = await this.resend.emails.send({
        to: validatedData.to,
        subject: validatedData.subject,
        html: validatedData.html,
        from: validatedData.from || process.env.DEFAULT_FROM_EMAIL,
      })

      return EmailResultSchema.parse({
        success: true,
        messageId: result.id,
      })
    } catch (error) {
      return EmailResultSchema.parse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
}

// SendGrid adapter implementation
export class SendGridAdapter implements EmailAdapter {
  private sendGrid: any

  constructor(apiKey: string) {
    // Dynamic import to avoid bundling issues
    this.sendGrid = require('@sendgrid/mail')
  }

  async sendEmail(data: EmailData): Promise<EmailResult> {
    // Validate input
    const validatedData = EmailDataSchema.parse(data)
    
    try {
      const msg = {
        to: validatedData.to,
        from: validatedData.from || process.env.DEFAULT_FROM_EMAIL,
        subject: validatedData.subject,
        html: validatedData.html,
      }

      const result = await this.sendGrid.send(msg)
      
      return EmailResultSchema.parse({
        success: true,
        messageId: result[0]?.headers?.['x-message-id'],
      })
    } catch (error) {
      return EmailResultSchema.parse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
}

// Factory function for dependency injection
export function createEmailAdapter(provider: 'resend' | 'sendgrid'): EmailAdapter {
  switch (provider) {
    case 'resend':
      return new ResendAdapter(process.env.RESEND_API_KEY!)
    case 'sendgrid':
      return new SendGridAdapter(process.env.SENDGRID_API_KEY!)
    default:
      throw new Error(`Unsupported email provider: ${provider}`)
  }
}

// Payment adapter interface
export interface PaymentAdapter {
  createPaymentIntent(amount: number, currency: string): Promise<PaymentResult>
  confirmPayment(paymentIntentId: string): Promise<PaymentResult>
}

// Payment result schema
const PaymentResultSchema = z.object({
  success: z.boolean(),
  paymentIntentId: z.string().optional(),
  clientSecret: z.string().optional(),
  error: z.string().optional(),
})

export type PaymentResult = z.infer<typeof PaymentResultSchema>

// Stripe adapter implementation
export class StripeAdapter implements PaymentAdapter {
  private stripe: any

  constructor(apiKey: string) {
    // Dynamic import to avoid bundling issues
    this.stripe = require('stripe')(apiKey)
  }

  async createPaymentIntent(amount: number, currency: string): Promise<PaymentResult> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        automatic_payment_methods: {
          enabled: ['card'],
        },
      })

      return PaymentResultSchema.parse({
        success: true,
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
      })
    } catch (error) {
      return PaymentResultSchema.parse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  async confirmPayment(paymentIntentId: string): Promise<PaymentResult> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId)
      
      return PaymentResultSchema.parse({
        success: true,
        paymentIntentId: paymentIntent.id,
      })
    } catch (error) {
      return PaymentResultSchema.parse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
}

// Payment adapter factory
export function createPaymentAdapter(provider: 'stripe'): PaymentAdapter {
  switch (provider) {
    case 'stripe':
      return new StripeAdapter(process.env.STRIPE_SECRET_KEY!)
    default:
      throw new Error(`Unsupported payment provider: ${provider}`)
  }
}

// SMS adapter interface
export interface SMSAdapter {
  sendSMS(to: string, message: string): Promise<SMSResult>
}

// SMS result schema
const SMSResultSchema = z.object({
  success: z.boolean(),
  messageId: z.string().optional(),
  error: z.string().optional(),
})

export type SMSResult = z.infer<typeof SMSResultSchema>

// Twilio SMS adapter implementation
export class TwilioSMSAdapter implements SMSAdapter {
  private twilio: any

  constructor(accountSid: string, authToken: string, fromNumber: string) {
    // Dynamic import to avoid bundling issues
    const { Twilio } = require('twilio')
    this.twilio = new Twilio(accountSid, authToken)
  }

  async sendSMS(to: string, message: string): Promise<SMSResult> {
    try {
      const result = await this.twilio.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: to,
      })

      return SMSResultSchema.parse({
        success: true,
        messageId: result.sid,
      })
    } catch (error) {
      return SMSResultSchema.parse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
}

// SMS adapter factory
export function createSMSAdapter(provider: 'twilio'): SMSAdapter {
  switch (provider) {
    case 'twilio':
      return new TwilioSMSAdapter(
        process.env.TWILIO_ACCOUNT_SID!,
        process.env.TWILIO_AUTH_TOKEN!,
        process.env.TWILIO_PHONE_NUMBER!
      )
    default:
      throw new Error(`Unsupported SMS provider: ${provider}`)
  }
}

// Usage example:
export const emailAdapter = createEmailAdapter('resend')
export const paymentAdapter = createPaymentAdapter('stripe')
export const smsAdapter = createSMSAdapter('twilio')

// Example usage in API route:
export async function sendAppointmentConfirmation(appointment: any) {
  // Send email confirmation
  const emailResult = await emailAdapter.sendEmail({
    to: appointment.customerInfo.email,
    subject: 'Appointment Confirmation',
    html: `<h1>Your appointment is confirmed!</h1><p>Date: ${appointment.dateTime}</p>`,
  })

  // Send SMS reminder
  if (appointment.customerInfo.phone) {
    await smsAdapter.sendSMS(
      appointment.customerInfo.phone,
      `Your appointment on ${appointment.dateTime} is confirmed!`
    )
  }

  return { emailResult, smsResult: null }
}
