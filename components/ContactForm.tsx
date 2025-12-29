'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { submitContactForm, contactFormSchema, type ContactFormData } from '@/lib/actions'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const result = await submitContactForm(data)

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message,
        })
        reset()
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message,
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Name"
        type="text"
        placeholder="John Smith"
        required
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Email"
        type="email"
        placeholder="john@company.com"
        required
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Company Name"
        type="text"
        placeholder="Your Company"
        error={errors.company?.message}
        {...register('company')}
      />

      <Input
        label="Phone"
        type="tel"
        placeholder="(555) 123-4567"
        error={errors.phone?.message}
        {...register('phone')}
      />

      <Select
        label="Current Monthly Marketing Spend"
        options={[
          { value: '', label: 'Select an option' },
          { value: 'under-1k', label: 'Under $1,000' },
          { value: '1k-5k', label: '$1,000 - $5,000' },
          { value: '5k-10k', label: '$5,000 - $10,000' },
          { value: 'over-10k', label: 'Over $10,000' },
          { value: 'not-sure', label: 'Not sure' },
        ]}
        error={errors.marketingSpend?.message}
        {...register('marketingSpend')}
      />

      <Textarea
        label="Message"
        placeholder="Tell us about your business and marketing goals..."
        rows={5}
        required
        error={errors.message?.message}
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
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  )
}
