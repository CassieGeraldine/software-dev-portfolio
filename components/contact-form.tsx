"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { submitContactForm } from "@/lib/services/contactService"
import { getClientInfo, isValidEmail, sanitizeInput } from "@/lib/utils/contactUtils"
import type { ContactFormData } from "@/lib/types/contact"

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Partial<ContactFormData>>({})

  const validateForm = (): boolean => {
    const errors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Sanitize form data
      const sanitizedData: ContactFormData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
      }

      // Get client information
      const clientInfo = getClientInfo()

      // Submit to Firebase
      const result = await submitContactForm(sanitizedData, clientInfo)

      if (result.success) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })

        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        setError(result.message || "Failed to send message. Please try again.")
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear validation error when user starts typing
    if (validationErrors[name as keyof ContactFormData]) {
      setValidationErrors({
        ...validationErrors,
        [name]: undefined,
      })
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-secondary rounded-xl p-12 text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-[var(--color-accent-green)] rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-background" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-secondary-foreground">Message Sent!</h3>
          <p className="text-secondary-foreground/70">
            Thank you for reaching out. I'll get back to you as soon as possible.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-secondary rounded-xl p-8 space-y-6">
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-secondary-foreground">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`bg-background ${validationErrors.name ? 'border-red-500' : ''}`}
            disabled={isSubmitting}
          />
          {validationErrors.name && (
            <p className="text-red-500 text-xs">{validationErrors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-secondary-foreground">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={`bg-background ${validationErrors.email ? 'border-red-500' : ''}`}
            disabled={isSubmitting}
          />
          {validationErrors.email && (
            <p className="text-red-500 text-xs">{validationErrors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-secondary-foreground">
          Subject
        </Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Project Inquiry"
          className={`bg-background ${validationErrors.subject ? 'border-red-500' : ''}`}
          disabled={isSubmitting}
        />
        {validationErrors.subject && (
          <p className="text-red-500 text-xs">{validationErrors.subject}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-secondary-foreground">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project or how I can help you..."
          rows={6}
          className={`bg-background resize-none ${validationErrors.message ? 'border-red-500' : ''}`}
          disabled={isSubmitting}
        />
        {validationErrors.message && (
          <p className="text-red-500 text-xs">{validationErrors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
